import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUsersDto } from './dto/list-users.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const passwordHash = this.generatePasswordHash(createUserDto.password);
    const user = new User();
    user.username = createUserDto.username;
    user.passwordHash = passwordHash;
    return this.usersRepository.insert(user);
  }

  findAll(listUsersDto: ListUsersDto) {
    const where: Record<string, any> = {};
    if (listUsersDto.username) {
      where.username = listUsersDto.username;
    }
    if (listUsersDto.isActive) {
      where.isActive = listUsersDto.isActive;
    }
    const { page, size } = listUsersDto;
    return this.usersRepository
      .createQueryBuilder()
      .where(where)
      .skip((page - 1) * size)
      .limit(size)
      .getManyAndCount();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    user.isActive = updateUserDto.isActive;
    if (updateUserDto.password) {
      const passwordHash = this.generatePasswordHash(updateUserDto.password);
      user.passwordHash = passwordHash;
    }
    return this.usersRepository.save(user);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  private generatePasswordHash(password: string) {
    return createHash('md5').update(password).digest('hex');
  }
}
