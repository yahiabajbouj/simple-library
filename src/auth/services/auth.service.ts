import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../dto/LoginDto';
import { CreateUserDto } from '../dto/CreateUserDto';
import { Repository } from 'typeorm';
import { User } from '../modules/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

@Injectable()
export class AuthService {
  private users = []; // This should be replaced with your actual user database

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.users.find(user => user.username === username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDto) {
    const userLogin = await this.findUserByUsername(user.username);    
    if (! await bcrypt.compare(user.password, userLogin.password))
      throw new UnauthorizedException();

    return {
      access_token: this.jwtService.sign({...userLogin}),
    };
  }

  async register(user: CreateUserDto): Promise<any> {
    user.password = await bcrypt.hash(user.password, 10);
    return await this.usersRepository.save(user);
  }

  // Mock function, replace with your user fetching logic
  async findUserByUsername(username: string): Promise<any> {
    return await this.usersRepository.findOne({
      where: {
        username
      }
    });
  }
}
