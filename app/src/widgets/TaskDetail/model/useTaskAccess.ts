import { ITaskAccess, useTasksApi } from 'entities/task';
import { useEffect, useState } from 'react';

export function useTaskAccess(taskId?: number) {
  const taskApi = useTasksApi();
  const [access, setAccess] = useState<ITaskAccess | null>(null);
  const [accessPending, setAccessPending] = useState(false);

  useEffect(() => {
    if (taskId) {
      setAccessPending(() => true);
      taskApi
        .getAccess(taskId)
        .then((value) => {
          setAccess(() => value);
        })
        .finally(() => setAccessPending(() => false));
    }
  }, [taskId]);

  return { access, accessPending };
}
