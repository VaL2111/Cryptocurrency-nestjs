/* eslint-disable */

import { Injectable } from "@nestjs/common";
import { users } from "src/moks";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/user/models/user.model";
import * as bcrypt from "bcrypt";
import { CreateUserDTO } from "src/user/dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async createUser(dto): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create(dto);
    return dto;
  }
}
