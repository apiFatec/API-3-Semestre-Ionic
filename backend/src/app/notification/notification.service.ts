import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import bodyEmails from '../helpers/body-emails';
import { MailerService } from "@nestjs-modules/mailer/dist";


@Injectable()
export class NotificationService {
  constructor(private readonly mailerService: MailerService){}

  async sendMail(data : CreateNotificationDto): Promise<any> {
    const emailContent = await bodyEmails.getBodyEmail(data, 'attachment.html');

    return this.mailerService.sendMail({
      to: `${data.email}`,
      from: 'mateus.wedev@gmail.com',
      subject: `${data.title}`,
      text: `${data.description}`,
      html: emailContent,
    });
  }

}
