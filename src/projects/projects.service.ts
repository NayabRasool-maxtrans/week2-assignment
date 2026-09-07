import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Projects } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { projectsdto } from './dto/projects.dto';
import { updateprojectsdto } from './dto/upadte.dto';


@Injectable()
export class ProjectsService {
    constructor(@InjectRepository(Projects) private readonly projectrepo:Repository<Projects>
,@InjectRepository(Users) private readonly userrepo:Repository<Users>){}
   
//create project
async create(createdto:projectsdto){
    let user=await this.userrepo.findOne({
        where:{id:createdto.userId}
    })
    if(!user){
        throw new NotFoundException(`user with id ${createdto.userId} not found`)
    }
    const project=this.projectrepo.create({
        name:createdto.name,
        description:createdto.description,
        userId:createdto.userId
    })
    return this.projectrepo.save(project)
    
}
//get all projects
async findall(){
    return await this.projectrepo.find({relations:{user:true,tasks:true}
})

}
//get by id

async getbyid(id:number){
    const project=await this.projectrepo.findOne({
        where:{id},
        relations:{user:true}
    })
    if(!project){
        throw new NotFoundException(`project id is ${id} not found`)
    }

    return project;

}
//update by id
async update(id:number,updateprojectdto:updateprojectsdto){
   const projectid=await this.projectrepo.find({
        where:{id}
    })
    if(!projectid){
        throw new NotFoundException(`project id not found ${id}`)
    }
    if(updateprojectdto.userId){
       const user= this.userrepo.findOne({
            where:{
                id:updateprojectdto.userId
            }
        })
        if(!user){
            throw new NotFoundException(`user with id ${updateprojectdto.userId}`)
        }
        Object.assign(projectid,updateprojectdto)
    }
    return await this.projectrepo.save(projectid)
}

async remove(id:number){
   const remove=await this.projectrepo.find({where:{id}})
   if(!remove){
    throw new  NotFoundException(`project id ${id} is not found..`)
   }
   this.projectrepo.remove(remove);

}
}
