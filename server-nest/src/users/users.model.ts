import { Model, Table, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";
import { Sequelize } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { Post } from "../posts/posts.model";

interface UserCreationAttrs {
    email: string;
    password: string;
    userName: string;
}

@Table({ tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: 'b70f4034-5328-4c02-b652-d4a4414f3a29', description: 'Unique id' })
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, unique: true, primaryKey: true })
    id: string;

    @ApiProperty({ example: 'urine89@mail.ru', description: 'Unique email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: '221221', description: 'Hashed password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'elmario89', description: 'Unique user name' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    userName: string;

    @ApiProperty({ example: "[{title: 'Post title', description: 'Post description'}]", description: 'Array of posts' })
    @HasMany(() => Post)
    posts: Post[];
}