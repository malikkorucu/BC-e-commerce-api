import { Post, Res, Req, JsonController, Body, Get, Delete, Param } from 'routing-controllers';
import { Response } from 'express';
import Container from 'typedi';
import ICart from '../interfaces/ICart';
import { CartService } from '../services/CartService';

@JsonController('/Cart')
export class CartController {
    private service: CartService;
    constructor() {
        this.service = Container.get(CartService);
    }

    @Post('/cart')
    public async addToCart(@Body() cartProduct: ICart, @Res() res: Response, @Req() req: any, next: any): Promise<Response> {
        const result = await this.service.create(cartProduct, req.user);
        return res.json(result);
    }

    @Get('/cart')
    public async getCartItems(@Res() res: Response, @Req() req: any): Promise<any> {
        const result = await this.service.getAll(req.user);
        return res.json(result);
    }

    @Delete('/cart/:id')
    public async deleteCartItem(@Res() res: Response, @Param('id') id: string): Promise<Response> {
        const result = await this.service.delete(id);
        return res.json(result);
    }
}
