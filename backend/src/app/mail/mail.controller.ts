import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { AttachmentDto } from './dto/email-attachment.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post('/attachment')
  async requestAttachment(@Body() body: AttachmentDto): Promise<void> {
    return await this.mailService.requestAttachment(body);
  }
}
