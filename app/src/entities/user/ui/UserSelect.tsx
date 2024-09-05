import { IUser, UserItem, useBoardUsers } from 'entities/user';
import { ReactNode, useCallback } from 'react';
import { Select } from 'shared/ui';


interface IProps {
  onChange: (users: IUser[]) => void;
  value?: number[]
  multiple?: boolean;
  menuHeader?: ReactNode;
  filled?: boolean;
}

export function UserSelect({ onChange, value, multiple, menuHeader, filled }: IProps) {
  const { users, usersPending } = useBoardUsers();

  const handleChange = useCallback(
    (newValue: number[]) => {
      onChange(users.filter((u) => newValue.includes(u.id)));
    },
    [users],
  );

  const renderOption = useCallback(
    (id: number) => {
      const user = users.find((u) => u.id === id);
      if (!user) {
        return null;
      }
      return <UserItem avatar={user.avatar} name={user.name} />;
    },
    [users],
  );

  return (
    <Select
      value={value}
      filled={filled}
      data={users.map((user) => ({
        label: user.name,
        value: user.id,
      }))}
      onChange={handleChange}
      entity={'пользователя'}
      multiple={multiple}
      pending={usersPending}
      renderOption={renderOption}
      menuHeader={menuHeader}
    />
  );
}
