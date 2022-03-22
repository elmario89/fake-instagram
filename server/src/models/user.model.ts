import mongoose, { Schema } from 'mongoose';

interface iUser {
    userName: string;
    email: string;
    password: string;
    roles: {
        type: Schema;
        ref: string;
    }
}

export default mongoose.model(
    "User",
    new mongoose.Schema<iUser>({
        userName: String,
        email: String,
        password: String,
        roles: {
            type: Schema.Types.ObjectId,
            ref: "Role"
        }
    })
);
