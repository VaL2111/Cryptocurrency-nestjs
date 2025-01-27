import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/user/models/user.model";
import * as bcrypt from "bcrypt";
import { CreateUserDTO } from "src/user/dto";
import { AppError } from "src/common/errors";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create({
      firstName: dto.firstName,
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });
    return dto;
  }
}
