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

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get('?teacherId')
  findAll(@Query('teacherId') teacherId: string) {
    return this.studentService.findAll(teacherId);
  }

  @Get(':phone/?teacherId')
  findOne(
    @Query('teacherId') teacherId: string,
    @Param('phone') phone: string,
  ) {
    return this.studentService.findOne(teacherId, phone);
  }

  @Patch(':phone/?teacherId')
  update(
    @Query('teacherId') teacherId: string,
    @Param('phone') phone: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(teacherId, phone, updateStudentDto);
  }
}
