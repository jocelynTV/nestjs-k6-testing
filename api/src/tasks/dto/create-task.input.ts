import { IsString } from 'class-validator';

export class CreateTaskInput {
  @IsString()
  title: string;
}
