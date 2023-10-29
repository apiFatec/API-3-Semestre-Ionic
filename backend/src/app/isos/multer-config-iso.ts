import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs'
import { title } from 'process';

const MulterConfigIso = {
    storage: diskStorage({
        destination: (req, file, cb) => {
            const title = req.header('title');
            const desc = req.header('description')
            const useDir = path.join(`./upload/ISOs/${title}`);

            if (!fs.existsSync(useDir)) {
                fs.mkdirSync(useDir, { recursive: true })
            }
            cb(null, useDir)
        },
        filename: (req , file, cb) => {
            const fileName =
                path.parse(req.header('title')).name.replace(/\s/g, '') + '-' + uuidv4();

            const extension = path.parse(file.originalname).ext;
            cb(null, `${fileName}${extension}`)
        },
    }),
}

export default MulterConfigIso;
