import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { AttachmentDto } from './dto/email-attachment.dto';
import { CreateEmailResponse } from 'resend/build/src/emails/interfaces';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post('/attachment')
  async requestAttachment(@Body() body: AttachmentDto): Promise<any> {
    return await this.mailService.requestAttachment(body);
  }
}
