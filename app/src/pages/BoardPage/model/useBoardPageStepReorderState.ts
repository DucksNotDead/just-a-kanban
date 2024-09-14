import { useBoard } from 'entities/board';
import { TStep, useStepsApi } from 'entities/step';
import { IUser, useBoardUsers, useCurrentUser } from 'entities/user';
import { useSocket } from 'features/Socket';
import { useCallback, useState } from 'react';

export function useBoardPageStepReorderState() {
  const { setReorder, resetReorder } = useStepsApi();
  const { board } = useBoard();
  const { user } = useCurrentUser();
  const { getUser } = useBoardUsers();
  const [reorderers, setReorderers] = useState<{ [P in TStep]: IUser | null }>({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const handleStepReorderStart = useCallback(
    (stepId: TStep) => {
      void setReorder(board!.slug, stepId);
    },
    [board],
  );

  const handleStepReorderingEnd = useCallback(
    (stepId: TStep) => {
      void resetReorder(board!.slug, stepId);
    },
    [board],
  );

  useSocket(
    {
      event: 'stepReorderingStart',
      callback: ({ from, content: { stepId } }) => {
        if (user && from !== user?.id) {
          setReorderers((prevState) => ({
            ...prevState,
            [stepId]: getUser(from as number),
          }));
        }
      },
    },
    [user, getUser],
  );

  useSocket(
    {
      event: 'stepReorderingEnd',
      callback: ({ from, content: { stepId } }) => {
        if (user && from !== user?.id) {
          setReorderers((prevState) => ({
            ...prevState,
            [stepId]: null,
          }));
        }
      },
    },
    [user],
  );

  return { reorderers, handleStepReorderStart, handleStepReorderingEnd };
}
