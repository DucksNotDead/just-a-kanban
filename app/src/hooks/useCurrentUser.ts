import { useCallback, useContext, useMemo } from 'react';
import { TOKEN_KEY } from 'constants/Settings';
import { UserContext } from 'app/providers/UserContext';
import { useConnect } from './useConnect';
import { IResponseUser, IUserCredits } from 'constants/Types';

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
				const response = await connect<IResponseUser>(
					registration ? '/registration' : '/login',
					'post',
					credits,
				);
				if (response) {
					setToken(response.token);
					setUser(() => response.user);
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
		const response = await connect<IResponseUser>(
			'/auth',
			'post',
		);
		if (response) {
			setUser(() => response.user);
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
