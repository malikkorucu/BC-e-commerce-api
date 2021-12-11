import { Res, JsonController, Get, Body, Post, Param } from 'routing-controllers';
import { Response } from 'express';
import { ProductService } from '../services/ProductService';
import Container from 'typedi';
import IProduct from 'src/interfaces/IProduct';

@JsonController('/Product')
export class ProductController {

    private service: ProductService;
    constructor() {
        this.service = Container.get(ProductService);
    }

    @Get('/products')
    public async getProducts(@Res() res: Response): Promise<Response> {
        const data = await this.service.getProducts();
        return res.json(data);
    }

    @Get('/product/:id')
    public async getProduct(@Res() res: Response, @Param('id') id: string): Promise<Response> {
        const data = await this.service.getProduct(id);
        return res.json(data);
    }

    @Post('/product')
    public async addProduct(@Body() product: IProduct, @Res() res: Response): Promise<Response> {
        const data = await this.service.createProduct(product);
        return res.json(data);
    }
}
