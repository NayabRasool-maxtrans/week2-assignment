import { text } from "stream/consumers";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity";
import { ManyToOne } from "typeorm/browser";
import { Tasks } from "../../tasks/entities/tasks.entity";

@Entity()
export class Projects{
    @PrimaryGeneratedColumn()
    id:number
    @Column({length:150})
    name:string
    @Column({type:'text',nullable:true})
    description?:string
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date
    @ManyToOne(()=>Users,(user)=>user.projects,{
        onDelete:'CASCADE'
    })
    user:Users
    @Column()
    userId:number
    @OneToMany(()=>Tasks,(task)=>task.projects)
    tasks:Tasks[]

}