import { useBoard } from 'entities/board';
import { ITaskUsersInfo } from 'entities/task';
import { useCurrentUser } from 'entities/user';
import { useCallback, useEffect, useState } from 'react';

import { THasAnyFn, THasFn, TTaskAccess } from './types/taskAccessTypes';

export function useTaskAccess(taskUsersInfo: ITaskUsersInfo | null) {
  const { user } = useCurrentUser();
  const { hasManagerAccess } = useBoard();

  const [access, setAccess] = useState<TTaskAccess>([]);

  const hasAccess = useCallback<THasFn>(
    (item) => {
      return access.includes(item);
    },
    [access],
  );

  const hasAnyAccess = useCallback<THasAnyFn>(
    (access) => {
      for (const item of access) {
        if (hasAccess(item)) {
          return true;
        }
      }

      return false;
    },
    [hasAccess],
  );

  useEffect(() => {
    if (user && taskUsersInfo) {
      setAccess(() => {
        const isResponsible = taskUsersInfo.responsible === user.id;
        const isReviewer = taskUsersInfo.reviewer === user.id;
        return [
          ...((hasManagerAccess ? ['manager'] : []) as TTaskAccess),
          ...((isResponsible ? ['responsible'] : []) as TTaskAccess),
          ...((isReviewer ? ['reviewer'] : []) as TTaskAccess),
        ];
      });
    }

    return () => {
      setAccess(() => []);
    };
  }, [hasManagerAccess, user, taskUsersInfo]);

  return { hasAccess, hasAnyAccess, setAccess };
}
