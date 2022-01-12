import { model, Schema } from 'mongoose';
import IProduct from '../interfaces/IProduct';

const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};

const schema = new Schema<IProduct>({
    ...base,
    title: {
        type: String,
        required: [true, 'Ürün başlığı zorunlu bir alandır.'],
        unique: [true, 'Bu ürün ismi zaten mevcut, lütfen farklı bir başlık giriniz.'],
    },
    price: {
        type: Number,
        required: [true, 'Ürün fiyatı zorunlu bir alandır.'],
    },
    description: {
        type: String,
        required: [true, 'Ürün açıklaması zorunlu bir alandır.'],
    },
    price_with_discount: {
        type: Number,
        required: [true, 'Ürün fiyatı zorunlu bir alandır.'],
    },
    product_image: {
        type: String,
        default: 'default_product_img.jpg',
    },
    is_favorite: {
        type: Boolean,
        default: false,
    },
});

export const ProductModel = model<IProduct>('Product', schema);
