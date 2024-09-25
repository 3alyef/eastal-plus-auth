import { Subject } from "../../interfaces/IEmailSender";
import { IAccount } from "../../interfaces/IModels";
import { StatusCode } from "../../interfaces/IStatusCode";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import emailSender from "../../utils/EmailSender.util";
import {
  IEmailRecovery,
  IEmailRecoveryCode,
} from "../../views/dictionaries-interface/IDictionaries";
import { Locale } from "../../views/lib/locale-views";
import { Views } from "../../views/lib/Views";
import {
  ConfirmationCode,
  GenerateRandomCode,
  getAccountData,
} from "../Services";
import { IForgotPasswordRes } from "./IForgotPassword";

export default class ForgotPassword {
  private generateRandomCode: GenerateRandomCode;
  private confirmationCode: ConfirmationCode;
  constructor() {
    this.generateRandomCode = new GenerateRandomCode();
    this.confirmationCode = new ConfirmationCode();
  }
  public async init(email: string): Promise<IStatusMsg | IForgotPasswordRes> {
    try {
      this.validateRequestData(email);

      const { language } = await this.fetchAccountData(email);

      const { code, expiresTimeCode } = await this.createConfirmationCode(
        email
      );

      await this.sendEmail(email, code, language);

      return {
        message: `Email enviado.`,
        expiresAt: expiresTimeCode,
        status: StatusCode.OK,
      };
    } catch (err) {
      const error = err as IStatusMsg;
      console.log(error.message);
      return error;
    }
  }

  private validateRequestData(email: string | undefined) {
    if (!email || !email.includes("@")) {
      throw {
        message: "Email incompleto ou faltando.",
        status: StatusCode.BAD_REQUEST,
      };
    }
  }

  private async fetchAccountData(email: string): Promise<
    | {
        language: Locale;
      }
    | IAccount
  > {
    const response = await getAccountData<{
      language: Locale;
    }>(email, "language");

    if ("status" in response) {
      throw response;
    }

    return response;
  }

  private async sendEmail(email: string, code: string, language: Locale) {
    await emailSender.sendMsg<IEmailRecoveryCode, IEmailRecovery>(
      email,
      Subject.AccountRecovery,
      Views.EmailRecovery,
      {
        code,
      },
      language
    );
  }

  private async createConfirmationCode(email: string): Promise<{
    expiresTimeCode: Date;
    code: string;
  }> {
    const { code } = this.generateRandomCode.init(6);

    const create = await this.confirmationCode.createConfirmationCode(
      email,
      code
    );

    const expiresTimeCode = await this.confirmationCode.getExpiresTime(
      email,
      code
    );

    if (create.status !== StatusCode.CREATED) {
      throw create;
    } else if ("status" in expiresTimeCode) {
      throw expiresTimeCode;
    }

    return { expiresTimeCode, code };
  }
}
