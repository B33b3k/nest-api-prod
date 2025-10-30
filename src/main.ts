import 'dotenv/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { CatchEverythingFilter } from './all-exceptions.filter';
import { appConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Get configuration
  const config = appConfig();

  // Set up global filters and logging
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapterHost));
  app.useLogger(app.get(MyLoggerService));

  // Configure CORS
  app.enableCors({
    origin: config.cors.origin,
    credentials: config.cors.credentials,
  });

  // Set up API prefix
  app.setGlobalPrefix(config.apiPrefix);

  // Set up Swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.swagger.title)
    .setDescription(config.swagger.description)
    .setVersion(config.swagger.version)
    .addTag('employees', 'Employee management endpoints')
    .addTag('products', 'Product management endpoints')
    .addTag('users', 'User management endpoints')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(config.swagger.path, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Start the application
  await app.listen(config.port);
  console.log(`Application is running on: http://localhost:${config.port}`);
  console.log(`Swagger documentation: http://localhost:${config.port}/${config.swagger.path}`);
}
bootstrap();
