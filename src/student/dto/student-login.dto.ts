import { ApiProperty } from '@nestjs/swagger';

export class StudentLoginDto {
  @ApiProperty()
  phone: string;
  @ApiProperty()
  password: string;
}
