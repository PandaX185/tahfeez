import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { AddAssignmentDto } from './dto/add-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async addAssignment(req: any, assignment: AddAssignmentDto) {
    const teacher = await this.prismaService.teacher.findUnique({
      where: { phone: req.user.phone },
      select: { id: true },
    });

    if (!teacher) {
      throw new UnauthorizedException('Teacher is not logged in');
    }

    return await this.prismaService.assignment.create({
      data: {
        ...assignment,
        teacherId: teacher.id,
      },
    });
  }

  async getCurrentUser(req: any) {
    return (
      (await this.prismaService.teacher.findUnique({
        where: { phone: req.user.phone },
      })) ||
      (await this.prismaService.student.findUnique({
        where: {
          teacherId_phone: {
            teacherId: req.user.teacher,
            phone: req.user.phone,
          },
        },
      }))
    );
  }

  async findAll(req: any) {
    const user = await this.getCurrentUser(req);

    if (!user) {
      throw new UnauthorizedException('User is not logged in');
    }

    return await this.prismaService.assignment.findMany({
      where: {
        OR: [{ teacherId: user.id }, { studentId: user.id }],
      },
    });
  }

  async findOne(req: any, id: string) {
    const user = await this.getCurrentUser(req);

    if (!user) {
      throw new UnauthorizedException('User is not logged in');
    }

    try {
      const result = await this.prismaService.assignment.findFirst({
        where: {
          id,
          OR: [{ teacherId: user.id }, { studentId: user.id }],
        },
      });
      return result;
    } catch {
      throw new NotFoundException('Assignment not found');
    }
  }

  async updateAssignment(req: any, id: string, assignment: AddAssignmentDto) {
    const user = await this.getCurrentUser(req);

    if (!user) {
      throw new UnauthorizedException('User is not logged in');
    }

    try {
      const result = await this.prismaService.assignment.update({
        where: { id },
        data: {
          ...assignment,
          teacherId: user.id,
        },
      });
      return result;
    } catch {
      throw new NotFoundException('Assignment not found');
    }
  }

  async deleteAssignment(req: any, id: string) {
    const teacher = await this.prismaService.teacher.findUnique({
      where: { phone: req.user.phone },
    });

    if (!teacher) {
      throw new UnauthorizedException(
        'You are not authorized to delete this assignment',
      );
    }

    try {
      const result = await this.prismaService.assignment.delete({
        where: { id, teacherId: teacher.id },
      });
      return result;
    } catch {
      throw new NotFoundException('Assignment not found');
    }
  }
}
