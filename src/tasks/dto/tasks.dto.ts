import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { TaskStatus } from "../entities/tasks.entity"

export class createtasksdto{
    @IsString()
    @IsNotEmpty()
    title:string
    @IsOptional()
    @IsString()
    description?:string
    @IsEnum(TaskStatus)
     @IsOptional()
    status?:TaskStatus
    @IsInt()
    @IsNotEmpty()
    projectid:number

}