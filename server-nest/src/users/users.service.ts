import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
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
            const users = await this.userRepository.findAll({
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt'],
                }
            });
            return users;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getUser(id: string) {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt'],
                }
            });

            if (!user) {
                throw new HttpException("User not found", HttpStatus.NOT_FOUND);
            }

            return user;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getUserByIdOrEmail(email: string, userName?: string) {
        let user;

        if (!userName) {
            user = await this.userRepository.findOne({ where: { email }});
            return user;
        }

        user = await this.userRepository.findOne({ where: { [Op.or]: [{ email }, { userName }] }});
        return user;
    }
}

