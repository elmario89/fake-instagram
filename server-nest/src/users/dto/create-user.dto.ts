import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'urine89@mail.ru', description: 'Unique email' })
    readonly email: string;

    @ApiProperty({ example: 'elmario89', description: 'Unique user name' })
    readonly userName: string;

    @ApiProperty({ example: '221221', description: 'Password' })
    readonly password: string;
}