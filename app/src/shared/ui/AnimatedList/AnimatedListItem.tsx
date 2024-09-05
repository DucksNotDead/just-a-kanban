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
  keyProp: keyof T;
  reorder?: IReorderProps<T>;
  renderItem: (item: T, control?: ReactNode) => ReactNode;
}

export function AnimatedListItem<T>({
  item,
  keyProp,
  reorder,
  renderItem,
}: IProps<T>) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      id={item[keyProp] as string}
      key={item[keyProp] + '_reorderItem'}
      value={item}
      variants={{
        ...appTransitions.fade,
        drag: appTransitions.scale.hidden,
      }}
      initial={'hidden'}
      animate={'visible'}
      exit={'hidden'}
      whileDrag={'drag'}
      dragListener={false}
      dragControls={controls}
      transition={{ duration: .15 }}
    >
      {renderItem(
        item,
        <AnimatePresence mode={'popLayout'} initial={false}>
          {reorder?.active && (
            <motion.div
              className={Styles.Control}
              data-key={item[keyProp] + '_dragControl'}
              variants={appTransitions.scaleFull}
              initial={'hidden'}
              animate={'visible'}
              exit={'hidden'}
            >
              <Grip onPointerDown={(e) => controls.start(e)} />
            </motion.div>
          )}
        </AnimatePresence>,
      )}
    </Reorder.Item>
  );
}
