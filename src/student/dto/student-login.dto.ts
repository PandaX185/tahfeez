import { ApiProperty } from '@nestjs/swagger';

export class StudentLoginDto {
  @ApiProperty({
    description: 'The phone number of the student',
    type: String,
    required: true,
    example: '1234567890',
  })
  phone: string;

  @ApiProperty({
    description: 'The password of the student',
    type: String,
    required: true,
    example: 'Password123',
  })
  password: string;
}
