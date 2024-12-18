import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'prisma.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
