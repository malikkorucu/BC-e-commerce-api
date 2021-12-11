
import { Model } from 'mongoose';
import IProduct from 'src/interfaces/IProduct';
import { Service } from 'typedi';
import { ProductModel } from '../models/Product';
import IApiResult from '../interfaces/IApiResult';
import { ApiResult } from '../controllers/ApiResult';

@Service()
export class ProductService {

    protected Model: Model<IProduct>;

    constructor() {
        this.Model = ProductModel;
    }

    public async createProduct(product: IProduct): Promise<IApiResult> {
        try {
            const createdProduct = await this.Model.create(product);
            return new ApiResult(createdProduct);
        } catch (error) {
            throw error;
        }
    }

    public async getProducts(): Promise<IApiResult> {
        try {
            const products = await this.Model.find({});
            console.log(products);
            return new ApiResult(products);
        } catch (error) {
            throw error;
        }
    }

    public async getProduct(id: string): Promise<IApiResult> {
        try {
            const dbProduct = await this.Model.findOne({ _id: id });
            console.log(dbProduct);
            return new ApiResult(dbProduct);
        } catch (error) {
            throw error;
        }
    }
}
