import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createtasksdto } from './dto/tasks.dto';
import { updateprojectsdto } from '../projects/dto/upadte.dto';
import { updatetasksdto } from './dto/updatetasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksservice:TasksService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()create:createtasksdto){
        return this.tasksservice.create(create);

    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findall(){
        return this.tasksservice.getall();

    }
    @HttpCode(HttpStatus.OK)
     @Get(':id')
     findbyid(@Param('id')id:number){
        return this.tasksservice.getbyid(id);
     }
     @HttpCode(HttpStatus.NO_CONTENT)
     @Delete(':id')
     deletebyid(id:number){

        this.tasksservice.deletebyid(id) 

     }
     @HttpCode(HttpStatus.OK)
     @Put(':id')
     updatebyid(@Param('id',ParseIntPipe) id:number,@Body()dto:updatetasksdto){
        return this.tasksservice.update(id,dto);

     }
    
}
