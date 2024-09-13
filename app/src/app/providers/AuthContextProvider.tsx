import { IUser, IUserCredits, useAuthApi, userContext } from 'entities/user';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_KEY, appRoutes } from 'shared/const';
import { usePending } from 'shared/utils';

interface IProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: IProps) {
  const [pending, setPending] = usePending(false);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const api = useAuthApi();

  function timeout() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  }

  const token = useMemo(
    () => localStorage.getItem(TOKEN_KEY),
    [localStorage.getItem(TOKEN_KEY)],
  );

  const hasToken = useMemo(() => !!token, [token]);

  const isLogin = useMemo(() => !!user, [user]);

  const auth = useCallback(async () => {
    setPending(() => true);
    const data = await api.auth();
    setPending(() => false);
    if (data) {
      setUser(() => data);
      return true;
    } else {
      localStorage.removeItem(TOKEN_KEY);
      setUser(() => null);
      return false;
    }
  }, []);

  const login = useCallback(async (credits: IUserCredits) => {
    setPending(() => true);
    const data = await api.login(credits);
    await timeout();
    setPending(() => false);
    if (data) {
      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(() => data.user);
      return true;
    } else {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(() => null);
  }, []);

  useEffect(() => {
    if (hasToken) {
      if (!isLogin) {
        auth().then((res) => {
          if (!res) {
            navigate(appRoutes.login);
          }
        });
      }
    } else {
      navigate(appRoutes.login);
    }
  }, [hasToken, isLogin]);

  return (
    <userContext.Provider
      value={{ user, login, logout, pending, isLogin, hasToken }}
    >
      {children}
    </userContext.Provider>
  );
}
