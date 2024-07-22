import { useCallback, useEffect, useState } from 'react';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { useNavigate } from 'react-router';
import { Page } from 'entities/Page';
import { LoginForm } from 'widgets/LoginForm';
import { IUserCredits } from 'constants/Types';

export function LoginPage() {
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

	return (
		<Page centered padding>
			<LoginForm
				onSubmit={handleSubmit}
				pending={pending}
				success={success}
			/>
		</Page>
	);
}
