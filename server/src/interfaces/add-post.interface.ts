import { iPost } from "../models/post.model";

export default interface iAddPost {
    userId: string;
    post: iPost;
}