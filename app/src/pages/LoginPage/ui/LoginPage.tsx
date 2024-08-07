import { LoginForm } from './LoginForm';
import { Page } from 'shared';
import { useLoginPage } from '../model/useLoginPage';

export function LoginPage() {
	const { success, pending, handleSubmit } = useLoginPage();

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
