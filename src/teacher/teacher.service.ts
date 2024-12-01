import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'prisma.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    createTeacherDto.password = hashSync(createTeacherDto.password, 10);
    return await this.prismaService.teacher.create({
      data: createTeacherDto,
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
}
