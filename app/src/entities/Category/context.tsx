import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { ICategory } from 'entities/Category/types';
import { useConnect } from 'shared';
import { useCurrentUser } from 'entities/User';

export interface ICategoriesContext {
	pending: boolean;
	categories: ICategory[];
	setCategories: Dispatch<SetStateAction<ICategory[]>>;
}

export const CategoriesContext = createContext<ICategoriesContext>({
	categories: [],
	setCategories: () => [],
	pending: true,
});

interface IProps {
	children: ReactNode;
}

export function CategoriesContextProvider(props: IProps) {
	const { isLogin } = useCurrentUser()
	const connect = useConnect();
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [pending, setPending] = useState(true);

	useEffect(() => {
		if (isLogin) {
			connect<ICategory[]>('/categories').then((res) => {
				if (res) {
					setCategories(res.data);
				}
				setPending(false);
			});
		}
	}, [isLogin]);

	return (
		<CategoriesContext.Provider
			value={{ categories, setCategories, pending }}
		>
			{props.children}
		</CategoriesContext.Provider>
	);
}
