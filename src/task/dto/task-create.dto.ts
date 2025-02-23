import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskCreateDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public readonly title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public readonly content: string;
}