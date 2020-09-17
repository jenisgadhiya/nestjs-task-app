import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'
import { Usercredentioaldto } from "./dto/user-credentioal.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class Userrepository extends Repository<User>{
    async signup(usercredentioaldto:Usercredentioaldto):Promise<void>{
        const {username,password}=usercredentioaldto
        
        const user=new User()
        user.username=username
        user.salt=await bcrypt.genSalt()
        user.password=await this.hashpassword(password,user.salt)

        try{
            await user.save()
        }catch(error){
            if(error.code==='23505'){
                throw new ConflictException('username already exist..')
            }else{
                throw new InternalServerErrorException()
            }
        }
        
    }

    private async hashpassword(password:String,salt:String):Promise<String>{
        return bcrypt.hash(password,salt)
    }

    async validateuserpassword(usercredentioaldto:Usercredentioaldto):Promise<String>{
        const {username,password}=usercredentioaldto
        const user=await this.findOne({username})

        if(user && await user.validatepassword(password)){
            return user.username;
        }else{
            return null
        }
    }
}