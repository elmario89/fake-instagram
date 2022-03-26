import { iPost } from "../models/post.model";

export default interface iAddUser {
    userName: string;
    email: string;
    password: string;
    posts: iPost[];
}