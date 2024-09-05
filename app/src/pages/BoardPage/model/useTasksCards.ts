import { useBoard } from 'entities/board';
import { ITask, useTasksApi } from 'entities/task';
import { useEffect, useState } from 'react';

export function useTasksCards() {
  const { board } = useBoard();
  const tasksApi = useTasksApi();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (board?.slug) {
      setPending(() => true);
      tasksApi
        .get(board.slug)
        .then((data) => {
          if (data) {
            setTasks(() => data);
          } else {
          }
        })
        .finally(() => setTimeout(() => setPending(() => false), 700));
    }
  }, [board?.slug]);

  return { pending };
}
