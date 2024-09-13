import { ITaskFull, useTasks } from 'entities/task';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ITaskCard } from 'widgets/TaskCard';
import { ITaskDetailRef } from 'widgets/TaskDetail';

export function useBoardPageTaskCards() {
  const { tasks, tasksPending } = useTasks();
  const [taskCards, setTaskCards] = useState<ITaskCard[]>([]);
  const taskDetailRef = useRef<ITaskDetailRef>(null);

  const getStepTaskCards = useCallback(
    (stepId: number) => {
      return taskCards.filter((t) => t.task.step === stepId);
    },
    [taskCards],
  );

  const handleCardClick = useCallback(
    (taskId: number) => {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        taskDetailRef.current?.open(task);
      }
    },
    [tasks],
  );

  const handleCardStepChange = useCallback(
    (taskId: number, stepId: number) => {},
    [],
  );

  const handleReorder = useCallback((newOrder: ITaskCard[]) => {
    setTaskCards(() => {
      return newOrder.map((tc, index) => ({
        ...tc,
        order: index + 1,
      }));
    });
  }, []);

  useEffect(() => {
    setTaskCards((prevState) =>
      ([] as ITaskFull[])
        .concat(tasks)
        .sort((a, b) => {
          return a.order - b.order;
        })
        .map((task) => {
          const status = prevState.find((tc) => tc.key === task.id)?.status;
          return {
            task,
            key: task.id,
            status: status ?? 'default',
          };
        }),
    );
    return () => {
      setTaskCards(() => []);
    };
  }, [tasks]);

  return {
    taskDetailRef,
    handleReorder,
    getStepTaskCards,
    handleCardClick,
    handleCardStepChange,
  };
}
