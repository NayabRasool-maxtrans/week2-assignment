import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { projectsdto } from './dto/projects.dto';
import { updateprojectsdto } from './dto/upadte.dto';
import { throwError } from 'rxjs';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly  projectservice:ProjectsService){}
    @HttpCode(HttpStatus.CREATED)
    @Post()
    newuser(@Body()project:projectsdto){
       return this.projectservice.create(project)

    }
    @HttpCode(HttpStatus.OK)
    @Get()
    getall(){
       return this.projectservice.findall();
    }
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getbyid(@Param('id',ParseIntPipe)id:number){
       return this.projectservice.getbyid(id);
    }
    @HttpCode(HttpStatus.OK)
    @Put(':id')
    updateproject(@Param('id',ParseIntPipe)id:number,@Body()dto:updateprojectsdto){
        return  this.projectservice.update(id,dto)
    }
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deletebyid(@Param('id' ,ParseIntPipe)id:number){
       const delet= this.projectservice.remove(id)
       return `user is deletedsucessfulty ... ${delet}`

    }
}
