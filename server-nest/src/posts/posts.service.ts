import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postRepository: typeof Post) { }

    async createPost(dto: CreatePostDto) {
        try {
            const post = await this.postRepository.create(dto);
            return post;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getPostsById(id: string) {
        try {
            const posts = await this.postRepository.findAll({
                where: {
                    userId: id as string
                },
                attributes: {
                    exclude: ['userId', 'createdAt', 'updatedAt'],
                }
            });
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getPost(id: string) {
        try {
            const post = await this.postRepository.findOne({ where: { id }});
            return post;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deletePost(id: string) {
        try {
            const post = await this.postRepository.destroy({ where: { id }});
            return post;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
