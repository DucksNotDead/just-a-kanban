import { Checkbox, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useTodosApi } from 'entities/todo';
import { todoTransitionConfig } from 'features/TodoList/config/todoTransitionConfig';
import { AnimatePresence, motion } from 'framer-motion';
import { FocusEvent, FormEvent, KeyboardEvent, useCallback } from 'react';
import { usePending } from 'shared/utils';

import { ITodoListItem } from '../model/types/todoListTypes';

import Styles from './TodoItem.module.scss';

interface IProps {
  taskId: number | null;
  todo: ITodoListItem;
  editMode: boolean;
  toggleAccess: boolean;
  onInput: (e: FormEvent<HTMLTextAreaElement>, itemKey: string) => void;
  onKeyPress: (e: KeyboardEvent<HTMLTextAreaElement>, itemKey: string) => void;
  onBlur: (e: FocusEvent<HTMLTextAreaElement>, itemKey: string) => void;
}

const { pendingMotionProps, checkboxMotionProps, duration } =
  todoTransitionConfig;

export function TodoItem({
  taskId,
  todo,
  onInput,
  toggleAccess,
  onKeyPress,
  onBlur,
  editMode,
}: IProps) {
  const { toggle } = useTodosApi();

  const [togglePending, setTogglePending] = usePending(false);

  const handleToggle = useCallback(() => {
    if (todo.id && taskId) {
      setTogglePending(() => true);
      toggle(todo.id, taskId).finally(() => setTogglePending(() => false));
    }
  }, [todo]);

  return (
    <div className={Styles.TodoItem}>
      <AnimatePresence mode={'popLayout'}>
        {editMode ? (
          <motion.div
            key={'edit'}
            {...checkboxMotionProps}
            className={Styles.TodoPoint}
          />
        ) : (
          <motion.div key={'view'} {...checkboxMotionProps} layout>
            <AnimatePresence mode={'popLayout'} initial={false}>
              {togglePending ? (
                <motion.div key={'loading'} {...pendingMotionProps}>
                  <Spin />
                </motion.div>
              ) : (
                <motion.div key={'static'} {...pendingMotionProps}>
                  <Checkbox
                    disabled={!toggleAccess}
                    checked={todo.checked}
                    onChange={handleToggle}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        layout={'position'}
        transition={{ duration }}
        className={Styles.TodoTextAreaBlock}
      >
        <TextArea
          value={todo.label}
          variant={'borderless'}
          placeholder={'Что сделать?'}
          disabled={!editMode}
          autoSize={{ minRows: 1 }}
          onInput={(e) => onInput(e, todo.key)}
          onKeyDown={(e) => onKeyPress(e, todo.key)}
          onBlur={(e) => onBlur(e, todo.key)}
        />
      </motion.div>
    </div>
  );
}
