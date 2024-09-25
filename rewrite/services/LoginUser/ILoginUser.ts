import { accountType } from '../../interfaces/IModels';
import { deviceType } from '../../routes/controllers/LoginController/ILoginControllerntroller';

export interface AccessToken {
	userId: string;
	accountType: accountType;
}

export interface IAccountLogin extends AccessToken {
	password: string;
}

export interface RefreshToken extends AccessToken {
	deviceType: deviceType;
}

export interface ILoginResponse { 
	accessToken: string; 
	refreshToken: string
}