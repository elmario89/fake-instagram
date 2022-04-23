import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsUUID } from 'class-validator';

export class CreatePostDto {
    @IsString({ message: 'Has to be string' })
    @ApiProperty({ example: 'Post title', description: 'Post title' })
    readonly title: string;

    @IsString({ message: 'Has to be string' })
    @ApiProperty({ example: 'Post description', description: 'Post description' })
    readonly description: string;

    @IsString({ message: 'Has to be string' })
    @ApiProperty({ example: 'b70f4034-5328-4c02-b652-d4a4414f3a29', description: 'User id'})
    readonly userId: string;
}