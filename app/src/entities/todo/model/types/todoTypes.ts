export interface ITodo {
  id?: number;
  label: string;
  checked: boolean;
}

export interface ITodoCreateRequest {
  todos: (ITodo | Pick<ITodo, 'label'>)[];
}
