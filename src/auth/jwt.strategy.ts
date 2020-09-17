import {PassportStrategy} from '@nestjs/passport'
import { Strategy,ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { jwtpayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Userrepository } from './user.repository';
import * as config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(Userrepository)
        private userRepository:Userrepository,
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET || config.get('jwt.secret')
        });
    }
    async validate(payload:jwtpayload){
        const {username}=payload
        const user=await this.userRepository.findOne({username})
        if(!user){
            throw new UnauthorizedException('')
        }
        return user;
    }
}