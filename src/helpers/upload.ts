import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(undefined, 'src/upload');
  },
  filename: (req, file, cb) => {
    console.log(req.body);
    const extension =
      file.originalname.split('.')[file.originalname.split('.').length - 1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(undefined, file.fieldname + '-' + uniqueSuffix + `.${extension}`);
  },
});

export const upload = multer({
  storage,
});
