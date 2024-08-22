import { Resolver, Query } from '@nestjs/graphql';
import { TasksService } from './tasks.service';

@Resolver('Task')
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query('tasks')
  findAll() {
    return this.tasksService.findAll();
  }
}
