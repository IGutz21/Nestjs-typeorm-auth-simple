import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, password: string) {
    const user = await this.userService.findOneWithEmailOrUsername(identifier);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: {
        username: user.username,
      },
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      // refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }), // Give another token with longer expiration time
    };
  }

  async refreshToken(user: User) {
    const payload = {
      email: user.email,
      sub: {
        username: user.username,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
