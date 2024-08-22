import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTaskInput } from './dto/create-task.input';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  create(createTaskInput: CreateTaskInput): Promise<Task> {
    const createdTask = new this.taskModel(createTaskInput);
    return createdTask.save();
  }

  findAll(): Promise<Task[]> {
    return this.taskModel.find();
  }

  findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }
}
