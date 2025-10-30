import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ApiLoggerMiddleware } from './common/middleware/api-logger.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    DatabaseModule,
    EmployeesModule,
    // CORRECT SYNTAX
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: 1000,
          limit: 3,
        },
        // Optional: default fallback
        {
          name: 'long',
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    MyLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiLoggerMiddleware).forRoutes('*');
  }
}
