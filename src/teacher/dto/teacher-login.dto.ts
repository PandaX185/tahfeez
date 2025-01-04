import { ApiProperty } from '@nestjs/swagger';

export class TeacherLoginDto {
  @ApiProperty()
  phone: string;
  @ApiProperty()
  password: string;
}
