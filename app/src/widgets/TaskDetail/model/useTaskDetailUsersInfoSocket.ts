import { ITaskUsersInfo } from 'entities/task';
import { useCurrentUser } from 'entities/user';
import { useSocket } from 'features/Socket';
import { Dispatch, SetStateAction } from 'react';

export function useTaskDetailUsersInfoSocket(
  taskId: number | null,
  setUsersInfo: Dispatch<SetStateAction<ITaskUsersInfo | null>>,
) {
  const { user } = useCurrentUser();

  useSocket(
    {
      event: 'taskMetaChange',
      callback: ({ from, content: { responsible, id } }) => {
        if (user && user.id !== from && taskId === id) {
          setUsersInfo((prevState) =>
            prevState ? { ...prevState, responsible } : null,
          );
        }
      },
    },
    [user, taskId],
  );

  useSocket(
    {
      event: 'taskReviewerSet',
      callback: ({ content }) => {
        if (taskId === content.taskId) {
          setUsersInfo((prevState) =>
            prevState
              ? {
                  ...prevState,
                  reviewer: content.reviewer,
                }
              : null,
          );
        }
      },
    },
    [taskId],
  );
}
