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

    // #region AddProductToCart
    public async addProductToCart(productId: any, user: IUser): Promise<IApiResult> {
        try {
            if (!productId) { throw new CustomError('Lütfen ürün seçiniz.', 400); }

            const is_cart_created = await this.Model.findOne({ user_id: user.id }).countDocuments();

            if (is_cart_created > 0) {
                const is_there_in_products = await this.Model.findOne({
                    $and: [
                        { user_id: user.id },
                        { products: { $in: [productId] } },
                    ],
                }).countDocuments();

                if (is_there_in_products > 0) {
                    throw new CustomError('Zaten bu ürünü favorilerinize eklediniz.', 400);
                }

                await this.Model.updateOne(
                    { user_id: user.id },
                    { $push: { products: productId } });

            } else {
                await this.Model.create({ user_id: user.id, products: [productId] });
            }

            return new ApiResult({ code: 200, message: 'Ürün başarıyla sepete eklendi.' });
        } catch (error) {
            throw error;
        }
    }
    //#endregion

    // #region RemoveProductFromCart
    public async deleteProductFromCart(productId: any, user: IUser): Promise<IApiResult> {
        try {
            const is_cart_created = await this.Model.findOne({ user_id: user.id });

            if (!is_cart_created) {
                throw new CustomError('Sepetiniz bulunmamaktadır.', 400);
            }

            await this.Model.updateOne(
                { user_id: user.id },
                { $pull: { products: productId } });

            return new ApiResult({ code: 200, message: 'Ürün başarıyla sepetten çıkarıldı.' });
        } catch (error) {
            throw error;
        }
    }
    // #endregion

    // #region GetCart
    public async getAll(user: IUser): Promise<IApiResult> {
        try {
            const data = await this.Model.findOne({ user_id: user.id })
                .populate('products')
                .populate('user_id');

            return new ApiResult(data);
        } catch (error) {
            throw error;
        }
    }
    // #endregion

    // #region DeleteProductFromCart
    public async delete(id: string): Promise<IApiResult> {
        try {
            await this.Model.deleteOne({ _id: id });
            return new ApiResult(undefined);
        } catch (error) {
            throw error;
        }
    }
    // #endregion
}
