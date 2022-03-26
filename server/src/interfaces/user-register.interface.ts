import { iPost } from "../models/post.model";

export default interface UserRegister {
    userName: string;
    email: string;
    password: string;
    posts: iPost[];
}