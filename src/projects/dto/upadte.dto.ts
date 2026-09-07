import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, isString, maxLength, MaxLength, MinLength } from "class-validator"

export class updateprojectsdto{
    @IsString()
     @IsOptional()
    @MaxLength(100)
    name?:string
    @IsString()
    @MaxLength(150)
    @IsOptional()
    description?:string
    @IsOptional()
    @IsInt()
    userId?:number

}