class Global {
	private userIds: string[];
	private codeValidates: Map<string, {
		code: string,
		validate: Date
	}>;
	constructor() {
		this.userIds = [];
		this.codeValidates = new Map<string, {
			code: string,
			validate: Date
		}>();
	}

	public getUserIds(): string[] {
		return this.userIds;
	}

	public setUserIds(updater: (prev: string[]) => string[]) {
		this.userIds = updater(this.userIds);
	}

	// public setCodeValidates(updater: (prev: Map<string, Date>) => Map<string, Date>) {
	// 	this.codeValidates = updater(this.codeValidates);
	// }

	public removeCodeValidate(userId: string) {
		this.codeValidates.delete(userId);
	}

	public addCodeValidate(userId: string, code: string, validate: Date) {
		this.codeValidates.set(userId, {
			code,
			validate,
		});
	}

	public validateCode(userId: string, codeToVerify: string): boolean {
		const validateMethod = this.codeValidates.get(userId);

		if(validateMethod) {
			const { code, validate } = validateMethod;
			const currentDate = new Date();

			if(currentDate < validate) {
				return false;
			}

			code === codeToVerify ? true : false;
		} 
		return false;
	}
}

const globalsVar = new Global();

export default globalsVar;

