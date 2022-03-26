import {Schema} from 'mongoose';

export interface iPost {
    text: string;
}

module.exports = new Schema<iPost>({
    text: String
});