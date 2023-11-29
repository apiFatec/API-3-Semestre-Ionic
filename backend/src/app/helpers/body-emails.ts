import * as fs from 'fs';
import * as path from 'path';
import { AttachmentDto } from '../mail/dto/email-attachment.dto';
import { CreateNotificationDto } from '../notification/dto/create-notification.dto';

class BodyEmail {

  async getBodyEmail(body: AttachmentDto, template: string) {

    const filePath = path.join('src/app/templates', template);
    let htmlContent = fs.readFileSync(filePath, 'utf-8');

    htmlContent = htmlContent.replace('{{title}}', body.title);
    htmlContent = htmlContent.replace('{{description}}', body.description);
    htmlContent = htmlContent.replace('{{processname}}', body.process);
    htmlContent = htmlContent.replace('{{processid}}', body.processId);

    return htmlContent;
  }
}

export default new BodyEmail();