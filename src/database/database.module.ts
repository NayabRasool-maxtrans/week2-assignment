import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ConfigModule,ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(configService:ConfigService)=>({
                type:'mysql',
                host:configService.get<string>('DB_HOST'),
                port:configService.get<number>('DB_PORT'),
                username:configService.get<string>('DB_USERNAME'),
                password:configService.get<string>('DB_PASSWORD'),
                database:configService.get<string>('DB_DATABASE'),
                synchronize:true,
                autoLoadEntities:true


            })
        })
        ,UsersModule,ProjectsModule,TasksModule
    ]
})
export class DatabaseModule {}
