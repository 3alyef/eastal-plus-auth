import { hash } from "bcrypt";
import { randomInt } from "node:crypto";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { StatusCode } from "../../interfaces/IStatusCode";

export default async function encryptData(data: string): Promise<string | IStatusMsg> {
	let EncryptData: string;
	const randomSalt = randomInt(10, 16);
	EncryptData = await hash(data, randomSalt);
	if (!EncryptData) {
		throw { message: "Erro ao encriptar informação.", status: StatusCode.INTERNAL_SERVER_ERROR }; 
	}
	return EncryptData;
}