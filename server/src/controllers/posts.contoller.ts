import { Application, Response, Request } from 'express';
import { iPostRequest } from '../interfaces/post-request.interface';
import { iPostsRequest } from '../interfaces/posts-requests.interface';
import { iUserRequest } from '../interfaces/user-request.interface';

class PostsContoller {
    addPost = async (req: iUserRequest, res: Response) => {
        try {
            return res.status(200).json(req.user);
        }
        catch (err) {
            console.log(err);
        }
    }

    getPost = async (req: iPostRequest, res: Response) => {
        try {
            return res.status(200).json(req.response);
        } catch (err) {
            console.log(err);
        }
    }

    updatePost = async (req: iPostRequest, res: Response) => {
        try {
            return res.status(200).json(req.response);
        } catch (err) {
            console.log(err);
        }
    }

    getPosts = async (req: iPostsRequest, res: Response) => {
        try {
            return res.status(200).json(req.posts);
        } catch (err) {
            console.log(err);
        }
    }

    deletePost = async (req: iUserRequest, res: Response) => {
        try {
            return res.status(200).json(req.user);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new PostsContoller();
