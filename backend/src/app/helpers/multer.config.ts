import { diskStorage } from "multer";
import { extname, join } from "path";
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const username = req.params.username;
      const useDir = join('./uploads', username);

      if (!fs.existsSync(useDir)) {
        fs.mkdirSync(useDir, { recursive: true });
      }

      callback(null, useDir);
    },
    filename: (req, file, callback) => {
      const name = uuidv4() + extname(file.originalname);
      callback(null, name);
    }
  })
}