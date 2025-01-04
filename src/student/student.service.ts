import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'prisma.service';
import { compareSync, hashSync } from 'bcrypt';
import { StudentLoginDto } from './dto/student-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class StudentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    return await this.prismaService.student.create({
      data: {
        ...createStudentDto,
        password: hashSync(createStudentDto.password, 10),
      },
    });
  }

  async findAll(teacherId: string) {
    return await this.prismaService.student.findMany({ where: { teacherId } });
  }

  async findOne(teacherId: string, phone: string) {
    return await this.prismaService.student.findUnique({
      where: { teacherId_phone: { teacherId, phone } },
    });
  }

  async update(
    teacherId: string,
    phone: string,
    updateStudentDto: UpdateStudentDto,
  ) {
    return await this.prismaService.student.update({
      where: { teacherId_phone: { teacherId, phone } },
      data: updateStudentDto,
    });
  }

  async login(teacherId: string, loginDto: StudentLoginDto) {
    const student = await this.prismaService.student.findUnique({
      where: { teacherId_phone: { teacherId, phone: loginDto.phone } },
    });

    if (!student || !compareSync(loginDto.password, student.password)) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    const payload = { sub: student.id, phone: student.phone, role: 'student' };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
