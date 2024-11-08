import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RedisIoAdapter } from './config/socket-redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:3001',
      package: 'tasks',
      protoPath: join(__dirname, 'tasks/tasks.proto')
    }
  });
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
