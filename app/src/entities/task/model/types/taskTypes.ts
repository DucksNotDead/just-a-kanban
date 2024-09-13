import { Dayjs } from 'dayjs';
import { TStep } from 'entities/step';
import { useTasksApi } from 'entities/task';
import { ITodo } from 'entities/todo';
import { Dispatch, Reducer } from 'react';
import { IReducerDispatchFnArgsGen } from 'shared/types';

interface ITaskBase {
  title: string;
  starts?: string;
  deadline: string;
}

export interface ITaskMeta extends ITaskBase {
  responsible: number;
  slice: number;
}

export interface ITaskMetaForm extends Omit<ITaskMeta, 'starts' | 'deadline'> {
  starts?: Dayjs;
  deadline: Dayjs;
}

export interface ITaskCreateRequest extends ITaskMeta {}

export interface ITask extends ITaskMeta {
  created: string;
  updated: string;
  order: number;
  todos: number[];
  comments: number[];
  reviewer: number | null;
  step: TStep;
  board: number;
}

export interface ITaskUsersInfo
  extends Pick<ITask, 'responsible' | 'reviewer'> {}

export interface ITaskFull extends ITask {
  id: number;
  todosCount: number;
  doneTodosCount: number;
}

export interface ITasksContextValue {
  tasks: ITaskFull[];
  tasksPending: boolean;
  dispatchTasks: Dispatch<TTasksReducerDispatchArgs>;
}

export interface ITaskReviewerSetResponse {
  taskId: number;
  reviewer: number | null;
}

export interface ITaskOrderChangeResponse {
  taskId: number;
  order: number;
}

export interface ITaskStepChangeResponse {
  taskId: number;
  step: number;
}

type TTaskAction =
  | keyof ReturnType<typeof useTasksApi>
  | 'reset'
  | 'todosChange'
  | 'todoToggle';

type TTasksReducerDispatchFnArgsGen<
  T extends TTaskAction,
  D,
> = IReducerDispatchFnArgsGen<T, D>;

type TTasksReducerDispatchArgs =
  | TTasksReducerDispatchFnArgsGen<'get', ITaskFull[]>
  | TTasksReducerDispatchFnArgsGen<'create', ITaskFull>
  | TTasksReducerDispatchFnArgsGen<'delete', number>
  | TTasksReducerDispatchFnArgsGen<'changeMeta', ITaskFull>
  | TTasksReducerDispatchFnArgsGen<
      'changeStep',
      { taskId: number; stepId: number }
    >
  | TTasksReducerDispatchFnArgsGen<
      'changeOrder',
      { taskId: number; order: number }[]
    >
  | TTasksReducerDispatchFnArgsGen<
      'setReviewer',
      { taskId: number; userId: number | null }
    >
  | TTasksReducerDispatchFnArgsGen<'reset', null>
  | TTasksReducerDispatchFnArgsGen<
      'todosChange',
      { taskId: number; todos: ITodo[] }
    >
  | TTasksReducerDispatchFnArgsGen<
      'todoToggle',
      { taskId: number; checked: boolean }
    >;

export type TTasksReducer = Reducer<ITaskFull[], TTasksReducerDispatchArgs>;
