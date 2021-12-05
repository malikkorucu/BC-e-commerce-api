import multer from 'multer';

export const fileUploadOptions = () => ({
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            console.log('destination');
        },
        filename: (req: any, file: any, cb: any) => {
            console.log('filename');
        },
    }),
    fileFilter: (req: any, file: any, cb: any) => {
        console.log('filefilter');
    },
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 2,
    },
});
