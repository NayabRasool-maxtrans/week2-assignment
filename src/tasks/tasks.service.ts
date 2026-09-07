import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tasks } from './entities/tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from '../projects/entities/project.entity';

import { createtasksdto } from './dto/tasks.dto';
import { updatetasksdto } from './dto/updatetasks.dto';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Tasks) private readonly taskrepo:Repository<Tasks>,
@InjectRepository(Projects) private readonly projectrepo:Repository<Projects>){}

//create tasks
async create(dto:createtasksdto){
   const projectid= await this.projectrepo.findOne({
        where:{id:dto.projectid}
    })
    if(!projectid){
        throw new NotFoundException(`project id ${dto.projectid} not found`)
    }
    
    const task=this.taskrepo.create({
        title:dto.title,
        description:dto.description,
        status:dto.status,
        projectid:dto.projectid,
        projects:projectid
    })
   
    return this.taskrepo.save(task)
    }
   
//getall
async getall(){
   const get= await this.taskrepo.find({
        relations:{projects:true}
    
    })
    return get;

}  
//get by id

async getbyid(id:number){
   const taskid=await this.taskrepo.findOne({where:{
        id
    },relations:{projects:true}})
    if(!taskid){
        throw new NotFoundException(`taskid is ${id} not found`)
    
}
return taskid;
}
//delete by id
async deletebyid(id:number){
    const deleteid=await this.taskrepo.findOne({where:{id}})
    if(!deleteid){
        throw new NotFoundException(`task id is ${id} is not found`)
    }
    return this.taskrepo.remove(deleteid)
}

//upadte by id

async update(id:number,updatedto:updatetasksdto){
    const taskid=await this.taskrepo.findOne({where:{id}})
    if(!taskid){
        throw new NotFoundException(`task id not found ${id}`)
    }
    if(updatedto.projectid){
        const projectid=this.projectrepo.findOne({where:{
             id:updatedto.projectid
        }})
    if(!projectid){
        throw new NotFoundException(`project id ${updatedto.projectid} not found`)
    }
    Object.assign(taskid,updatedto)
    return this.taskrepo.save(taskid);

    }
}






}












