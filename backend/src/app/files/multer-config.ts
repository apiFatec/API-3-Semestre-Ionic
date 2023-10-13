import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs'

const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const userName = req.params.userName;
      const useDir = path.join('./upload/files', userName);

      if(!fs.existsSync(useDir)) {
        fs.mkdirSync(useDir, {recursive: true});
      }

      cb(null, useDir)
    },
    filename: (req, file, cb) => {
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export default multerConfig;
