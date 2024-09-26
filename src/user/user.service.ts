import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { Args } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(@Args('data') data: CreateUserInput) {
    const { email, firstName, lastName, password, repeatPassword, language } =
      data;
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
