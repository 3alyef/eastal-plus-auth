import * as jwt from "jsonwebtoken";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { StatusCode } from "../../interfaces/IStatusCode";

export default async function tokenGenerator<T>(content: T): Promise<string | IStatusMsg> {
	// 1800 => 30min  30 => 0.5min
	const tokenKey = process.env.TOKEN_KEY;

	if(!tokenKey) {
		throw {
			message: "TOKEN_KEY não definida no ambiente.",
			status: StatusCode.INTERNAL_SERVER_ERROR
		}
	}

	const token = jwt.sign(
		content as Record<string, any>,
		tokenKey,
		{ expiresIn: 7200 },
	);
	return token;
}

