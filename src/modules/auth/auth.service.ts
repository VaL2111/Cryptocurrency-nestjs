import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDTO } from "../user/dto";
import { AppError } from "src/common/constants/errors";
import * as bcrypt from "bcrypt";
import { UserLoginDTO } from "./dto";
import { TokenService } from "../token/token.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (existUser) throw new BadRequestException(AppError.USER_EXIST);
      return this.userService.createUser(dto);
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error);
    }
  }

  async loginUser(dto: UserLoginDTO): Promise<any> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
      const validatePassword = await bcrypt.compare(
        dto.password,
        existUser.password,
      );
      if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);

      const user = await this.userService.publicUser(dto.email);
      if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);
      const token = await this.tokenService.generateToken(user);
      return { user, token };
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error);
    }
  }
}
