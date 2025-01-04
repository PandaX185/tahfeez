import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherLoginDto } from './dto/teacher-login.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':phone')
  findOne(@Param('phone') phone: string) {
    return this.teacherService.findOne(phone);
  }

  @Patch(':phone')
  update(
    @Param('phone') phone: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teacherService.update(phone, updateTeacherDto);
  }

  @Post('/login')
  login(@Body() loginDto: TeacherLoginDto) {
    return this.teacherService.login(loginDto.phone, loginDto.password);
  }
}
