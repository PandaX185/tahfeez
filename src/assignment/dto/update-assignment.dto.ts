import { PartialType } from '@nestjs/swagger';
import { AddAssignmentDto } from './add-assignment.dto';

export class UpdateAssignmentDto extends PartialType(AddAssignmentDto) {}
