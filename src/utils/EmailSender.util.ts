import  nodemailer, { Transporter } from "nodemailer";
import { promises as fs } from 'fs';
import Handlebars from "handlebars";
import path from "path";

class EmailSender {
	private transporter: Transporter;
	private emailFrom: string;
	constructor() {
		const port = Number(process.env.EMAIL_SENDER_PORT) || 0;

		this.emailFrom = process.env.EMAIL_SENDER || "";

		this.transporter = nodemailer.createTransport({
			host: process.env.HOST_SENDER || "",
			port,
			secure: port === 465 ? true : false,
			auth: {
				user: this.emailFrom,
				pass: process.env.PASSWORD_SENDER || "",
			}
		});
	}

	public async sendMsg<T>(to: string[], subject: string, htmlURL: string, dataReplace: T) {
		try {
			const templatePath = path.join(__dirname, htmlURL);

			const template = await fs.readFile(templatePath, 'utf-8');

			const compiledTemplate = Handlebars.compile(template);

			const htmlContent = compiledTemplate(dataReplace);
			
			await this.transporter.sendMail({
				from: `East Al Plus Corporation <${this.emailFrom}>`,
				to,
				subject: subject || "Autênticação de usuário",
				html: htmlContent,
				text: "East Al Plus Corporation",
			});

			console.log("Envio bem sucedido");
		} catch(err) {
			console.error("Erro ao enviar email", err);
			return;
		}
	}
}

const emailSender = new EmailSender();

export default emailSender;