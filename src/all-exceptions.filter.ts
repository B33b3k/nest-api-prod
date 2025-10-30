import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
    private readonly logger = new Logger(CatchEverythingFilter.name);

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        const req = ctx.getRequest();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const requestUrl = httpAdapter.getRequestUrl(req);
        const timestamp = new Date().toISOString();

        // Logging
        const { message, stack } =
            exception instanceof Error
                ? { message: exception.message, stack: exception.stack }
                : { message: typeof exception === 'string' ? exception : JSON.stringify(exception), stack: undefined };

        this.logger.error(
            `HTTP ${req?.method ?? 'UNKNOWN'} ${requestUrl} -> ${httpStatus} - ${message}`,
            stack,
        );

        const responseBody = {
            statusCode: httpStatus,
            timestamp,
            path: requestUrl,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
