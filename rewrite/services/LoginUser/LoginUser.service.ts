import { StatusCode } from "../../interfaces/IStatusCode";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { reqBodyLogin } from "../../routes/controllers/LoginController/ILoginControllerntroller";
import { getAccountData, TokenGenerator, validatePassword } from "../Services";
import { IAccountLogin, AccessToken, RefreshToken, ILoginResponse } from "./ILoginUser";
import { accountType } from "../../interfaces/IModels";
import { deviceType } from "../../routes/controllers/LoginController/ILoginControllerntroller";
export default class LoginUser {
  private tokenGenerator: TokenGenerator;

  constructor() {
    this.tokenGenerator = new TokenGenerator();
  }
	
  public async init(
    reqBody: reqBodyLogin
  ): Promise<IStatusMsg | ILoginResponse> {
    try {
      const { email, password, deviceType } = reqBody;

      this.validateRequestData(email, password, deviceType);
      const accountLogin = await this.fetchAccountData(email);
      const { userId, accountType } = accountLogin;
      await this.checkPassword(password, accountLogin.password);
			
      return await this.generateTokens(userId, accountType, deviceType);
    } catch (err) {
      const error = err as IStatusMsg;
      console.error(error.message);
      return error;
    }
  }

  private async validateRequestData(
    email: string | undefined,
    password: string | undefined,
    deviceType: string | undefined
  ) {
    if (!email || !password || !deviceType) {
      throw {
        message: "Dados incompletos.",
        status: StatusCode.BAD_REQUEST,
      };
    }
  }

  private async fetchAccountData(email: string): Promise<IAccountLogin> {
    const accountLogin = await getAccountData<IAccountLogin>(
      email,
      "userId accountType password"
    );

    if ("status" in accountLogin) {
      throw accountLogin;
    }
    return accountLogin;
  }

  private async checkPassword(inputPassword: string, storedPassword: string) {
    const isValid = await validatePassword(inputPassword, storedPassword);
    if (!isValid) {
      throw {
        message: "Dados não coincidem.",
        status: StatusCode.UNAUTHORIZED,
      };
    }
  }

  private async generateTokens(
    userId: string,
    accountType: accountType,
    deviceType: deviceType
  ): Promise<ILoginResponse> {
    const accessToken = await this.tokenGenerator.generateToken<AccessToken>(
      { userId, accountType },
      { refreshToken: false }
    );

		if (typeof accessToken === "object") {
			throw accessToken;
		}
		
    const refreshToken = await this.tokenGenerator.generateToken<RefreshToken>(
      { accountType, deviceType, userId },
      { refreshToken: true, deviceType }
    );

		if (typeof refreshToken === "object") {
			throw refreshToken;
		}

    return { accessToken, refreshToken };
  }
}
