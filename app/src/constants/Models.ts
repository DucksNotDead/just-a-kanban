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
	starts: string|null
	deadline: string|null
	step: number
	stepReason: string | null
	inBasket: boolean
}