import { IStatusMsg } from "../../interfaces/IStatusMsg";

export interface IForgotPasswordRes extends IStatusMsg {
	expiresAt: Date;
}