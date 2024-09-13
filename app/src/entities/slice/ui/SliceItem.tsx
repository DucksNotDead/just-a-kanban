import { useSlices } from 'entities/slice';
import { ReactNode } from 'react';
import { toFixedName } from 'shared/utils';

import { sliceNameLen } from '../model/const/sliceConst';

import Styles from './SliceItem.module.scss';

interface IProps {
  id: number;
  postfix?: ReactNode;
}

export function SliceItem({ id, postfix }: IProps) {
  const { slices } = useSlices();
  const slice = slices.find((s) => s.id === id);

  if (slice) {
    return (
      <div className={Styles.SliceItem}>
        <div
          className={Styles.SliceColor}
          style={{ backgroundColor: slice.color }}
        />
        <div className={Styles.SliceName}>
          {toFixedName(slice.name, sliceNameLen)}
        </div>
        {postfix}
      </div>
    );
  } else {
    return <></>;
  }
}
