import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('assignment/:id/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(
    @Request() req: any,
    @Param('id') id: string,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.noteService.create(req, id, createNoteDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.noteService.findAll(req);
  }

  @Get(':noteId')
  findOne(@Request() req: any, @Param('noteId') noteId: string) {
    return this.noteService.findOne(req, noteId);
  }

  @Delete(':noteId')
  delete(@Request() req: any, @Param('noteId') noteId: string) {
    return this.noteService.delete(req, noteId);
  }
}
