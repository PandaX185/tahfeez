import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class StudentLoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Phone is required.' })
  @ApiProperty({
    description: 'The phone number of the student',
    type: String,
    required: true,
    example: '1234567890',
  })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    { message: 'Password must be strong.' },
  )
  @ApiProperty({
    description: 'The password of the student',
    type: String,
    required: true,
    example: 'Password123',
  })
  password: string;
}
