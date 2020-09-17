import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createtask.dto';
import { filtertaskdto } from './dto/task-status-filter.dto';
import { taskstatusvalidationpipe } from './pipe/task-status.pipe';
import { Task } from './task.entity';
import { Taskstatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { Getuser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger=new Logger('Taskcontroller')
    constructor(private tasksService: TasksService) { }

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(@Query()filterdto:filtertaskdto,@Getuser() user:User):Promise<Task[]>{
        this.logger.verbose(`user ${user.username} retriving all tasks. filter: ${JSON.stringify(filterdto)}`)
        return this.tasksService.gettasks(filterdto,user)
    }

    @Get('/:id')
    gettask(@Param('id', ParseIntPipe) id: number,@Getuser() user:User): Promise<Task> {
        return this.tasksService.gettaskbyid(id,user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createtask(@Body() createtaskdto: CreateTaskDto,@Getuser() user:User): Promise<Task> {
        this.logger.verbose(`user ${user.username} creating new task. Data: ${JSON.stringify(createtaskdto)}`)
        return this.tasksService.createtask(createtaskdto,user)
    }

    @Delete('/:id')
    deletetask(@Param('id', ParseIntPipe) id: number,@Getuser() user:User): Promise<void> {
        return this.tasksService.deletetaskbyid(id,user)
    }

    @Patch('/:id/status')
    updatetaskstatus(@Param('id', ParseIntPipe) id: number, @Body('status', taskstatusvalidationpipe) status: Taskstatus,@Getuser() user:User): Promise<Task> {
        return this.tasksService.updatetask(id, status,user)
    }

}
