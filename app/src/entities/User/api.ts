import { useCallback, useContext, useMemo } from 'react';
import { UserContext } from './context';
import { useConnect, TOKEN_KEY } from 'shared';
import { IUser, IUserCredits, IUserResponse } from './types';

export function useCurrentUser() {
	const { user, setUser } = useContext(UserContext);
	const connect = useConnect();

	const token = useMemo(() => {
		return window.localStorage.getItem(TOKEN_KEY);
	}, [window.localStorage.getItem(TOKEN_KEY)]);

	const setToken = useCallback((value: string | null) => {
		value
			? window.localStorage.setItem(TOKEN_KEY, value)
			: window.localStorage.removeItem(TOKEN_KEY);
	}, []);

	const isLogin = useMemo(() => !!token, [token]);

	const login = useCallback(
		async (credits: IUserCredits, registration?: boolean) => {
			try {
				const response = await connect<IUserResponse>(
					registration ? '/registration' : '/login',
					'post',
					credits,
				);
				if (response) {
					setToken(response.data.token);
					setUser(() => response.data.user);
				} else {
					return false;
				}
			} catch {
				return false
			}
		},
		[],
	);

	const auth = useCallback(async () => {
		const response = await connect<IUser>(
			'/auth',
			'post',
		);
		if (response) {
			setUser(() => response.data);
			return true;
		} else {
			setToken(null);
			return false;
		}
	}, []);

	const logout = useCallback(() => {
		window.localStorage.removeItem(TOKEN_KEY);
		setUser(() => null);
	}, []);

	const remove = useCallback(async () => {
		const response = await connect('/user', 'delete');
		if (response) {
			setToken(null);
			setUser(() => null);
		}
	}, []);

	return { user, isLogin, login, auth, logout, remove };
}
