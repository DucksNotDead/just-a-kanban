import { JSX, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useCurrentUser } from 'entities/User';

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
	}, [user, isLogin, auth]);

	return isLoginPage ? (
		props.children
	) : isLogin ? (
		pending ? (
			<></>
		) : (
			props.children
		)
	) : (
		<Navigate to={'/login'} />
	);
}
