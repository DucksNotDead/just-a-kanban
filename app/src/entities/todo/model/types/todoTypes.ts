export interface ITodo {
  id?: number;
  order?: number;
  label: string;
  checked: boolean;
}

export interface ITodoCreateRequest {
  todos: (ITodo | Pick<ITodo, 'label'>)[];
}
