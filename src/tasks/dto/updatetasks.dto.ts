import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { TaskStatus } from "../entities/tasks.entity"

export class updatetasksdto{
    @IsString()
    @IsNotEmpty()
    title?:string
    @IsOptional()
    @IsString()
    descriotion?:string
    @IsEnum(TaskStatus)
     @IsOptional()
    status?:TaskStatus
    @IsInt()
    @IsNotEmpty()
    projectid?:number

}