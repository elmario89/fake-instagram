import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsUUID } from 'class-validator';

export class UserIdParamsDto {
    @IsString({ message: 'Has to be string' })
    readonly id: string;
}