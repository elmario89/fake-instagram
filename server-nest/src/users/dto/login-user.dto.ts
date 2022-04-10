import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({ example: 'urine89@mail.ru', description: 'User\'s email' })
    readonly email: string;

    @ApiProperty({ example: '221221', description: 'User\'s password' })
    readonly password: string;
}