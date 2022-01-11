import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(undefined, 'src/upload');
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.')[file.originalname.split('.').length - 1]; // prettier-ignore
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const file_name = file.fieldname + '-' + uniqueSuffix + `.${extension}`;
    req.body = { ...req.body, product_image: file_name };
    cb(undefined, file.fieldname + '-' + uniqueSuffix + `.${extension}`);
  },
});

export const upload = multer({
  storage,
});
