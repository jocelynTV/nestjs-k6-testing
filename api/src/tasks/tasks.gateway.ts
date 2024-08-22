import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer
} from '@nestjs/websockets';
import { TasksService } from './tasks.service';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { Task } from './schemas/task.schema';

@WebSocketGateway({
  cors: {
    origin: '*'
  },
  transports: ['websocket']
})
@Injectable()
export class TasksGateway {
  constructor(private readonly tasksService: TasksService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('findAllTasks')
  findAll() {
    return this.tasksService.findAll();
  }

  createTask(data: Task) {
    this.server.emit('createTask', data);
  }
}
