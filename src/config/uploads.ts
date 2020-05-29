import { resolve } from 'path';
import multer from 'multer';

const uploadPath = resolve(__dirname, '..', '..', 'tmp');

export default {
  uploadPath,
  storage: multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
      cb(null, `import.csv`);
    },
  }),
  fileFilter: (req: any, file: any, cb: any): void => {
    if (file.mimetype !== 'text/csv') {
      return cb(null, false);
    }

    return cb(null, true);
  },
};
