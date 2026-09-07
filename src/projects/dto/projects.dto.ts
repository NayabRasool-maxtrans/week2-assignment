import { IsEmail, IsInt, IsNotEmpty, IsString, isString, maxLength, MaxLength, MinLength } from "class-validator"

export class projectsdto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name:string
    @IsString()
    @MaxLength(150)
    description?:string
    @IsNotEmpty()
    @IsInt()
    userId:number

}