import { iPost } from "../models/post.model";
import { Request } from 'express';

export interface iPostsRequest extends Request {
    posts?: iPost[];
}