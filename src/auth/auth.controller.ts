import { Controller, Post, Body, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Usercredentioaldto } from './dto/user-credentioal.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authservice:AuthService
    ){}

    @Post('/signup')
    signup(@Body(ValidationPipe) usercredentioldto:Usercredentioaldto):Promise<void>{
        return this.authservice.signup(usercredentioldto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) usercredentioldto:Usercredentioaldto):Promise<{accesstoken:String}>{
        return this.authservice.signin(usercredentioldto)
    }

}
