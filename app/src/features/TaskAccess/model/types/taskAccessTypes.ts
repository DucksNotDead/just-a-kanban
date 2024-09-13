import { Dispatch, SetStateAction } from 'react';

export type TTaskAccess = [...('responsible' | 'manager' | 'reviewer')[]];

export type THasFn = (access: TTaskAccess[number]) => boolean;

export type THasAnyFn = (access: TTaskAccess) => boolean;

export interface ITaskAccessContextValue {
  hasAccess: THasFn;
  hasAnyAccess: THasAnyFn;
  setAccess: Dispatch<SetStateAction<TTaskAccess>>;
}
