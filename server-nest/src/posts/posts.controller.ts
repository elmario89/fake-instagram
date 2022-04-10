import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.model';

@ApiTags('Posts')
@Controller('api/posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @ApiOperation({ summary: "Create Post" })
    @ApiResponse({ status: 200, type: PostModel })
    @Post()
    async create(@Body() dto: CreatePostDto) {
        try {
            const post = await this.postsService.createPost(dto);
            return post;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOperation({ summary: "Get all Posts"})
    @ApiResponse({ status: 200, type: [PostModel] })
    @Get('getPostsById/:id')
    async getAll(@Param('id') id: string) {
        try {
            const posts = await this.postsService.getPostsById(id);
            return posts;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOperation({ summary: "Get single Post"})
    @ApiResponse({ status: 200, type: PostModel })
    @Get('/:id')
    async getById(@Param('id') id: string) {

        try {
            const post = await this.postsService.getPost(id);

            if (!post) {
                throw new HttpException("User not found", HttpStatus.NOT_FOUND);
            }

            return post;
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }
}
