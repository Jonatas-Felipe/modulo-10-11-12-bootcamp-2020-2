import { resolve } from 'path';
import { randomBytes } from 'crypto';
import multer from 'multer';

const tempFolder = resolve(__dirname, '..', '..', 'tmp');
const uploadFolder = resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  tmpFolder: tempFolder,
  uploadFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
