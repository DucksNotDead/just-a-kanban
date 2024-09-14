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
      style={{ position: 'relative' }}
      as={'div'}
      id={item[keyProp] as string}
      key={item[keyProp] + '_reorderItem'}
      value={item}
      whileDrag={appTransitions.scale.variants.hidden}
      dragListener={false}
      dragControls={controls}
      onDragStart={() => reorder?.onStart?.(item)}
      onDragEnd={() => reorder?.onEnd?.(item)}
      transition={{ duration: 0.15 }}
      {...appTransitions.fade}
    >
      {renderItem(
        item,
        <AnimatePresence initial={false}>
          {reorder?.active && (
            <motion.div
              onClick={e => e.stopPropagation()}
              key={item[keyProp] + '_dragControl_key'}
              className={Styles.Control}
              data-key={item[keyProp] + '_dragControl'}
              variants={{
                visible: { width: 'auto', marginRight: 12, opacity: 1 },
                hidden: { width: 0, marginRight: 0, opacity: 0 },
              }}
              initial={'hidden'}
              animate={'visible'}
              exit={'hidden'}
              layout
            >
              <Grip onPointerDown={e => controls.start(e)} />
            </motion.div>
          )}
        </AnimatePresence>,
        index,
      )}
    </Reorder.Item>
  );
}
