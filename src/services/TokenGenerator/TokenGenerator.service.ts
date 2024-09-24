import * as jwt from "jsonwebtoken";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { StatusCode } from "../../interfaces/IStatusCode";
import { deviceType } from "../../routes/controllers/LoginController/ILoginController";

export default class TokenGenerator {
	public async generateToken<T>(
		content: T,
		{
			refreshToken,
			deviceType
		}: {
			refreshToken: boolean,
			deviceType?: deviceType
		}
	): Promise<string | IStatusMsg> {
		// 1800 => 30min  30 => 0.5min
		let tokenKey;
		let expiresAt;
		
		if(refreshToken === true && deviceType) {
			tokenKey = process.env.TOKEN_KEY_REFRESH || "";
			expiresAt = this.getExpirationTime(deviceType);
		} else {
			tokenKey = process.env.TOKEN_KEY_COMMON || ""
		}
	
		if (!tokenKey) {
			throw {
				message: "TOKEN_KEY não definida no ambiente.",
				status: StatusCode.INTERNAL_SERVER_ERROR,
			};
		}
	
		const token = jwt.sign(content as Record<string, any>, tokenKey, {
			expiresIn: expiresAt || 7200,
		});
		return token;
	}

	private getExpirationTime(deviceType: deviceType): number {
		switch (deviceType) {
			case "mobile":
				return Number(process.env.EXPIRES_AT_MOBILE) || 120;
			case "web":
				return Number(process.env.EXPIRES_AT_WEB) || 120;
			default:
				throw {
					message: `Device type ${deviceType} is not supported.`,
					status: StatusCode.BAD_REQUEST
				};
		}
	}
}

