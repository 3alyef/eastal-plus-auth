export default class GenerateRandomCode {
	public init(length: number, hours: number): { code: string, validate: Date }{
		const code = this.generateRandomCode(length);
		const validate = this.getExpirationDate(hours);
		return { code, validate };
	}

	private generateRandomCode(length: number): string {
		let code = "";
	
		for(let i = 0; i < length; i++) {
			const digit = Math.floor(Math.random() * 10); // Gera um dígito de 0 a 9
			code += digit.toString();
		}
	
		return code;
	}

	private getExpirationDate(hours: number): Date {
		const now = new Date();
		now.setHours(now.getHours() + hours);
		return now;
	}
}