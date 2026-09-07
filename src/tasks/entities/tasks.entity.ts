import {  Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Projects } from "../../projects/entities/project.entity"

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
@Entity()
export class Tasks{
    @PrimaryGeneratedColumn()
    id:number
    @Column({length:100})
    title:string
    @Column({type:'text',nullable:true})
    description?:string
    @Column({
        type:'enum',
        enum:TaskStatus,
        default:'TODO'
    })
    status:TaskStatus
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date
    @ManyToOne(()=>Projects,(project)=>project.tasks,{onDelete:'CASCADE'})
    projects:Projects
    @Column()
    projectid:number
        
}