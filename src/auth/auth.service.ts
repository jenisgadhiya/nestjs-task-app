import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Userrepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Usercredentioaldto } from './dto/user-credentioal.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtpayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    private logger=new Logger('Authservice')
    constructor(
        @InjectRepository(Userrepository)
        private userrepository:Userrepository,
        private jwtservice:JwtService
    ){}

    async signup(usercredentioaldto:Usercredentioaldto):Promise<void>{
        this.userrepository.signup(usercredentioaldto)
    }

    async signin(usercredentioaldto:Usercredentioaldto):Promise<{accesstoken:String}>{
        const username=await this.userrepository.validateuserpassword(usercredentioaldto)

        if(!username){
            throw new UnauthorizedException('invalid credentials')
        }

        const payload:jwtpayload={username}
        const accesstoken=await this.jwtservice.sign(payload)
        this.logger.debug(`Genrated jwt token with payload ${JSON.stringify(payload)}`)

        return {accesstoken}


        
    }
}
