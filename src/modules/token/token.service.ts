import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(user) {
    // eslint-disable-next-line
    const payload = { user };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get("secret_jwt"),
      expiresIn: this.configService.get("expire_jwt"),
    });
  }
}
