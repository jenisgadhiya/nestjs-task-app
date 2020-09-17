import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { Taskstatus } from "../task-status.enum";

export class taskstatusvalidationpipe implements PipeTransform{

    readonly validstatus=[
        Taskstatus.OPEN,
        Taskstatus.IN_PROGRESS,
        Taskstatus.DONE
    ]
    transform(value:any){

        value=value.toUpperCase()
        if(!this.isvalidstatus(value)){
            throw new BadRequestException
        }
        return value
        
    } 

    private isvalidstatus(status:any){
        const index=this.validstatus.indexOf(status)
        return index !== -1
    }
}