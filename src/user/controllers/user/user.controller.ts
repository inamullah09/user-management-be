import { Controller, Get, Post, Patch, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { FindUserDto } from 'src/user/dtos/find-user.dto';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<string> {
    return this.userService.createUser(userData);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() userData: UpdateUserDto): Promise<string> {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<string> {
    return this.userService.deleteUser(id);
  }
}
