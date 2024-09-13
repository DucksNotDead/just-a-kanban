import { ITodo } from 'entities/todo';
import { AnimatedList } from 'shared/ui';

import { TodoItem } from './TodoItem';
import { ITodoListItem } from '../model/types/todoListTypes';
import { useTodoListEdit } from '../model/useTodoListEdit';
import { useTodoListItems } from '../model/useTodoListItems';

import Styles from './TodoList.module.scss';

interface IProps {
  taskId: number | null;
  value: ITodo[];
  onChange: (value: ITodoListItem[]) => void;
  editMode: boolean;
  toggleAccess: boolean;
}

const containerClassName = 'todoList';
const itemClassName = 'todoItem';

export function TodoList({
  taskId,
  value,
  onChange,
  editMode,
  toggleAccess,
}: IProps) {
  const items = useTodoListItems(value);

  const {
    listRef,
    handleInput,
    handleInputKeyPress,
    handleBlur,
  } = useTodoListEdit(
    items,
    onChange,
    editMode,
    containerClassName,
    itemClassName,
  );

  return (
    <div ref={listRef}>
      <AnimatedList
        dataSource={items}
        keyProp={'key'}
        className={containerClassName}
        reorder={{
          active: editMode,
          axis: 'y',
          setter: onChange,
        }}
        renderItem={(todo, control) => (
          <div
            className={`${Styles.TodoListItem} ${itemClassName}`}
            data-key={todo.key}
          >
            <TodoItem
              taskId={taskId}
              editMode={editMode}
              todo={todo}
              toggleAccess={toggleAccess}
              onInput={handleInput}
              onKeyPress={handleInputKeyPress}
              onBlur={handleBlur}
            />
            {control}
          </div>
        )}
      />
    </div>
  );
}
