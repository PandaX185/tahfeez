import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherLoginDto } from './dto/teacher-login.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':phone')
  findOne(@Param('phone') phone: string) {
    return this.teacherService.findOne(phone);
  }

  @UseGuards(AuthGuard)
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
