import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private readonly logger: winston.Logger;
  private readonly apiLogger: winston.Logger;

  constructor() {
    super();

    const logDir = path.join(process.cwd(), 'logs');

    // Create Winston logger for application logs
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.DailyRotateFile({
          filename: path.join(logDir, 'application-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
          level: 'info',
        }),
        new winston.transports.DailyRotateFile({
          filename: path.join(logDir, 'error-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error',
        }),
      ],
    });

    // Create Winston logger for API logs
    this.apiLogger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.DailyRotateFile({
          filename: path.join(logDir, 'api-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  log(message: any, context?: string) {
    const entry = {
      level: 'info',
      context,
      message,
      timestamp: new Date().toISOString(),
    };
    this.logger.info(entry);
    super.log(message, context);
  }

  error(message: any, trace?: string, context?: string) {
    const entry = {
      level: 'error',
      context,
      message,
      trace,
      timestamp: new Date().toISOString(),
    };
    this.logger.error(entry);
    super.error(message, trace, context);
  }

  warn(message: any, context?: string) {
    const entry = {
      level: 'warn',
      context,
      message,
      timestamp: new Date().toISOString(),
    };
    this.logger.warn(entry);
    super.warn(message, context);
  }

  // New method for API logging
  logApi(req: any, res: any, responseTime: number) {
    const entry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      userAgent: req.get('user-agent'),
      ip: req.ip,
      body: req.body,
      query: req.query,
    };
    this.apiLogger.info(entry);
  }
}
