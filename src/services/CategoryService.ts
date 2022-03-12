import { Model, ObjectId } from 'mongoose';
// import { CustomError } from 'src/helpers/Error';
import { CategoryModel } from '../models/Category';
import { Service } from 'typedi';
import ICategory from '../interfaces/ICategory';
import { ApiResult } from '../controllers/ApiResult';
import IApiResult from '../interfaces/IApiResult';

@Service()
export class CategoryService {
    protected Model: Model<ICategory>;

    constructor() {
        this.Model = CategoryModel;
    }

    public async createCategory(category: ICategory): Promise<IApiResult> {
        try {
            const result = await this.Model.create(category);
            return new ApiResult(result);
        } catch (error) {
            throw error;
        }
    }

    public async getCategories(): Promise<IApiResult> {
        try {
            const result = await this.Model.find({}).populate('products');
            return new ApiResult(result);
        } catch (error) {
            throw error;
        }
    }

    public async addProductToCategory(product: ObjectId, category_id: string): Promise<IApiResult> {
        try {
            const result = await this.Model.updateOne({ _id: category_id }, {
                $push: {
                    products: product,
                },
            });
            return new ApiResult(result);
        } catch (error) {
            throw error;
        }
    }
}
