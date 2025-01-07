import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Surah } from './surah.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class AddAssignmentDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty({ message: 'Student id is required' })
  @ApiProperty({
    description: 'The ID of the student',
    type: String,
    required: true,
    example: '611a416d0f7e090012111111',
  })
  studentId: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'Assignment should conatain at least one surah' })
  @ApiProperty({
    description: 'The surahs in the assignment',
    type: [Surah],
    required: true,
    example: [
      {
        name: 'Surah Al-Fatihah',
        startingAyah: 1,
        endingAyah: 7,
      },
      {
        name: 'Surah Al-Baqarah',
        startingAyah: 1,
        endingAyah: 70,
      },
    ],
  })
  surahs: Surah[];

  @IsString()
  @IsOptional()
  @IsIn(['PENDING', 'PASSED', 'REVISION', 'FAILED'], {
    message: 'Invalid status provided',
  })
  @ApiProperty({
    description: 'The status of the assignment',
    type: String,
    required: false,
    example: 'FAILED',
    default: 'PENDING',
  })
  status: Status;
}
