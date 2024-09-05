import { ApiField } from '../../../config/swagger';
import { Todo } from '../todos.model';

export class TodoChangeDto {
  @ApiField('TODOS')
  todos: (Todo | { label: string })[];
}
