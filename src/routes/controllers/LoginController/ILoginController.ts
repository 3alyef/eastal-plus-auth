export type deviceType = "mobile" | "web";

export interface reqBodyLogin {
	email: string;
	password: string;
	deviceType: deviceType
}