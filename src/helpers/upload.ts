import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log();
    cb(undefined, path.join(__dirname, '../public'));
  },
  filename: (req: any, file, cb) => {
    const extension = file.originalname.split('.')[file.originalname.split('.').length - 1]; // prettier-ignore
    const originalName = file.originalname.split('.')[0]; // prettier-ignore

    const file_name = file.fieldname + originalName + '-' + req.user.email + `.${extension}`;
    req.body = { ...req.body, image: file_name };
    cb(undefined, file_name);
  },
});

export const upload = multer({
  storage,
});
