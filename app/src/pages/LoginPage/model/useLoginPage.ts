import { IUserCredits, useCurrentUser } from 'entities/User';
import { useNavigate } from 'react-router';
import { useCallback, useEffect, useState } from 'react';

export function useLoginPage() {
	const { user, login } = useCurrentUser();
	const navigate = useNavigate();
	const [pending, setPending] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (user) {
			setTimeout(() => navigate('/tasks'), 1000);
		}
	}, [user]);

	const handleSubmit = useCallback(
		async (credits: IUserCredits) => {
			setPending(() => true);
			const isSuccess = await login(credits, !!credits.name);
			setTimeout(() => setPending(() => false), 1000);
			if (isSuccess) {
				setTimeout(() => setSuccess(() => true), 300)
			}
		},
		[],
	);
	return {success, pending, handleSubmit}
}