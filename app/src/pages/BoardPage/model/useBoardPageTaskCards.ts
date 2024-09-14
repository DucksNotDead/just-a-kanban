import { useBoard } from 'entities/board';
import { useTasks, useTasksApi } from 'entities/task';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ITaskCard } from 'widgets/TaskCard';
import { ITaskDetailRef } from 'widgets/TaskDetail';

import { IBoardPageFilters } from './types/boardPageTypes';

export function useBoardPageTaskCards(filters: IBoardPageFilters) {
  const { board } = useBoard();
  const { tasks, tasksPending, dispatchTasks } = useTasks();
  const tasksApi = useTasksApi();
  const [taskCards, setTaskCards] = useState<ITaskCard[]>([]);
  const taskDetailRef = useRef<ITaskDetailRef>(null);

  const filteredTaskCards = useMemo<ITaskCard[]>(() => {
    const { search, user, slice } = filters;
    return taskCards.filter((tc) => {
      const searchMatch =
        !search?.trim().length ||
        tc.task.title.toLowerCase().includes(search?.toLowerCase());
      const userMatch = !user || tc.task.responsible === user;
      const sliceMatch = !slice || tc.task.slice === slice;

      return searchMatch && userMatch && sliceMatch;
    });
  }, [taskCards, filters]);

  const getStepTaskCards = useCallback(
    (stepId: number) => {
      return filteredTaskCards.filter((t) => t.task.step === stepId);
    },
    [filteredTaskCards],
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
    (taskId: number, stepId: number) => {
      const prevStep = tasks.find((t) => t.id === taskId)?.step;
      if (!prevStep) {
        return;
      }
      void tasksApi.changeStep(
        taskId,
        stepId,
        [1, 2].includes(prevStep) ? 'responsible' : 'manager',
      );
    },
    [tasks],
  );

  const handleCardsReorder = useCallback(
    (newOrder: ITaskCard[]) => {
      dispatchTasks({
        type: 'changeOrder',
        data: newOrder.map((tc) => ({ taskId: tc.key, order: tc.task.order })),
      });
      void tasksApi.changeOrder(board!.slug, {
        tasks: newOrder.map(({ task: { id, order } }) => ({
          taskId: id,
          order,
        })),
      });
    },
    [board],
  );

  useEffect(() => {
    setTaskCards((prevState) =>
      [...tasks.map((t) => ({ ...t }))]
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
    tasksPending,
    taskDetailRef,
    handleCardsReorder,
    getStepTaskCards,
    handleCardClick,
    handleCardStepChange,
  };
}
