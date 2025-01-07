import { ApiProperty } from '@nestjs/swagger';

export class TeacherLoginDto {
  @ApiProperty({
    description: 'The phone number of the teacher',
    type: String,
    required: true,
    example: '1234567890',
  })
  phone: string;

  @ApiProperty({
    description: 'The password of the teacher',
    type: String,
    required: true,
    example: 'Password123',
  })
  password: string;
}
