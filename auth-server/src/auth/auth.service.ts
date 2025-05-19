// src/auth/auth.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signup(dto: CreateUserDto) {
    const exists = await this.usersService.findByEmail(dto.email);
    if (exists) throw new ConflictException('이미 가입된 이메일입니다.');
    const user = await this.usersService.create(dto);
    return { email: user.email, role: user.role };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!user || !isMatch)
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.'
      );

    const payload = { sub: user._id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
