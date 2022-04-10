import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({ example: 'Post title', description: 'Post title' })
    readonly title: string;

    @ApiProperty({ example: 'Post description', description: 'Post description' })
    readonly description: string;

    @ApiProperty({ example: 'b70f4034-5328-4c02-b652-d4a4414f3a29', description: 'User id'})
    readonly userId: string;
}