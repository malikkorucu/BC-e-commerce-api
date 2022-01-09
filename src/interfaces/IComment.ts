import IUser from './IUser';

export default interface IComment {
    _id?: string;
    rating: number;
    content: string;
    user?: IUser;
}
