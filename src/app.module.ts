import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TeacherModule,
    StudentModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
      secret: process.env.JWT_SECRET,
    }),
  ],
})
export class AppModule {}
