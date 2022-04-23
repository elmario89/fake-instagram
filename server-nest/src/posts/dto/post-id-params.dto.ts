import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from 'class-validator';

export class PostIdParamsDto {
    @IsString({ message: 'Has to be string' })
    readonly id: string;
}