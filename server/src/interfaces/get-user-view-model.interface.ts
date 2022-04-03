import { iPost } from "../models/post.model";

export default interface iUserViewModel {
    userName: string;
    _id: string;
    creationDate: Date;
    token: string;
}