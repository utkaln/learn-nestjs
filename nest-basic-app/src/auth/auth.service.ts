import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-cred.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(authCredsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredsDto;
    // hash password before storing
    // create a salt from bcrypt first
    const salt = await bcrypt.genSalt();
    // hash the password entered using salt
    const hashedPwd = await bcrypt.hash(password, salt);
    // store the hashed password to db
    const user = this.userRepository.create({ username, password: hashedPwd });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log({ error });
      // if duplicate username
      if (error.code === '23505') {
        throw new ConflictException('Username already exists !');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCredsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredsDto;
    const userReturned = await this.userRepository.findOneBy({ username });
    if (
      userReturned &&
      (await bcrypt.compare(password, userReturned.password))
    ) {
      const payload: JwtPayloadInterface = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid Credentials !');
    }
  }
}
