import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { usersdto } from './dto/users.dto';
import { updateusersdto } from './dto/update.userdto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users)  private readonly userrepository:Repository<Users>){}
 //create user here 
    async create(createuser:usersdto){
        const existingemailid=await this.userrepository.findOne({
            where:{
                email:createuser.email
            }
        })
        if(existingemailid){
            throw new ConflictException('Email id Already Exists..')
        }
       const user=this.userrepository.create({
            name:createuser.name,
            email:createuser.email,
            password:createuser.password

        })
       
        return this.userrepository.save(user)

    }
//get all
    async getall(){
        return this.userrepository.find({relations:{projects:true}});
    }

//get by id
async findone(id:number){
   let userid= await this.userrepository.findOne({
        where:{id}
    })
    if(!userid){
        throw new NotFoundException(`user id ${id} not exists`)
    }
    return userid;

}
//get by email based on query
async findemail(email:string){
    let emailid=await this.userrepository.findOne({where:{email}})
    return emailid;
}
//update user
async updateuser(updatedto:updateusersdto,id:number){
    const existid=await this.userrepository.findOne({where:{id}})
    if(!existid){
        throw new NotFoundException(`USER id ${id} not found`)
    }
    if(updatedto.email && updatedto.email!==existid.email){
       const existingemailid=await this.userrepository.findOne({where:{email:updatedto.email}})
       if(existingemailid){
        throw new ConflictException(`emailid already exists`)

       }

    }
    Object.assign(existid,updatedto)
    return this.userrepository.save(existid)

}
//delete by id

async deletebyid(id:number){
    const existing= await this.userrepository.findOne({where:{id}})
    if(!existing){
        throw new NotFoundException(`user id not exists ${id}`)
    }
    await this.userrepository.remove(existing);
    return `user deleted sucessfully ${existing}`


}

}
