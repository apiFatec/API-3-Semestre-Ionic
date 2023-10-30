import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post()
  async requestAttachment(@Body() body: any): Promise<void> {
    return await this.mailService.requestAttachment(body);
  }
}
