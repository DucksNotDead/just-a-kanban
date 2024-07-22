import { JSX, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { AppPreloader } from 'widgets/AppPreloader';

interface IProps {
	children: JSX.Element;
}

export function AuthGuard(props: IProps) {
	const { pathname } = useLocation();
	const { isLogin, user, auth } = useCurrentUser();
	const isLoginPage = useMemo(
		() => pathname === '/login',
		[pathname],
	);
	const [pending, setPending] = useState(true);

	useEffect(() => {
		if (isLogin && !user) void auth();
		else setTimeout(() => setPending(() => false), 500);
	}, [user, isLogin]);

	return isLoginPage ? (
		props.children
	) : isLogin ? (
		pending ? (
			<AppPreloader />
		) : (
			props.children
		)
	) : (
		<Navigate to={'/login'} />
	);
}
