import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLoggerService } from '../../my-logger/my-logger.service';

@Injectable()
export class ApiLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const responseTime = Date.now() - start;
      this.logger.logApi(req, res, responseTime);
    });

    next();
  }
}
