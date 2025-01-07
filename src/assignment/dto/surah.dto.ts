import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class Surah {
  @IsString()
  @IsNotEmpty({ message: 'Surah name is required' })
  @ApiProperty({
    description: 'The name of the surah',
    type: String,
    required: true,
    example: 'Surah Al-Fatihah',
  })
  name: string;

  @IsNotEmpty({ message: 'Starting ayah is required' })
  @IsInt({ message: 'Starting ayah must be a number' })
  @Min(1)
  @Max(286)
  @ApiProperty({ description: 'The starting ayah of the surah', type: Number })
  startingAyah: number;

  @IsNotEmpty({ message: 'Ending ayah is required' })
  @IsInt({ message: 'Ending ayah must be a number' })
  @Min(1)
  @Max(286)
  @ApiProperty({ description: 'The ending ayah of the surah', type: Number })
  endingAyah: number;
}
