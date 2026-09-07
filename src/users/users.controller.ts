import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { get } from 'http';
import { usersdto } from './dto/users.dto';
import { updateusersdto } from './dto/update.userdto';

@Controller('users')
export class UsersController {
    constructor(private readonly userservice:UsersService){}
    @Get()
    getall(){
        return this.userservice.getall();

    }
    @Get(':id')
    getbyid(@Param('id',ParseIntPipe)id:number){
       return this.userservice.findone(id)

    }
    @Get()
    getbyemail(@Query('email')email:string){
       return this.userservice.findemail(email)
    }
    @Post()
    newuser(@Body() body:usersdto){
       return this.userservice.create(body)

    }
    @Put(':id')
    updateuser(@Body() update:updateusersdto,@Param('id',ParseIntPipe)id:number){
        return this.userservice.updateuser(update,id)
    }
    @Delete(':id')
    Deleteid(@Param('id',ParseIntPipe)id:number){
        return this.userservice.deletebyid(id);
    }
}
