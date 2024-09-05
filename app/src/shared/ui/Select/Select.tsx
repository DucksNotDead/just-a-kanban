import { Select as AntSelect } from 'antd';
import { ReactNode, useCallback } from 'react';

import Styles from './Select.module.scss';

interface IOption {
  label: string;
  value: number;
}

interface IProps {
  value: number[]|undefined;
  data: IOption[];
  entity: string;
  onChange: (ids: number[]) => void;
  multiple?: boolean;
  pending?: boolean;
  menuHeader?: ReactNode;
  renderOption?: (id: number) => ReactNode;
  filled?: boolean;
}

export function Select({
  value,
  data,
  entity,
  onChange,
  multiple,
  pending,
  menuHeader,
  renderOption,
  filled
}: IProps) {
  const handleChange = useCallback((selected: number | number[]) => {
    onChange(Array.isArray(selected) ? selected : [selected]);
  }, [data]);

  const renderInlineOption = useCallback(
    (id: number) => {
      return (
        <div className={Styles.SelectOption}>
          {renderOption && renderOption(id)}
        </div>
      );
    },
    [renderOption],
  );

  return (
    <AntSelect
      value={value}
      variant={filled? 'filled' : 'outlined'}
      allowClear={true}
      placeholder={'выбрать ' + entity}
      mode={multiple ? 'multiple' : undefined}
      tokenSeparators={[',']}
      className={Styles.Select}
      onChange={handleChange}
      filterOption={(inputValue, option) => {
        return !!(option?.label as string)
          ?.toLowerCase()
          .includes(inputValue.toLowerCase());
      }}
      optionRender={
        renderOption &&
        (({ value: id }) => id && renderInlineOption(Number(id)))
      }
      labelRender={
        renderOption &&
        (multiple
          ? undefined
          : (user) => renderInlineOption(Number(user.value)))
      }
      dropdownRender={(menu) => (
        <>
          <div className={Styles.SelectMenuHeader}>{menuHeader}</div>
          <div className={Styles.SelectMenuItems}>{menu}</div>
        </>
      )}
      options={data}
      loading={pending}
    />
  );
}
