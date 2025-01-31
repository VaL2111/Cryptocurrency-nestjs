import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/modules/user/models/user.model";
import * as bcrypt from "bcrypt";
import { CreateUserDTO, UpdateUserDTO } from "src/modules/user/dto";
import { AuthUserResponse } from "../auth/response";
import { Watchlist } from "../watchlist/models/watchlist.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error);
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return this.userRepository.findOne({
        where: { email: email },
        include: {
          model: Watchlist,
          required: false,
        },
      });
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error);
    }
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      dto.password = await this.hashPassword(dto.password);
      await this.userRepository.create({
        firstName: dto.firstName,
        username: dto.username,
        email: dto.email,
        password: dto.password,
      });
      return dto;
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error);
    }
  }

  async publicUser(email: string): Promise<AuthUserResponse | User | null> {
    try {
      return await this.userRepository.findOne({
        where: { email: email },
        attributes: { exclude: ["password"] },
        include: {
          model: Watchlist,
          required: false,
        },
      });
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error);
    }
  }

  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    try {
      await this.userRepository.update(dto, { where: { email } });
      return dto;
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error);
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { email } });
      return true;
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error);
    }
  }
}
