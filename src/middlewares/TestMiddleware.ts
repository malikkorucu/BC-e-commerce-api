
import { NextFunction } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
export class TestMiddleware implements ExpressMiddlewareInterface {
    public use(req: Request, res: Response, next: NextFunction): void {
        console.log('burası çalıştı');
        next();
    }
}
