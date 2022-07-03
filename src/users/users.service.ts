import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { CreateUserDto, UpdateUserDto, ListUsersDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash = this.generatePasswordHash(createUserDto.password);
    const user = new User();
    user.username = createUserDto.username;
    user.passwordHash = passwordHash;
    const _user = await this.usersRepository.save(user);
    delete _user.passwordHash;
    return _user;
  }

  async findAll(listUsersDto: ListUsersDto) {
    const where: Record<string, any> = {};
    if (listUsersDto.username) {
      where.username = listUsersDto.username;
    }
    if (listUsersDto.isActive !== undefined) {
      where.isActive = listUsersDto.isActive;
    }
    const { page, size } = listUsersDto;
    const [userList, total] = await this.usersRepository
      .createQueryBuilder()
      .where(where)
      .skip((page - 1) * size)
      .limit(size)
      .getManyAndCount();
    return { data: userList, total };
  }

  findOne(username: string): Promise<User>;
  findOne(id: number): Promise<User>;
  findOne(param: string | number) {
    if (typeof param === 'string') {
      return this.usersRepository.findOneOrFail({ where: { username: param } });
    } else {
      return this.usersRepository.findOneOrFail({ where: { id: param } });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneOrFail({ where: { id } });
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

  generatePasswordHash(password: string) {
    return createHash('md5').update(password).digest('hex');
  }
}
