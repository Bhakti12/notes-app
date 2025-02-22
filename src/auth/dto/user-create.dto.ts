import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class UserCreateDto {
    @IsString()
    public readonly name: string;
    
    @IsEmail()
    public readonly email: string;
    
    @IsString()
    @MinLength(6)
    public readonly password: string;
}