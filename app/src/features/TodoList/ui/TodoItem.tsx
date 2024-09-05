import { Checkbox, Spin } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import TextArea from 'antd/es/input/TextArea';
import { todoTransitionConfig } from 'features/TodoList/config/todoTransitionConfig';
import { AnimatePresence, motion } from 'framer-motion';
import { FocusEvent, FormEvent, KeyboardEvent } from 'react';

import { ITodoListItem } from '../model/types/todoListTypes';

import Styles from './TodoItem.module.scss';

interface IProps {
  todo: ITodoListItem;
  onToggle: (e: CheckboxChangeEvent, itemKey: string) => void;
  editMode: boolean;
  togglePending: boolean;
  toggleAccess: boolean;
  onInput: (e: FormEvent<HTMLTextAreaElement>, itemKey: string) => void;
  onKeyPress: (e: KeyboardEvent<HTMLTextAreaElement>, itemKey: string) => void;
  onBlur: (e: FocusEvent<HTMLTextAreaElement>, itemKey: string) => void;
}

const { pendingMotionProps, checkboxMotionProps, duration } =
  todoTransitionConfig;

export function TodoItem({
  todo,
  onInput,
  onToggle,
  togglePending,
  toggleAccess,
  onKeyPress,
  onBlur,
  editMode,
}: IProps) {

  return (
    <div className={Styles.TodoItem}>
      <AnimatePresence mode={'popLayout'} initial={false}>
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
                    onChange={(e) => onToggle(e, todo.key)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div layout={'position'} transition={{ duration }} className={Styles.TodoTextAreaBlock}>
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
