import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentLoginDto } from './dto/student-login.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    try {
      const result = await this.studentService.create(createStudentDto);
      return result;
    } catch {
      throw new ConflictException(
        'Student with this phone number already exists',
      );
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('teacher', 'manager')
  @Get('')
  findAll(@Query('teacherId') teacherId: string) {
    return this.studentService.findAll(teacherId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('teacher', 'manager')
  @Get(':phone')
  findOne(
    @Query('teacherId') teacherId: string,
    @Param('phone') phone: string,
  ) {
    return this.studentService.findOne(teacherId, phone);
  }
  @UseGuards(AuthGuard)
  @Roles('student', 'manager')
  @Patch(':phone')
  update(
    @Query('teacherId') teacherId: string,
    @Param('phone') phone: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(teacherId, phone, updateStudentDto);
  }

  @Post('/login')
  login(
    @Query('teacherId') teacherId: string,
    @Body() loginDto: StudentLoginDto,
  ) {
    return this.studentService.login(teacherId, loginDto);
  }
}
