import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import bodyEmails from '../helpers/body-emails';
import { resend } from '../helpers/mail';
import { AttachmentDto } from './dto/email-attachment.dto';
import { CreateEmailResponse } from 'resend/build/src/emails/interfaces';
import { CustomError } from '../helpers/Error';

@Injectable()
export class MailService {
  constructor() { }

  async requestAttachment(data: AttachmentDto): Promise<any> {
    const emailContent = await bodyEmails.getBodyEmail(data, 'attachment.html');

    try {
      const emailResponse = await resend.emails.send({
        from: 'wedevtm@resend.dev',
        to: data.email,
        subject: 'Anexo de documento',
        html: emailContent,
      })
      if (emailResponse.statusCode) {
        const { statusCode, message } = emailResponse;

        const customErrorResponse = {
          status: statusCode,
          message: message,
        };
        throw customErrorResponse;
      }
    } catch (error) {

      throw new CustomError(error.message, error.status);
    }
  }
}

// re_8v66sunx_AvJwVneA11NXdNvqRXVJBW5D