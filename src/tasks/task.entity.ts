import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Taskstatus } from "./task-status.enum";
import { User } from "src/auth/user.entity";
import { userInfo } from "os";

@Entity()
export  class Task extends BaseEntity{
   @PrimaryGeneratedColumn()
   id:number;

   @Column()
   title:string;

   @Column()
   description:string;
   
   @Column()
   status:Taskstatus;

   @ManyToOne(type=>User,user=>user.tasks,{eager:false})
   user:User

   @Column()
   userId:number

}