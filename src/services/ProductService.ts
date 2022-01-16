import { Model } from 'mongoose';
import IProduct from 'src/interfaces/IProduct';
import { Service } from 'typedi';
import { ProductModel } from '../models/Product';
import IApiResult from '../interfaces/IApiResult';
import { ApiResult } from '../controllers/ApiResult';
import IUser from '../interfaces/IUser';

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

    public async getProducts(user: IUser): Promise<IApiResult> {
        try {
            const products = await this.Model.aggregate([
                {
                    $lookup: {
                        from: 'favorites',
                        as: 'is_favorite',
                        let: { 'product_id': '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$$product_id', '$product'] },
                                            { $eq: ['$user_id', user.id] },
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                },
                {
                    $addFields: {
                        is_favorite: { $cond: [{ $eq: [{ $size: '$is_favorite' }, 0] }, false, true] },
                    },
                },
            ]);
            return new ApiResult(products);
        } catch (error) {
            throw error;
        }
    }

    public async getProduct(id: string): Promise<IApiResult> {
        try {
            const dbProduct = await this.Model.findOne({ _id: id });
            return new ApiResult(dbProduct);
        } catch (error) {
            throw error;
        }
    }

    public async deleteProduct(id: string): Promise<IApiResult> {
        try {
            await this.Model.deleteOne({ _id: id });
            return new ApiResult({ message: 'Product deleted' });
        } catch (error) {
            throw error;
        }
    }

    public async updateProduct(id: string, product: IProduct): Promise<IApiResult> {
        try {
            const updatedProduct = await this.Model.findOneAndUpdate({ _id: id }, product, { new: true });
            return new ApiResult(updatedProduct);
        } catch (error) {
            throw error;
        }
    }
}

                // {
                //     $group: {
                //         _id: '$_id',
                //         is_favorite: {
                //                 $cond: [
                //                     { $eq: [{ $size: '$is_favorite' }, 0] },
                //                     { is_favorite: false },
                //                     { is_favorite: true },
                //                 ],
                //         },
                //     },
                // },
                // {
                //     $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$is_favorite', 0] }, '$$ROOT'] } },
                // },
                // {
                //     $unwind: {
                //         path: '$is_favorite',
                //     },
                // },
                // {

                //     $group:
                //     {
                //         _id: '$_id',
                //         is_favorite: {
                //             $cond: [
                //                 { $eq: [{ $size: '$is_favorite' }, 0] },
                //                 { is_favorite: false },
                //                 { is_favorite: true },
                //             ],
                //         },
                //     },
                // },
                // {
                //     $group: {
                //         _id: '$_id',
                //         is_favorite: { $first: '$is_favorite' },
                //     },
                // },
                // {
                //     '$project': { 'is_favorite': 0 },
                // },
