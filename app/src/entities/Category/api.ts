import { useCallback, useContext } from 'react';
import { CategoriesContext } from './context';
import {
	ICategory,
	ICategoryCreateRequest,
	ICategoryDeleteRequest,
	ICategoryUpdateRequest,
} from './types';
import { useConnect } from 'shared';

const url = '/categories';

export function useCategories() {
	const connect = useConnect();
	const { categories, setCategories, pending } =
		useContext(CategoriesContext);

	const createCategory = useCallback((body: ICategoryCreateRequest) => {
		connect<ICategory>(url, 'post', body).then((res) => {
			if (res) {
				setCategories((prevState) => [...prevState, res.data]);
			}
		});
	}, []);

	const removeCategory = useCallback((body: ICategoryDeleteRequest) => {
		connect(url, 'delete', body).then((res) => {
			if (res) {
				setCategories((prevState) =>
					prevState.filter((c) => c.id !== body.id),
				);
			}
		});
	}, []);

	const updateCategory = useCallback((body: ICategoryUpdateRequest) => {
		connect<ICategory>(url, 'put', body).then((res) => {
			if (res) {
				setCategories((prevState) => {
					const index = prevState.findIndex((c) => c.id === body.id);
					return [
						...prevState.slice(0, index),
						res.data,
						...prevState.slice(index),
					];
				});
			}
		});
	}, []);

	return {
		categories,
		pending,
		createCategory,
		removeCategory,
		updateCategory,
	};
}
