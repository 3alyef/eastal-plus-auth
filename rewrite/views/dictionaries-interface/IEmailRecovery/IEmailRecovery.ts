import { Locale } from "../../lib/locale-views";

export default interface IEmailRecovery {
	recoveryHeaderH1: string;
	recoveryMainP1: string;
	recoveryMainP2: string;
	recoveryMainP3: string;
	recoveryFooterSpan1: string;
	recoveryFooterSpan2: string;
}

export interface IEmailRecoveryCode {
	code: string;
}
