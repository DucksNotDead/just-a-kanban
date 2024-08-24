import { Select } from 'antd';
import { IUser, UserAvatar, useUsersApi } from 'entities/user';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import {} from 'rc-select';

import Styles from './UserSelect.module.scss';

interface IProps {
  onChange: (users: IUser[]) => void;
  multiple?: boolean;
  header?: ReactNode;
  width?: number;
}

export function UserSelect({ onChange, multiple, header }: IProps) {
  const usersApi = useUsersApi();
  const [pending, setPending] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);

  const handleChange = useCallback(
    (newValue: number[] | number) => {
      onChange(
        users.filter((u) => {
          if (Array.isArray(newValue)) {
            return newValue.includes(u.id);
          } else {
            return u.id === newValue;
          }
        }),
      );
    },
    [users],
  );

  useEffect(() => {
    setPending(() => true);
    usersApi
      .adminGetUsers()
      .then((data) => {
        data && setUsers(() => data);
      })
      .finally(() => setPending(() => false));
  }, []);

  const renderOption = useCallback(
    (id: number) => {
      const user = users.find((u) => u.id === id);
      if (!user) {
        return null;
      }
      return (
        <div className={Styles.SelectOption}>
          <UserAvatar avatar={user.avatar} />
          {user.name}
        </div>
      );
    },
    [users],
  );

  return (
    <Select
      placeholder={'выбрать пользователя'}
      className={Styles.Select}
      onChange={handleChange}
      filterOption={(inputValue, option) => {
        return !!option?.label.toLowerCase().includes(inputValue.toLowerCase());
      }}
      mode={multiple ? 'multiple' : undefined}
      tokenSeparators={[',']}
      optionRender={({ value: id }) => id && renderOption(Number(id))}
      labelRender={multiple ? undefined : (user) => renderOption(Number(user.value))}
      dropdownRender={(menu) => (
        <div>
          {header}
          {menu}
        </div>
      )}
      options={users.map((user) => ({
        label: user.name,
        value: user.id,
      }))}
      loading={pending}
    />
  );
}
