import { ITaskFull, TTasksReducer } from 'entities/task';

export const tasksReducer: TTasksReducer = (state, { type, data }) => {
  const stateWithChangedItem = (item: ITaskFull) => {
    const index = state.findIndex((s) => s.id === item.id);

    if (!index) {
      return state;
    }

    return [...state.slice(0, index), item, ...state.slice(index + 1)];
  };

  switch (type) {
    case 'get': {
      return data;
    }

    case 'create': {
      const newArr = ([] as ITaskFull[]).concat(state);
      for (const prevTask of newArr) {
        prevTask.order++;
      }
      return [data, ...newArr];
    }

    case 'delete': {
      const newArr = ([] as ITaskFull[]).concat(
        state.filter((t) => t.id !== data),
      );
      for (const index in newArr) {
        newArr[index].order = Number(index) + 1;
      }
      return newArr;
    }

    case 'changeMeta': {
      return stateWithChangedItem(data);
    }

    case 'todosChange': {
      const item = state.find((s) => s.id === data.taskId);
      if (!item) {
        return state;
      }

      item.todosCount = data.todos.length;
      item.doneTodosCount = data.todos.filter((t) => t.checked).length;

      return stateWithChangedItem(item);
    }

    case 'todoToggle': {
      const item = state.find((s) => s.id === data.taskId);
      if (!item) {
        return state;
      }

      item.doneTodosCount = item.doneTodosCount + (data.checked ? 1 : -1);
      
      return stateWithChangedItem(item)
    }

    case 'reset': {
      return [];
    }

    default: {
      return state;
    }
  }
};
