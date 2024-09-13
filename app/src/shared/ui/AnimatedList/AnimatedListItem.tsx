import {
  AnimatePresence,
  Reorder,
  motion,
  useDragControls,
} from 'framer-motion';
import { Grip } from 'lucide-react';
import { ReactNode } from 'react';
import { appTransitions } from 'shared/const';
import { IReorderProps } from 'shared/types';

import Styles from './AnimatedListItem.module.scss';

interface IProps<T> {
  item: T;
  index: number;
  keyProp: keyof T;
  reorder?: IReorderProps<T>;
  renderItem: (item: T, control?: ReactNode, index?: number) => ReactNode;
}

export function AnimatedListItem<T>({
  item,
  index,
  keyProp,
  reorder,
  renderItem,
}: IProps<T>) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      as={'div'}
      id={item[keyProp] as string}
      key={item[keyProp] + '_reorderItem'}
      value={item}
      whileDrag={appTransitions.scale.variants.hidden}
      dragListener={false}
      dragControls={controls}
      transition={{ duration: 0.15 }}
      {...appTransitions.fade}
    >
      {renderItem(
        item,
        <AnimatePresence mode={'popLayout'} initial={false}>
          {reorder?.active && (
            <motion.div
              className={Styles.Control}
              data-key={item[keyProp] + '_dragControl'}
              {...appTransitions.scaleFull}
            >
              <Grip onPointerDown={(e) => controls.start(e)} />
            </motion.div>
          )}
        </AnimatePresence>,
        index,
      )}
    </Reorder.Item>
  );
}
