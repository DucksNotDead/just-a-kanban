import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';
import { IUser } from 'entities/User/types';

type TUser = IUser | null;

export interface IUserContext {
	user: TUser;
	setUser: Dispatch<SetStateAction<TUser>>;
}

export const UserContext = createContext<IUserContext>({
	user: null,
	setUser: (value) => {},
});

interface IProps {
	children: ReactNode;
}

export function UserContextProvider(props: IProps) {
	const [user, setUser] = useState<TUser>(null);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{props.children}
		</UserContext.Provider>
	);
}
