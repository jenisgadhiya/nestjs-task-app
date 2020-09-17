import { IsString, MinLength, MaxLength, Matches } from "class-validator"

export class Usercredentioaldto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username:String

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:'password is too weak'})
    password:string
}