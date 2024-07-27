export interface IUser {
	id: number;
	username: string;
	name?: string;
}

export interface IStep {
	id: number;
	name: string;
	icon: string;
}

export interface ITask {
	id: number;
	title: string;
	body: object;
	starts: string | null;
	deadline: string | null;
	step: number;
	category: number | null;
	stepReason: string | null;
	inBasket: boolean;
	created: string;
	updated: string;
}
