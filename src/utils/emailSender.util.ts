import  nodemailer, { Transporter } from "nodemailer";

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

	public async sendMsg(to: string[], subject: string) {
		try {
			await this.transporter.sendMail({
				from: `Al PostEl Corporation <${this.emailFrom}>`,
				to,
				subject: subject || "Autênticação de usuário",
				html: `<h1>Al PostEl Corporation</h1>`,
				text: "Al PostEl Corporation",
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