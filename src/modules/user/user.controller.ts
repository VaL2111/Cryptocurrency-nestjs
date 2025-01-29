import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDTO } from "./dto";
import { JwtAuthGuard } from "src/guards/jwt-guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags("API")
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(
    @Body() updateDto: UpdateUserDTO,
    @Req() request: { user: { email: string } },
  ): Promise<UpdateUserDTO> {
    const user = request.user;
    return this.userService.updateUser(user.email, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request: { user: { email: string } }): Promise<boolean> {
    const user = request.user;
    return this.userService.deleteUser(user.email);
  }
}
