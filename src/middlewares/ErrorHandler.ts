import { NextFunction, Response, Request } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { DbErrors } from '../helpers/dbErrors';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  public error(error: any, request: Request, response: Response, next: NextFunction): void {
    const error_code = error?.message?.split(' ')[0];
    let message = '';

    switch (error_code) {
      case DbErrors.DUPLICATE_KEY:
        message = 'Telefon veya email alanı daha önceden kullanılmış';
        break;

      default:
        message = error.message;
        break;
    }

    return next(response.status(error.status || 500).json({
      success: false,
      message,
      code: error.status || 500,
    }));
  }
}
