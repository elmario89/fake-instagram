import {Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { Public } from '../decorators/public.decorator';

@ApiTags('Authorization')
@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: "User login" })
    @ApiResponse({ status: 200, type: String })
    @Public()
    @Post('/login')
    async login(@Body() dto: LoginUserDto) {
        try {
            const user = await this.authService.login(dto);
            return user;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOperation({ summary: "User registration" })
    @ApiResponse({ status: 200, type: String })
    @Public()
    @Post('/registration')
    async registration(@Body() dto: CreateUserDto) {
        try {
            const user = await this.authService.registration(dto);
            return user;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
}
