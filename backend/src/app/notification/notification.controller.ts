import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateNotificationDto } from 'src/app/notification/dto/create-notification.dto'
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post('send')
  sendEmail(
    @Body() body : CreateNotificationDto
  ) {
    return this.notificationService.sendMail(body)
  }
}
