import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt'
import { type } from "os";
import { Task } from "src/tasks/task.entity";
@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:String

    @Column()
    password:String

    @Column()
    salt:String

    @OneToMany(type=>Task , task=>task.user, {eager:true} )
    tasks:Task[]

    async validatepassword(password:String):Promise<Boolean>{
        const hash=await bcrypt.hash(password,this.salt)
        return hash===this.password
    }
}