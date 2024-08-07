import { useCategories } from 'entities/Category/api';
import { useCallback } from 'react';
import { ICategory } from 'entities/Category';

export function useCategorySelect() {
	const { categories } = useCategories();

	const categoryToId = useCallback(
		(category?: ICategory | number): number | undefined => {
			return typeof category === 'number' ? category : category?.id;
		},
		[],
	);

	const idToCategory = useCallback(
		(id: number) => {
			return categories.find((category) => category.id === id);
		},
		[categories],
	);

	const idToColor = useCallback((id: number) => {
		const category = idToCategory(id);
		return category ? category.color : '#fff';
	}, [idToCategory]);

	const handleSearch = useCallback(
		(inputValue: string, option?: { value: number; label: string }) => {
			return !!option?.label
				.toLowerCase()
				.includes(inputValue.toLowerCase());
		},
		[],
	);

	return {
		categories,
		categoryToId,
		idToCategory,
		idToColor,
		handleSearch,
	};
}
