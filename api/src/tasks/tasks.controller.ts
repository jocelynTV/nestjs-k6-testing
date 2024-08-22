import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './dto/create-task.input';
import { Task } from './schemas/task.schema';
import { GrpcMethod } from '@nestjs/microservices';
import { TasksGateway } from './tasks.gateway';

@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private readonly tasksGateway: TasksGateway
  ) {}

  @Post()
  async create(@Body() createTaskInput: CreateTaskInput): Promise<Task> {
    const createTask = await this.tasksService.create(createTaskInput);
    this.tasksGateway.createTask(createTask);
    return createTask;
  }

  @GrpcMethod('TasksService')
  findOne(data): Promise<Task> {
    return this.tasksService.findOne(data.id);
  }
}
