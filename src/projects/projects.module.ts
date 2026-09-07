import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './entities/project.entity';
import { Users } from '../users/entities/users.entity';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports:[TypeOrmModule.forFeature([Projects,Users])]
})
export class ProjectsModule {}
