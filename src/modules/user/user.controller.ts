import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "src/modules/user/dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create-user")
  createUsers(@Body() dto: CreateUserDTO) {
    return this.userService.createUser(dto);
  }
}
