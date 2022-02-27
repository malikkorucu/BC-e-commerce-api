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

    public async getProducts(user: IUser, params?: any): Promise<IApiResult> {
        try {
            // const query = [
            //     {
            //         $lookup: {
            //             from: 'favorites',
            //             as: 'is_favorite',
            //             let: { 'product_id': '$_id' },
            //             pipeline: [
            //                 {
            //                     $match: {
            //                         $expr: {
            //                             $and: [ // prettier-ignore
            //                                 { $eq: ['$$product_id', '$product'] },
            //                                 { $eq: ['$user_id', user.id] },
            //                             ],
            //                         },
            //                     },
            //                 },
            //             ],
            //         },
            //     },
            //     {
            //         $addFields: {
            //             is_favorite: { $cond: [{ $eq: [{ $size: '$is_favorite' }, 0] }, false, true] },
            //         },
            //     },
            //     {
            //         $match: {
            //             $or: [
            //                 { title: { $regex: params.search, $options: 'i' } },
            //             ],
            //         },
            //     },
            // ] as any;

            // KELİME KELİME ALIYOR
            // query.unshift({
            //     $match: {
            //         $text: { $search: params.search },
            //     },
            // });

            const pipeline = [
                {
                    $match: {
                        $expr: {
                            $and: [ // prettier-ignore
                                { $eq: ['$$product_id', '$product'] },
                                { $eq: ['$user_id', user.id] },
                            ],
                        },
                    },
                },
            ];

            const products = await this.Model
                .aggregate()
                .lookup({ from: 'favorites', let: { 'product_id': '$_id' }, as: 'is_favorite', pipeline })
                .addFields({ is_favorite: { $cond: [{ $eq: [{ $size: '$is_favorite' }, 0] }, false, true] } })
                .match({ $or: [{ title: { $regex: params.search || '', $options: 'i' } }] });

            return new ApiResult(products);
        } catch (error) {
            throw error;
        }
    }

    //#region GetProdcutsByCategory
    public async getProductsByCategory(user: IUser): Promise<IApiResult> {
        try {
            // const query = [ // yalın mongo sorgusu
            //     {
            //         '$group': { '_id': '$category', 'data': { '$push': '$$ROOT' } },
            //     },
            //     {
            //         '$project': {
            //             '_id': 0,
            //             'category': '$_id',
            //             'products': '$data',
            //         },
            //     },
            //     {
            //         $lookup: {
            //             from: 'categories',
            //             localField: 'category',
            //             foreignField: '_id',
            //             as: 'category',
            //         },
            //     },
            //     {
            //         $unwind: {
            //             path: '$category',
            //         },
            //     },
            //     {
            //         $project: {
            //             category: {
            //                 _id: '$category._id',
            //                 title: '$category.title',
            //                 image: '$category.image',
            //                 text: '$category.text',
            //             },
            //             products: 1,
            //         },
            //     },
            //     {
            //         $limit: 10,
            //     },
            //     {
            //         $sort: {
            //             category: 1,
            //         },
            //     },
            // ];

            const pipeline = [
                {
                    $match: {
                        $expr: {
                            $and: [ // prettier-ignore
                                { $eq: ['$$product_id', '$product'] },
                                { $eq: ['$user_id', user.id] },
                            ],
                        },
                    },
                },
            ];

            const result = await this.Model
                .aggregate()
                .lookup({ from: 'favorites', let: { 'product_id': '$_id' }, as: 'is_favorite', pipeline })
                .addFields({ is_favorite: { $cond: [{ $eq: [{ $size: '$is_favorite' }, 0] }, false, true] } })
                .group({ _id: '$category', 'data': { '$push': '$$ROOT' } })
                .project({ '_id': 0, 'category': '$_id', 'products': '$data' })
                .lookup({ from: 'categories', localField: 'category', foreignField: '_id', as: 'category' })
                .unwind({ path: '$category' })
                .project({ 'category': { _id: '$category._id', title: '$category.title', image: '$category.image', text: '$category.text' }, products: 1 })
                .limit(10)
                .sort({ category: 1 });

            return new ApiResult(result);
        } catch (error) {
            throw error;
        }
    }
    //#endregion

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
