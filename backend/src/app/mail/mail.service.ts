import { BadRequestException, Injectable } from '@nestjs/common';
import bodyEmails from '../helpers/body-emails';
import { resend } from '../helpers/mail';


@Injectable()
export class MailService {
  constructor() { }

  async requestAttachment(data: any): Promise<void> {
    try {
      const emailContent = await bodyEmails.getBodyEmail(data, 'attachment.html');

      const emailResponse = await resend.emails.send({
        from: 'wedevtm@resend.dev',
        to: data.email,
        subject: 'Anexo de documento',
        html: emailContent,
      });

      console.log('E-mail enviado com sucesso:', emailResponse);

    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);

      if (error instanceof Error) {
        throw new BadRequestException(`Erro ao enviar o email: ${error.message}`);
      } else {
        throw new BadRequestException('Erro ao enviar o email');
      }
    }
  }
}
// re_8v66sunx_AvJwVneA11NXdNvqRXVJBW5D