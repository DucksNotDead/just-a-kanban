export class TasksChangeOrderDto {
  tasks: {
    taskId: number;
    order: number;
  }[];
}
