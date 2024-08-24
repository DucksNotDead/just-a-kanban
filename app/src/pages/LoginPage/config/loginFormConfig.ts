import { IUserCredits } from 'entities/user';

export const loginFormConfig: {
  name: keyof IUserCredits,
  label: string
}[] = [
  { name: 'username', label: 'юзернейм' },
  { name: 'password', label: 'пароль' }
]