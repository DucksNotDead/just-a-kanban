import { IUserCreateRequest } from 'entities/user';

export const userCreateDialogConfig: {
  name: keyof IUserCreateRequest,
  label: string,
}[] = [
  {
    name: 'username',
    label: 'юзернейм'
  },
  {
    name: 'name',
    label: 'имя фамилия'
  },
  {
    name: 'isAdmin',
    label: 'доступ админа'
  }
]