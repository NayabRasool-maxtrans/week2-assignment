import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

import { Tasks } from './entities/tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from '../projects/entities/project.entity';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports:[TypeOrmModule.forFeature([Tasks,Projects])]

})
export class TasksModule {}
