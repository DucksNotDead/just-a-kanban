import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, TOKEN_KEY, appRoutes } from 'shared/const';

export function useConnect() {
  const navigate = useNavigate();
  return function connect<T = void>(
    path: string,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete' = 'get',
    body?: Record<string, any>,
  ): Promise<T | null> {
    const token = localStorage.getItem(TOKEN_KEY);
    return new Promise<T | null>((resolve) => {
      fetch(API_BASE_URL + path, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        method,
        body: body ? JSON.stringify(body) : null,
      }).then(async (result) => {
        if (!result.ok) {
          if (result.status === 401) {
            navigate(appRoutes.login);
          }
          resolve(null);
        } else {
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
