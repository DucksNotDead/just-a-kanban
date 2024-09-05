import { ITodo } from 'entities/todo';
import { useMemo } from 'react';

import { ITodoListItem } from './types/todoListTypes';

export function useTodoListItems(
  todos: (ITodo | ITodoListItem)[],
): ITodoListItem[] {
  return useMemo(() => {
    return todos.map((todo, index) => {
      const item = todo as ITodoListItem;
      if (item.key === undefined) {
        item.key = `todo_${Date.now() + index}`;
      }
      return item;
    });
  }, [todos]);
}
