import IProduct from './IProduct';

export default interface ICart {
    _id?: string;
    id?: string;
    user_id: string;
    product: IProduct;
}
