export interface IUser {
	id: number;
	username: string;
	name?: string;
}

export interface IUserResponse {
	user: IUser;
	token: string;
	redirected?: boolean;
}

export interface IUserCredits {
	username: string;
	password: string;
	name?: string
}