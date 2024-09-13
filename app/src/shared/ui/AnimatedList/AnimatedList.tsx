import { AnimatePresence, Reorder } from 'framer-motion';
import { ReactNode } from 'react';
import { IReorderProps } from 'shared/types';

import { AnimatedListItem } from './AnimatedListItem';

interface ListProps<T> {
  dataSource: T[];
  renderItem: (item: T, control?: ReactNode, index?: number) => ReactNode;
  keyProp: keyof T;
  className?: string;
  reorder?: IReorderProps<T>;
}

export function AnimatedList<T>({
  dataSource,
  reorder,
  keyProp,
  renderItem,
  className,
}: ListProps<T>) {
  return (
    <Reorder.Group
      as={'div'}
      axis={reorder?.axis}
      onReorder={reorder ? reorder.setter : () => {}}
      values={dataSource}
      className={`${className ?? ''}${reorder?.active ? ' noselect' : ''}`}
      layoutScroll
    >
      <AnimatePresence initial={false}>
        {dataSource.map((item, index) => (
          <AnimatedListItem
            key={item[keyProp] as string}
            item={item}
            index={index}
            keyProp={keyProp}
            renderItem={renderItem}
            reorder={reorder}
          />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}
