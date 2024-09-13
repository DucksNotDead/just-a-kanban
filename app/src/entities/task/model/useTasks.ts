import { tasksContext } from 'entities/task';
import { useContext } from 'react';

export function useTasks() {
  return useContext(tasksContext)
}