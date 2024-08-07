import { ReactNode } from 'react';

export interface IAppRoute {
	path: string;
	element: ReactNode;
}

export type TAppResponse<T> = { success: boolean; data: T } | null;
