import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.model';
import { IsString } from 'class-validator';
import { PostIdParamsDto } from './dto/post-id-params.dto';

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
    async getAll(@Param() params: PostIdParamsDto) {
        try {
            const posts = await this.postsService.getPostsById(params.id);
            return posts;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOperation({ summary: "Get single Post"})
    @ApiResponse({ status: 200, type: PostModel })
    @Get('/:id')
    async getById(@Param() params: PostIdParamsDto) {
        try {
            const post = await this.postsService.getPost(params.id);

            if (!post) {
                throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
            }

            return post;
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    @ApiOperation({ summary: "Delete single Post"})
    @ApiResponse({ status: 200, type: String })
    @Delete('/:id')
    async deletePost(@Param() params: PostIdParamsDto) {
        try {
            const post = await this.postsService.deletePost(params.id);

            if (!post) {
                throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
            }

            return params.id;
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }
}
