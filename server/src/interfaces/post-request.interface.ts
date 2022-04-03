import { iPost } from "../models/post.model";
import { Request } from 'express';
import { iUser } from "../models/user.model";

export interface iPostRequest extends Request {
    response?: {
        post: iPost;
        userName: string;
    };
}