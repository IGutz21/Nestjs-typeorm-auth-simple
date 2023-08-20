import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findOneWithUsername(username: string) {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async findOneWithEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findOneWithEmailOrUsername(identifier: string) {
    return await this.userRepository.findOne({
      where: [{ email: identifier }, { username: identifier }],
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }
}
