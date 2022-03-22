import mongoose from 'mongoose';

interface iRole {
    name: string;
    id: string;
}

export default mongoose.model(
    "Role",
    new mongoose.Schema<iRole>({
        name: String,
        id: String,
    })
);
