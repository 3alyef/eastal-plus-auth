export default class GenerateRandomCode {
	public init(length: number): { code: string }{
		const code = this.generateRandomCode(length);
		return { code };
	}

	private generateRandomCode(length: number): string {
		let code = "";
	
		for(let i = 0; i < length; i++) {
			const digit = Math.floor(Math.random() * 10); // Gera um dígito de 0 a 9
			code += digit.toString();
		}
	
		return code;
	}

}