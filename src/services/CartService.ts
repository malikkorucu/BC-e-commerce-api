
import { Service } from 'typedi';
import IApiResult from '../interfaces/IApiResult';
import { Model } from 'mongoose';
import IUser from '../interfaces/IUser';
import ICart from '../interfaces/ICart';
import { CartModel } from '../models/Cart';
import { ApiResult } from '../controllers/ApiResult';
import { CustomError } from '../helpers/Error';

@Service()
export class CartService {
    protected Model: Model<ICart>;

    constructor() {
        this.Model = CartModel;
    }

    public async create(favoriteProduct: ICart, user: IUser): Promise<IApiResult> {
        try {
            const data = {
                user_id: user.id,
                product: favoriteProduct.product,
            };

            const isInclude = await this.Model.findOne(data);

            if (isInclude) {
                throw new CustomError('Zaten bu ürünü favorilerinize eklediniz.', 400);
            }

            const dbData = await this.Model.create(data);
            return new ApiResult(dbData);
        } catch (error) {
            throw error;
        }
    }

    public async getAll(user: IUser): Promise<IApiResult> {
        try {
            const data = await this.Model.find({ user_id: user.id }).populate('product');
            return new ApiResult(data);
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<IApiResult> {
        try {
            await this.Model.deleteOne({ _id: id });
            return new ApiResult(undefined);
        } catch (error) {
            throw error;
        }
    }
}
