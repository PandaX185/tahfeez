import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [TeacherModule],
})
export class AppModule {}
