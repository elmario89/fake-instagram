import { Model, Table, Column, DataType, ForeignKey, HasOne, BelongsTo } from "sequelize-typescript";
import { Sequelize } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";

interface PostCreationAttrs {
    title: string;
    description: string;
}

@Table({ tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
    @ApiProperty({ example: 'b70f4034-5328-4c02-b652-d4a4414f3a29', description: 'Unique id' })
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true, primaryKey: true })
    id: string;

    @ApiProperty({ example: 'Some post title', description: 'Title of the post' })
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({ example: 'Some post description', description: 'Description of post' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    userId: string;
}