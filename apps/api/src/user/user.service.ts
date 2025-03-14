import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, verify } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;
    const hashedPassword = hash(password);
    return await this.prismaService.users.create({
      data: { ...user, password: await hashedPassword },
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.users.findUnique({ where: { email } });
  }

  async findOne(userId: string) {
    return await this.prismaService.users.findUnique({ where: { id: userId } });
  }

  async comparePassword(hashedPassword: string, plainPassword: string) {
    return await verify(hashedPassword, plainPassword);
  }
}
