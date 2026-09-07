import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authserv:AuthService){}

    @Post()
    login(@Body() body:{email:string,password:string}){
        return this.authserv.login(body.email,body.password)

    }
}
