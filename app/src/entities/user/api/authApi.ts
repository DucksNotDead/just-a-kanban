import { ILoginResponse, IUser, IUserCredits } from 'entities/user';
import { useConnect } from 'shared/utils';

const urls = {
  base: '/auth',
  auth() {
    return this.base;
  },
  login() {
    return `${this.base}/login`;
  },
};

export function useAuthApi() {
  const connect = useConnect();

  return {
    auth: async () => await connect<IUser>(urls.auth(), 'post'),
    login: async (credits: IUserCredits) =>
      await connect<ILoginResponse>(urls.login(), 'post', credits),
  };
}
