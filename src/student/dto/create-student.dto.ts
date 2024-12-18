import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  birthDate: Date;
  @ApiProperty()
  level: number;
  @ApiProperty()
  password: string;
  @ApiProperty()
  teacherId: string;
}
