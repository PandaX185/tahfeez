import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentLoginDto } from './dto/student-login.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get('')
  findAll(@Query('teacherId') teacherId: string) {
    return this.studentService.findAll(teacherId);
  }

  @Get(':phone')
  findOne(
    @Query('teacherId') teacherId: string,
    @Param('phone') phone: string,
  ) {
    return this.studentService.findOne(teacherId, phone);
  }

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
