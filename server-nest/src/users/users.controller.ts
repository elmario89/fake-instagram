import { Body, Controller, Get, HttpException, HttpStatus, Post, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from './users.model';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @ApiOperation({ summary: "Create User" })
    @ApiResponse({ status: 200, type: User })
    @Post()
    async create(@Body() userDto: CreateUserDto) {
        try {
           const user = await this.usersService.createUser(userDto);
           return user;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOperation({ summary: "Get all Users"})
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    async getAll() {
        try {
            const users = await this.usersService.getAllUsers();
            return users;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOperation({ summary: "Get single Users"})
    @ApiResponse({ status: 200, type: User })
    @Get('/:id')
    async get(@Param('id') id: string ) {
        try {
            const user = await this.usersService.getUser(id);

            if (!user) {
                throw new HttpException("User not found", HttpStatus.NOT_FOUND);
            }

            return user;
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }
}
