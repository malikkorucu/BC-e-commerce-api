import { Res, JsonController, Get, Body, Post, Param, Delete, Put, UseBefore } from 'routing-controllers';
import { Response } from 'express';
import { ProductService } from '../services/ProductService';
import Container from 'typedi';
import IProduct from 'src/interfaces/IProduct';
import { upload } from '../../src/helpers/upload';
// import { upload } from '../helpers/upload';

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
    @UseBefore(upload.fields([{ name: 'photo', maxCount: 1 }]), (req: any, res: any, next: any) => {
        // req.body = { ...req.body, product_image: 'malik korucu' };
        next();
    })
    public async addProduct(@Body() product: IProduct, @Res() res: Response): Promise<Response> {
        const data = await this.service.createProduct(product);
        return res.json(data);
    }

    @Put('/product/:id')
    public async updateProduct(@Body() product: IProduct, @Param('id') id: string, @Res() res: Response): Promise<Response> {
        const data = await this.service.updateProduct(id, product);
        return res.json(data);
    }

    @Delete('/product/:id')
    public async deleteProduct(@Res() res: Response, @Param('id') id: string): Promise<Response> {
        const data = await this.service.deleteProduct(id);
        return res.json(data);
    }
}
