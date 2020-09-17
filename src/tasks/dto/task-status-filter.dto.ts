import { Taskstatus } from "../task-status.enum";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class filtertaskdto{
    @IsOptional()
    @IsIn([Taskstatus.DONE,Taskstatus.IN_PROGRESS,Taskstatus.OPEN])
    status:Taskstatus

    @IsOptional()
    @IsNotEmpty()
    search:string
}