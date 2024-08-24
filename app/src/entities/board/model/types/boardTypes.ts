import { IUser } from 'entities/user';

interface IBoardBase {
  id: number;
  slug: string;
  name: string;
}

interface IBoardTaskProgressBase {
  doneTasksCount: number;
  undoneTasksCount: number;
}

export interface IBoard
  extends IBoardBase,
    IBoardTaskProgressBase,
    IBoardChangeUsersRequest {}

export interface IBoardWithUsers extends IBoardBase, IBoardTaskProgressBase {
  users: IUser[];
}

export interface IBoardChangeUsersRequest {
  users: number[];
  managers: number[];
}

export interface IBoardCreateRequest extends IBoardChangeUsersRequest {
  name: string;
}

export interface IBoardContext {
  board: IBoard | null;
  pending: boolean;
  hasManagerAccess: boolean;
}
