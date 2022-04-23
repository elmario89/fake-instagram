import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from 'class-validator';

export class LoginUserDto {
    @IsEmail({}, { message: 'Please enter valid email adress'})
    @IsString({ message: 'Has to be string' })
    @ApiProperty({ example: 'urine89@mail.ru', description: 'User\'s email' })
    readonly email: string;

    @IsString({ message: 'Has to be string' })
    @ApiProperty({ example: '221221', description: 'User\'s password' })
    readonly password: string;
}