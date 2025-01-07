import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { JwtModule } from '@nestjs/jwt';
import { AssignmentModule } from './assignment/assignment.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    TeacherModule,
    StudentModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
      secret: process.env.JWT_SECRET,
    }),
    AssignmentModule,
    NoteModule,
  ],
})
export class AppModule {}
