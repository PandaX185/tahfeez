import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AddAssignmentDto } from './dto/add-assignment.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('assignment')
@UseGuards(AuthGuard)
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @UseGuards(RolesGuard)
  @Roles('teacher')
  @Post('')
  addAssignment(@Body() assignment: AddAssignmentDto, @Request() req: any) {
    return this.assignmentService.addAssignment(req, assignment);
  }

  @Get('')
  findAll(@Request() req: any) {
    return this.assignmentService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.assignmentService.findOne(req, id);
  }

  @Patch(':id')
  updateAssignment(
    @Param('id') id: string,
    @Body() assignment: AddAssignmentDto,
    @Request() req: any,
  ) {
    return this.assignmentService.updateAssignment(req, id, assignment);
  }

  @Delete(':id')
  deleteAssignment(@Param('id') id: string, @Request() req: any) {
    return this.assignmentService.deleteAssignment(req, id);
  }
}
