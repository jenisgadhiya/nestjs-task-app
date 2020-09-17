import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/createtask.dto";
import { Taskstatus } from "./task-status.enum";
import { NotFoundException, Logger, InternalServerErrorException } from "@nestjs/common";
import { filtertaskdto } from "./dto/task-status-filter.dto";
import { User } from "src/auth/user.entity";
@EntityRepository(Task)
export class Taskrepository extends Repository<Task>{
    private logger=new Logger('taskrepository')

    async gettasks(filterdto:filtertaskdto,user:User):Promise<Task[]>{
        const {status,search}=filterdto
        const query=this.createQueryBuilder('task')
        query.where('task.userId=:userid',{userid:user.id})
        if(status){
            query.andWhere('task.status=:status',{status})
        }
        if(search){
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)',{search:`%${search}%` })
        }

        try{
            const task=await query.getMany()
            return task
        }catch(error){
            this.logger.error(`failed to get task for user ${user.username}.Filter:${JSON.stringify(filterdto)}`,error.stack)
            throw new InternalServerErrorException()
        }

        
    }

    async createtask(createtaskdto:CreateTaskDto,user:User):Promise<Task>{
        const {title,description}=createtaskdto
        const task=new Task()
        task.title=title
        task.description=description
        task.status=Taskstatus.OPEN
        task.user=user
        

        try{
            await task.save()
        }catch(error){
            this.logger.error(`failed to create a task for user ${user.username}. Data:${createtaskdto}`,error.stack)
            throw new InternalServerErrorException()
        }

        delete task.user
        return task
    }
}