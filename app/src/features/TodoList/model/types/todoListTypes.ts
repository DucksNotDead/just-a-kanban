import { ITodo } from 'entities/todo';

export interface ITodoListItem extends ITodo {
  key: string;
}
