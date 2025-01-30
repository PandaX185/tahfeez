import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ConflictException,
  Request,
  Query,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherLoginDto } from './dto/teacher-login.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiQuery } from '@nestjs/swagger';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    try {
      const result = this.teacherService.create(createTeacherDto);
      return result;
    } catch {
      throw new ConflictException(
        'Teacher with this phone number already exists',
      );
    }
  }

  @Get()
  @ApiQuery({
    name: 'studentPhone',
    required: false,
    type: String,
    description: 'Filter teachers by student phone number'
  })
  findAll(@Query('studentPhone') studentPhone?: string) {
    return this.teacherService.findAll(studentPhone);
  }

  @UseGuards(AuthGuard)
  @Roles('teacher')
  @Get('current')
  getLoggedInTeacher(@Request() req: any) {
    return this.teacherService.getLoggedInTeacher(req);
  }

  @Get(':phone')
  findOne(@Param('phone') phone: string) {
    return this.teacherService.findOne(phone);
  }

  @UseGuards(AuthGuard)
  @Roles('teacher', 'manager')
  @Patch(':phone')
  update(
    @Param('phone') phone: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
    @Request() req: any,
  ) {
    return this.teacherService.update(req, phone, updateTeacherDto);
  }

  @Post('/login')
  login(@Body() loginDto: TeacherLoginDto) {
    return this.teacherService.login(loginDto.phone, loginDto.password);
  }
}
