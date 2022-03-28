import { iPost } from "../models/post.model";
import { Request } from 'express';

export interface iPostRequest extends Request {
    post?: iPost;
}