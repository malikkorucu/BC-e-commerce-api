import { model, Schema } from 'mongoose';
import IUser from '../interfaces/IUser';

const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};

const schema = new Schema<IUser>({
    ...base,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [
            true,
            'Email alanı zorunludur',
        ],
        index: true,
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'Lütfen geçerli bir email adresi giriniz !',
        ],
    },
    phone: {
        type: String,
        required: [true,
            'Bu alan zorunludur'],
        unique: true,
        match: [
            /^[+]*[0-9]*[ ]{0,1}[(]{0,1}[ ]{0,1}[0-9]{1,3}[ ]{0,1}[)]{0,1}[ ]{0,1}[0-9]{1,3}[ ]{0,1}[0-9]{2}[ ]{0,1}[0-9]{2}[ ]{0,1}[-\.\/]{0,1}[ ]{0,1}[0-9]{1,5}$/g,
            'Lütfen geçerli bir telefon numarası giriniz',
        ],
    },
    avatar: {
        type: String,
        default: 'default.jpg',
    },
    password: {
        required: true,
        type: String,
        select: false,
        minlength: [6, 'Şifre en az 6 karakter olmalıdır'],
    },
});

export const UserModel = model<IUser>('User', schema);
