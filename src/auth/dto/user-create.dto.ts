import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class UserCreateDto {
    @ApiProperty()
    @IsString()
    public readonly name: string;
    
    @ApiProperty()
    @IsEmail()
    public readonly email: string;
    
    @ApiProperty()
    @IsString()
    @MinLength(6)
    public readonly password: string;
}