import { hash } from "bcrypt";
import { randomInt } from "node:crypto";
import { IStatusMsg } from "../../interfaces/IStatusMsg";

export default async function encryptData(data: string): Promise<string | IStatusMsg> {
	let EncryptData: string;
	const randomSalt = randomInt(10, 16);
	EncryptData = await hash(data, randomSalt);
	if (!EncryptData) {
		throw { message: "Erro ao encriptar informação: ", status: 500 };
	}
	return EncryptData;
}