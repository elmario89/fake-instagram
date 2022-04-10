import {HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    async registration(dto: CreateUserDto) {
        try {
            const { email, userName } = dto;
            const candidate = await this.usersService.getUserByIdOrEmail(email, userName);

            if (candidate) {
                throw new HttpException("Username or email is already in use, please login", HttpStatus.BAD_REQUEST);
            }

            const hashPassword = await bcrypt.hash(dto.password, 5);
            const user = await this.usersService.createUser({...dto, password: hashPassword });

            return await this.generateToken(user);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async login(dto: LoginUserDto) {
        try {
            const candidate = await this.validateUser(dto);
            return this.generateToken(candidate);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, userName: user.userName };

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(dto: LoginUserDto) {
        const { email, password } = dto;

        const user = await this.usersService.getUserByIdOrEmail(email);
        const passwordEquals = await bcrypt.compare(dto.password, user.password);

        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({ message: 'Wrong email or password' });
    }
}
