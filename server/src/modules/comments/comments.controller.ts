import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CommentsService } from './comments.service';
import { CommentCreateDto } from './dto/comment-create-dto';
import { TaskAccess } from '../../access/task';
import { ApiMethod } from '../../config/swagger';
import { ReqBoard } from '../boards/board.decorator';
import { Board } from '../boards/boards.model';
import { ReqTaskId } from '../tasks/task.decorator';
import { TASK_ID_KEY } from '../tasks/tasks.const';
import { ReqUser } from '../users/user.decorator';
import { User } from '../users/users.model';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @ApiMethod('Get task comments (task access)', {
    params: [TASK_ID_KEY],
  })
  @TaskAccess()
  @Get(`:${TASK_ID_KEY}`)
  getAll(@ReqTaskId() id: number) {
    return this.service.getByTask(id);
  }

  @ApiMethod('Create new comment in task (task access)', {
    params: [TASK_ID_KEY],
    body: CommentCreateDto,
  })
  @TaskAccess()
  @Post(`:${TASK_ID_KEY}`)
  create(
    @ReqUser() user: User,
    @ReqBoard() board: Board,
    @ReqTaskId() taskId: number,
    @Body() dto: CommentCreateDto,
  ) {
    return this.service.create(dto, taskId, user, board.slug);
  }
}
