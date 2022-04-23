import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsUUID } from 'class-validator';

export class PostIdParamsDto {
    @IsString({ message: 'Has to be string' })
    readonly id: string;
}