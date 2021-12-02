
import { UserModel } from '../models/User';
import IUser from '../interfaces/IUser';
import { Service } from 'typedi';
import IApiResult from '../interfaces/IApiResult';
import { ApiResult } from '../controllers/ApiResult';

@Service()
export class AuthService {
    public async register(user: IUser): Promise<IApiResult> {
        const data = await UserModel.create(user);
        const d = await UserModel.findOne({ _id: data._id });
        return new ApiResult(d);
    }

    public async login(user: any): Promise<any> {
        return 'asldşkfjasdf';
    }
}
