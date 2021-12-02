import { NextFunction, Response, Request } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { DbErrors } from '../helpers/dbErrors';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  public error(error: any, request: Request, response: Response, next: NextFunction): void {
    const error_code = error.message.split(' ')[0];
    let message = '';

    switch (error_code) {
      case DbErrors.DUPLICATE_KEY:
        message = 'Email adresi mevcut lütfen başka bir email adresi giriniz';
        break;

      default:
        const msg = error.message.split(':')[2].trim();
        message = msg;
        break;
    }

    response.status(error.status || 500).json({
      success: false,
      message,
      code: error.status || 500,
    });
  }
}
