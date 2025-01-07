import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class NoteService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(req: any, id: string, createNoteDto: CreateNoteDto) {
    if (
      !(await this.prismaService.assignment.findUnique({
        where: { id, teacherId: req.user.id },
      }))
    ) {
      throw new BadRequestException('No such assignment');
    }

    if (
      await this.prismaService.note.findUnique({
        where: { assignmentId: id },
      })
    ) {
      return await this.prismaService.note.update({
        where: { assignmentId: id },
        data: createNoteDto,
      });
    }

    return await this.prismaService.note.create({
      data: { ...createNoteDto, assignmentId: id },
    });
  }

  async findAll(req: any) {
    return await this.prismaService.note.findMany({
      where: { assignment: { teacherId: req.user.id } },
    });
  }

  async findOne(req: any, id: string) {
    const note = await this.prismaService.note.findUnique({
      where: { id, assignment: { teacherId: req.user.id } },
    });
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async delete(req: any, id: string) {
    return await this.prismaService.note.delete({
      where: { id, assignment: { teacherId: req.user.id } },
    });
  }
}
