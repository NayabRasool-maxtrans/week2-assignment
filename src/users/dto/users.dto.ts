import { IsEmail, IsNotEmpty, IsString, isString, maxLength, MaxLength, MinLength } from "class-validator"

import { Column} from "typeorm"
export class usersdto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name:string
    @IsEmail()
    @MaxLength(150)
    email:string
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password:string
    
}