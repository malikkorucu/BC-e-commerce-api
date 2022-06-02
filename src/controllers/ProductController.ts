import { Res, Req, JsonController, Get, Body, Post, Param, Delete, Put, UseBefore, QueryParams } from 'routing-controllers';
import { Response } from 'express';
import { ProductService } from '../services/ProductService';
import Container from 'typedi';
import IProduct from '../interfaces/IProduct';
import { upload } from '../helpers/upload';
import { Db } from 'mongodb';

@JsonController('/Product')
export class ProductController {

    private service: ProductService;
    constructor() {
        this.service = Container.get(ProductService);
    }

    @Get('/products')
    public async getProducts(@Res() res: Response, @Req() req: any, @QueryParams() params: any): Promise<Response> {
        const data = await this.service.getProducts(req.user, params);
        return res.json(data);
    }

    @Get('/productsByCategory')
    public async getProductsByCategory(@Res() res: Response, @Req() req: any): Promise<Response> {
        const data = await this.service.getProductsByCategory(req.user);
        return res.json(data);
    }

    @Get('/product/:id')
    public async getProduct(@Res() res: Response, @Param('id') id: string): Promise<Response> {
        const data = await this.service.getProduct(id);
        return res.json(data);
    }

    @Post('/product')
    @UseBefore(upload.fields([{ name: 'image', maxCount: 5 }, { name: 'other_images', maxCount: 5 }]))
    public async addProduct(@Body() product: any, @Res() res: Response): Promise<Response> {
        const data = await this.service.createProduct(product);
        return res.json(data);
    }

    @Put('/product/:id')
    public async updateProduct(@Body() product: IProduct, @Param('id') id: string, @Res() res: Response): Promise<Response> {
        const data = await this.service.updateProduct(id, product);
        return res.json(data);
    }

    @Get('/testDb')
    public async testProduct(@Res() res: Response, @Req() req: any): Promise<Response> {
        try {
            const db = req.db as Db;
            const isCollectionExist = db.collection('asdf')
            console.log(isCollectionExist)
            //return res.json({ data: collections })
            //const data = req.db.createCollection("users", {
            //    validator: {
            //        $jsonSchema: {
            //            bsonType: "object",
            //            required: ["phone"],
            //            properties: {
            //                phone: {
            //                    bsonType: "string",
            //                    description: "must be a string and required"
            //                },
            //                email: {
            //                    bsonType: "string",
            //                    pattern: "@mongodb/.com$",
            //                    description: "must be a string and match"
            //                }
            //            }
            //        }
            //    }
            //})
            return res.json({ data: JSON.stringify(isCollectionExist) })
        } catch (error) {
            console.log('test test')
            console.error(error)
        }
        return res.send('data')
    }

    @Delete('/product')
    public async deleteProduct(@Res() res: Response, @QueryParams() query: any): Promise<Response> {
        const data = await this.service.deleteProduct(query.productIds);
        return res.json(data);
    }
}
