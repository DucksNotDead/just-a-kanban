export interface ICategory {
	id: number;
	name: string;
	color: string;
}

export interface ICategoryCreateRequest extends Omit<ICategory, 'id'> {}

export interface ICategoryDeleteRequest extends Pick<ICategory, 'id'> {}

export type ICategoryUpdateRequest = ICategoryDeleteRequest & Partial<ICategoryCreateRequest>