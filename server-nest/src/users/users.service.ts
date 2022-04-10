import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.userRepository.create(dto);
            return user;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getAllUsers() {
        try {
            const users = await this.userRepository.findAll();
            return users;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getUser(id: string) {
        try {
            const user = await this.userRepository.findOne({ where: { id }});
            return user;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

