import nodemailer, { Transporter } from 'nodemailer';
import { promises as fs } from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import { Subject } from './IEmailSender';
import { Locale } from 'src/lib/locale-views';
import { Views } from 'src/lib/Views';
import getDictionary from 'src/lib/get-dictionary';

class EmailSender {
  private transporter: Transporter;
  private emailFrom: string;
  constructor() {
    const port = Number(process.env.EMAIL_SENDER_PORT) || 0;

    this.emailFrom = process.env.EMAIL_SENDER || '';

    this.transporter = nodemailer.createTransport({
      host: process.env.HOST_SENDER || '',
      port,
      secure: port === 465 ? true : false,
      auth: {
        user: this.emailFrom,
        pass: process.env.PASSWORD_SENDER || '',
      },
    });
  }

  public async sendMsg<T, K>(
    to: string | string[],
    subject: Subject,
    template: Views,
    dataReplace: T,
    language: Locale,
  ) {
    try {
      const templatePath = path.join(
        __dirname,
        `../views-templates/${template}/template.html`,
      );

      const templateFile = await fs.readFile(templatePath, 'utf-8');

      // console.log(templateFile);

      const compiledTemplate = Handlebars.compile(templateFile);

      const bodyMsg = await getDictionary<K>(template, language);

      const htmlContent = compiledTemplate({
        ...bodyMsg,
        ...dataReplace,
        lang: language,
      });

      await this.transporter.sendMail({
        from: `Eastal+ Corporation <${this.emailFrom}>`,
        to,
        subject: subject,
        html: htmlContent,
        text: 'Eastal+ Corporation',
      });

      console.log('Envio bem sucedido');
    } catch (err) {
      console.error('Erro ao enviar email', err);
      return;
    }
  }
}

const emailSender = new EmailSender();

export default emailSender;
