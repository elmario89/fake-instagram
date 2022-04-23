import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'urine89@mail.ru', description: 'Unique email' })
    @IsEmail({}, { message: 'Has to be email'})
    @IsString({ message: 'Has to be string' })
    readonly email: string;

    @IsString({ message: 'Has to be string' })
    @ApiProperty({ example: 'elmario89', description: 'Unique user name' })
    readonly userName: string;

    @IsString({ message: 'Has to be string' })
    @Length(4, 30, { message: 'Minimum password length is 4, maximum - 30' })
    @ApiProperty({ example: '221221', description: 'Password' })
    readonly password: string;
}