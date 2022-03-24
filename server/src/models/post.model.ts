import {Schema} from 'mongoose';

export interface iPost {
    text: string;
}

export const PostSchema = new Schema<iPost>({
    text: String
});