
import {Column,CreateDateColumn,Entity,OneToMany,PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import { Projects } from '../../projects/entities/project.entity'
@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id:number
    @Column({length:100})
    
    name:string
    @Column({unique:true})
    email:string
    @Column()
    password:string
    @CreateDateColumn()
    created_at:Date
    @UpdateDateColumn()
    updated_at:Date
    @OneToMany(()=>Projects,(project)=>project.user)
    projects:Projects[]

    
    
}