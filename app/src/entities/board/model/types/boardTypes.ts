import { IUser } from 'entities/user';

interface IBoardBase {
  id: number;
  slug: string;
  name: string;
}

interface IBoardTaskProgressBase {
  tasksCount: number;
  doneTasksCount: number;
}

interface IBoardWithManagerIds {
  managers: number[];
}

export interface IBoard
  extends IBoardBase,
    IBoardTaskProgressBase,
    IBoardChangeUsersRequest {}

export interface IBoardWithUsers
  extends IBoardBase,
    IBoardWithManagerIds,
    IBoardTaskProgressBase {
  users: IUser[];
}

export interface IBoardChangeUsersRequest extends IBoardWithManagerIds{
  users: number[];
}

export interface IBoardCreateRequest extends IBoardChangeUsersRequest {
  name: string;
}

export interface IBoardContext {
  board: IBoard | null;
  boardPending: boolean;
  hasManagerAccess: boolean;
}
