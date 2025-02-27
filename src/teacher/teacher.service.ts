import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from '../../prisma.service';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { stringify } from 'querystring';

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
      select: {
        id: true,
        phone: true,
        name: true,
        password: false,
        createdAt: true,
      },
    });
  }

  async findAll(studentPhone: string) {
    return await this.prismaService.teacher.findMany({
      select: {
        id: true,
        phone: true,
        name: true,
        password: false,
        createdAt: true,
      },
      where: {
        students: {
          some: {
            phone: studentPhone,
          },
        },
      },
    });
  }

  async findOne(phone: string) {
    const result = await this.prismaService.teacher.findUnique({
      where: { phone },
      select: {
        id: true,
        phone: true,
        name: true,
        password: false,
        createdAt: true,
      },
    });
    if (!result) {
      throw new NotFoundException('Teacher not found');
    }

    return result;
  }

  async update(req: any, phone: string, updateTeacherDto: UpdateTeacherDto) {
    if (updateTeacherDto.password) {
      updateTeacherDto.password = hashSync(updateTeacherDto.password, 10);
    }

    const user = await this.getLoggedInTeacher(req);

    if (user.phone !== phone) {
      throw new UnauthorizedException(
        'You are not authorized to update this teacher',
      );
    }

    const result = await this.findOne(phone);

    if (!result) {
      throw new NotFoundException('Teacher not found');
    }

    return await this.prismaService.teacher.update({
      where: { phone },
      data: updateTeacherDto,
      select: {
        id: true,
        phone: true,
        name: true,
        password: false,
        createdAt: true,
      },
    });
  }

  async login(phone: string, password: string) {
    const teacher = await this.prismaService.teacher.findUnique({
      where: { phone },
    });

    if (!teacher || !compareSync(password, teacher.password)) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    const payload = { phone: teacher.phone, sub: teacher.id, role: 'teacher' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getLoggedInTeacher(req: any) {
    return await this.prismaService.teacher.findUnique({
      where: { phone: req.user.phone },
      select: {
        id: true,
        phone: true,
        name: true,
        createdAt: true,
      },
    });
  }
}
