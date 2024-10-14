// app/Mail/MailService.ts
import nodemailer from 'nodemailer';
import Env from '@ioc:Adonis/Core/Env';

class ServicioEmailRespuesta {
  private transporter;

  constructor() {
    // Configura el transportador con las credenciales de Office 365
    this.transporter = nodemailer.createTransport({
      host: Env.get('SMTP_HOST'),
      port: Number(Env.get('SMTP_PORT')),
      secure: false, // Usa true si tu puerto es 465
      auth: {
        user: Env.get('SMTP_USERNAME'),
        pass: Env.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: Env.get('SMTP_USERNAME'), // Remitente
      to, // Destinatario
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email enviado:', info.response);
      return info;
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  }
}

export default new ServicioEmailRespuesta();
