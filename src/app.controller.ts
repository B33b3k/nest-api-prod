import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import { appConfig } from './config/app.config';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  redirectToApi(@Res() res: Response) {
    const config = appConfig();
    return res.redirect(`/${config.swagger.path}`);
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
