import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

// export const Getuser=createParamDecorator((data:unknown,request):User=>{
//     return request.body;
// })


export const Getuser = createParamDecorator(
  (data: string, ctx: ExecutionContext) : User=> {
    const request = ctx.switchToHttp().getRequest();
    return request.user
  },
);