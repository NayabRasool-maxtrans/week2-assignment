import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Users) private readonly authorepo:Repository<Users>){}

    async login(email:string,password:string){
       const user= await this.authorepo.findOne({where:{email}})
       if(!user){
         throw new UnauthorizedException('invalid emailid ')
       }
       if(user.password!==password){
          throw new UnauthorizedException('invalid password ')  

       }
       const login={
        id:user.id,
        email:user.email,
        password:user.password
       }
       return {message:'user logined sucessfuly',login}

    }
}
