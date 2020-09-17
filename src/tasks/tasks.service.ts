import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/createtask.dto';
import { filtertaskdto } from './dto/task-status-filter.dto';
import { Taskrepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Taskstatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Taskrepository)
        private taskrepository: Taskrepository,
    ) { }

    async createtask(createtaskdto: CreateTaskDto,user:User): Promise<Task> {
        return this.taskrepository.createtask(createtaskdto,user)
    }

    async gettasks(filterdto:filtertaskdto,user:User):Promise<Task[]>{
        return this.taskrepository.gettasks(filterdto,user)
    }

    async gettaskbyid(id: number,user:User): Promise<Task> {
        const found = await this.taskrepository.findOne({where:{id,userId:user.id}})

        if (!found) {
            throw new NotFoundException(`task with id ${id} is not found`);
        }
        return found
    }

    async deletetaskbyid(id: number,user:User): Promise<void> {
        const result = await this.taskrepository.delete({id,userId:user.id})
        if (result.affected === 0) {
            throw new NotFoundException(`task with id ${id} is not found`);
        }
    }

    async updatetask(id:number,status:Taskstatus,user:User):Promise<Task>{
        const found = await this.taskrepository.findOne({where:{id,userId:user.id}})

        if (!found) {
            throw new NotFoundException(`task with id ${id} is not found`);
        }
        found.status=status
        Task.save(found)
        return found
    }
    // gettaskwithfilter(filterdto:filtertaskdto): Task[] {
    //     const{status,search}=filterdto
    //     let tasks=this.getAllTasks()
    //     if(status){
    //         tasks=tasks.filter((task)=>task.status===status)
    //     }
    //     if(search){
    //         tasks=tasks.filter((task)=>
    //             task.title.includes(search) || task.description.includes(search)
    //         );
    //     }
    //     return tasks
    // }
    // 


    // updateTaskstatus(id:string,status:Taskstatus):Task{
    //     const task=this.tasks.find((task)=>task.id===id)
    //     task.status=status
    //     return task
    // }
}
