import { ReactNode } from 'react';
import { IUser } from './Models';

export interface IAppRoute {
	path: string;
	element: ReactNode;
}

export interface IResponseUser {
	user: IUser;
	token: string;
	redirected?: boolean;
}

export interface IUserCredits {
	username: string;
	password: string;
	name?: string
}