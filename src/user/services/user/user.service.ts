import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(userData: CreateUserDto): Promise<string> {
    const { password, ...userDataWithoutPassword } = userData;
    const hashedPassword = await bcrypt.hash(password, 20);
  
    const user = this.userRepository.create({
      ...userDataWithoutPassword,
      password: hashedPassword,
    });
  
    this.userRepository.save(user);
    return 'User created successfully';
  }

  public async updateUser(id: number, userData: UpdateUserDto): Promise<string> {
    await this.findUserById(id); // Check if the user exists
    await this.userRepository.update(id, userData);
    this.findUserById(id);
    return 'User updated successfully';
  }

  public async deleteUser(id: number): Promise<string> {
    await this.findUserById(id);
    await this.userRepository.delete(id);
    return 'User deleted successfully';
  }

  private async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({where: {id: id}});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
