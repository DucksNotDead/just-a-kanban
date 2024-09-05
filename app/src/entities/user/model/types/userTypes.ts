interface IUserBase {
  username: string;
}

export interface IUser extends IUserCreateRequest {
  id: number;
  avatar: number;
}

export interface IUserCredits extends IUserBase {
  password: string;
}

export interface IUserCreateRequest extends IUserBase {
  name: string;
  isAdmin: boolean;
}

export interface IUserCreateResponse {
  user: IUser;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IUserContextValue {
  user: IUser | null;
  login: (credits: IUserCredits) => Promise<boolean>;
  logout: () => void;
  pending: boolean;
  isLogin: boolean;
  hasToken: boolean;
}

export interface IUsersContextValue {
  users: IUser[];
  usersPending: boolean;
  getUser: (id: number) => IUser|undefined;
}
