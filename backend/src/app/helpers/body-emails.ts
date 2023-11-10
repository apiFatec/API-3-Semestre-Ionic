import * as fs from 'fs';
import * as path from 'path';
import { AttachmentDto } from '../mail/dto/email-attachment.dto';

class BodyEmail {

  async getBodyEmail(body: AttachmentDto, template: string) {

    const filePath = path.join('C:\\Users\\Talison\\API-3-Semestre-Ionic\\backend\\src\\app\\templates\\', template);
    let htmlContent = fs.readFileSync(filePath, 'utf-8');

    htmlContent = htmlContent.replace('{{title}}', body.title);
    htmlContent = htmlContent.replace('{{description}}', body.description);
    htmlContent = htmlContent.replace('{{processname}}', body.process);
    htmlContent = htmlContent.replace('{{processid}}', body.processId);

    return htmlContent;
  }
}

export default new BodyEmail();