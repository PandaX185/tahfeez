import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from '../../prisma.service';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TeacherService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    return await this.prismaService.teacher.create({
      data: {
        ...createTeacherDto,
        password: hashSync(createTeacherDto.password, 10),
      },
    });
  }

  async findAll() {
    return await this.prismaService.teacher.findMany();
  }

  async findOne(phone: string) {
    return await this.prismaService.teacher.findUnique({
      where: { phone },
    });
  }

  async update(phone: string, updateTeacherDto: UpdateTeacherDto) {
    if (updateTeacherDto.password) {
      updateTeacherDto.password = hashSync(updateTeacherDto.password, 10);
    }

    return await this.prismaService.teacher.update({
      where: { phone },
      data: updateTeacherDto,
    });
  }

  async login(phone: string, password: string) {
    const teacher = await this.findOne(phone);

    if (!teacher || !compareSync(password, teacher.password)) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    const payload = { phone: teacher.phone, sub: teacher.id, role: 'teacher' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
