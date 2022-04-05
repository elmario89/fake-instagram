const PostService = require('../services/post.service');

import { Application, Response, Request } from 'express';
import { iPostRequest } from '../interfaces/post-request.interface';
import { iPostsRequest } from '../interfaces/posts-requests.interface';
import { iUserRequest } from '../interfaces/user-request.interface';

class PostsContoller {
    constructor(private readonly app: Application) { }

    addPost = async (req: iPostRequest, res: Response) => {
        try {
            const newPost = await PostService.add(req.body, req.file);
            return res.status(200).json(newPost);
        }
        catch (err) {
            console.log(err);
        }
    }

    getPost = async (req: iPostRequest, res: Response) => {
        try {
            const post = await PostService.get(req.params);
            return res.status(200).json(post);
        } catch (err) {
            console.log(err);
        }
    }

    updatePost = async (req: iPostRequest, res: Response) => {
        try {
            const updatedPost = await PostService.update(req.params, req.body);
            return res.status(200).json(updatedPost);
        } catch (err) {
            console.log(err);
        }
    }

    getPosts = async (req: iPostsRequest, res: Response) => {
        try {
            const posts = await PostService.getAll(req.params, req.query);
            return res.status(200).json(posts);
        } catch (err) {
            console.log(err);
        }
    }

    deletePost = async (req: iUserRequest, res: Response) => {
        try {
            const user = await PostService.delete(req.params, this.app);
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = PostsContoller;
