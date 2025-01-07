import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required.' })
  @Length(5, 20, { message: 'Name must be between 5 and 20 characters long.' })
  @ApiProperty({
    description: 'The name of the student',
    type: String,
    required: true,
    example: 'John Doe',
    minLength: 5,
    maxLength: 20,
  })
  name: string;

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
  @IsDateString()
  @IsNotEmpty({ message: 'Birth date is required.' })
  @ApiProperty({
    description: 'The birth date of the student',
    type: Date,
    required: true,
    example: '2004-01-18',
  })
  birthDate: string;

  @IsInt()
  @IsNotEmpty({ message: 'Level is required.' })
  @Min(1)
  @Max(12)
  @ApiProperty({
    description: 'The level of the student',
    type: Number,
    required: true,
    example: 7,
    minimum: 1,
    maximum: 12,
  })
  level: number;

  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
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

  @IsString()
  @IsNotEmpty({ message: 'Teacher ID is required.' })
  @IsMongoId({ message: 'Invalid Teacher ID' })
  @ApiProperty({
    description: 'The teacher ID of the student',
    type: String,
    required: true,
    example: '60f3f0f7f5f4f7b1f2a3f7b1',
  })
  teacherId: string;
}
