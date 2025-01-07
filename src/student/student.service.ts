import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
      select: {
        id: true,
        phone: true,
        name: true,
        level: true,
        assignments: true,
        birthDate: true,
        createdAt: true,
      },
    });
  }

  async findAll(teacherId: string) {
    return await this.prismaService.student.findMany({
      where: { teacherId },
      select: {
        id: true,
        phone: true,
        name: true,
        level: true,
        assignments: true,
        birthDate: true,
        createdAt: true,
      },
    });
  }

  async findOne(teacherId: string, phone: string) {
    const result = await this.prismaService.student.findUnique({
      where: { teacherId_phone: { teacherId, phone } },
      select: {
        id: true,
        phone: true,
        name: true,
        level: true,
        assignments: true,
        birthDate: true,
        createdAt: true,
      },
    });
    if (!result) {
      throw new NotFoundException('Student not found');
    }

    return result;
  }

  async update(
    teacherId: string,
    phone: string,
    updateStudentDto: UpdateStudentDto,
  ) {
    if (updateStudentDto.password) {
      updateStudentDto.password = hashSync(updateStudentDto.password, 10);
    }
    const result = await this.findOne(teacherId, phone);
    if (!result) {
      throw new NotFoundException('Student not found');
    }

    return await this.prismaService.student.update({
      where: { teacherId_phone: { teacherId, phone } },
      data: updateStudentDto,
      select: {
        id: true,
        phone: true,
        name: true,
        level: true,
        assignments: true,
        birthDate: true,
        createdAt: true,
      },
    });
  }

  async login(teacherId: string, loginDto: StudentLoginDto) {
    const student = await this.prismaService.student.findUnique({
      where: { teacherId_phone: { teacherId, phone: loginDto.phone } },
    });

    if (!student || !compareSync(loginDto.password, student.password)) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    const payload = {
      sub: student.id,
      phone: student.phone,
      role: 'student',
      teacher: student.teacherId,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
