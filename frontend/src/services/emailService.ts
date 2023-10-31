import { api } from "@/api";

interface AttachmentDto {
  email: string;
  title: string;
  description: string;
  process: string;
  processId: string;
}

class EmailService {
  async attachmentRequest(data: AttachmentDto) {
    return await api.post('/mail/attachment', data, {
      headers: {
        'Accept': 'application/json'
      }
    })
  }
}

export default new EmailService();