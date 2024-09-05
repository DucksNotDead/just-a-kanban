import { Dayjs } from 'dayjs';

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

export interface ITask extends Required<ITaskMeta> {
  created: string;
  updated: string;
  order: number;
  todos: number[];
  comments: number[];
  reviewer: number | null;
  step: number;
  board: number;
}

export interface ITaskFull extends ITask {
  id: number;
}

export interface ITaskAccess {
  isResponsible: boolean;
  isReviewer: boolean;
}
