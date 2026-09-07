import { IsEmail, IsNotEmpty, IsOptional, IsString, isString, maxLength, MaxLength, MinLength } from "class-validator"

export class updateusersdto{
    @IsString()
    @IsOptional()
    @MaxLength(100)
    name?:string
    @IsOptional()
    @MaxLength(150)
    email?:string
    @IsString()
    @IsOptional()
    @MinLength(6)
    password?:string

}