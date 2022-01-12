import { Service } from 'typedi';
import IApiResult from '../interfaces/IApiResult';
import { ApiResult } from '../controllers/ApiResult';
import { Model } from 'mongoose';
import IFavorite from '../interfaces/IFavorite';
import IUser from '../interfaces/IUser';
import { FavoriteModel } from '../models/Favorite';
import { CustomError } from '../helpers/Error';

@Service()
export class FavoriteService {
  protected Model: Model<IFavorite>;

  constructor() {
    this.Model = FavoriteModel;
  }

  public async create(
    favoriteProduct: IFavorite,
    user: IUser
  ): Promise<IApiResult> {
    try {
      const dbData = {
        user_id: user.id,
        product: favoriteProduct.product,
      };

      const isInclude = await this.Model.findOne({
        user_id: user.id,
        product: favoriteProduct.product,
      });

      if (isInclude) {
        throw new CustomError('Product already in favorites', 400);
      }

      const result = await this.Model.create(dbData);
      return new ApiResult(result);
    } catch (error) {
      throw error;
    }
  }

  public async getAll(userId: string): Promise<IApiResult> {
    try {
      const result = await this.Model.find({ user_id: userId })
        .select('-user_id')
        .populate('product');
      return new ApiResult(result);
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
