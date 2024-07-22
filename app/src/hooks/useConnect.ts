import { API_BASE_URL, TOKEN_KEY } from 'constants/Settings';

export function useConnect() {
	return function connect<T>(
		path: string,
		method: 'get' | 'post' | 'put' | 'delete' = 'get',
		body?: Record<string, any>,
	) {
		const token = window.localStorage.getItem(TOKEN_KEY);
		return new Promise<T & { success: boolean } | null>((resolve) => {
			fetch(API_BASE_URL + path, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				method,
				body: body ? JSON.stringify(body) : null,
			}).then(async (result) => {
				if (!result.ok) resolve(null);
				else {
					try {
						resolve(await result.json());
					} catch (e) {
						resolve(null);
					}
				}
			});
		});
	};
}
