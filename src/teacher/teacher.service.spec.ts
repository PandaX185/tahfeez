import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { PrismaService } from '../../prisma.service';
import { compareSync } from 'bcrypt';

describe('TeacherService', () => {
  let service: TeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherService, PrismaService],
    }).compile();

    service = module.get(TeacherService);
    const prisma = module.get(PrismaService);

    await prisma.teacher.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a teacher', async () => {
    const teacher = {
      name: 'Test Teacher',
      phone: '1234567890',
      password: '123456789',
    };

    const createdTeacher = await service.create(teacher);

    expect(createdTeacher.name).toBe(teacher.name);
    expect(createdTeacher.phone).toBe(teacher.phone);
    expect(compareSync(teacher.password, createdTeacher.password)).toBe(true);
  });

  it('should get all teachers', async () => {
    for (let i = 0; i < 5; i++) {
      await service.create({
        name: 'Test Teacher',
        phone: '123456789' + i,
        password: '123456789',
      });
    }

    const teachers = await service.findAll();

    expect(teachers).toBeInstanceOf(Array);
    expect(teachers.length).toBe(5);
  });

  it('should get a teacher by phone', async () => {
    const teacher = await service.create({
      name: 'Test Teacher',
      phone: '1234567890',
      password: '123456789',
    });

    const foundTeacher = await service.findOne(teacher.phone);

    expect(foundTeacher).toBeDefined();
    expect(foundTeacher.name).toBe(teacher.name);
    expect(foundTeacher.phone).toBe(teacher.phone);
    expect(foundTeacher.password).toBe(teacher.password);
  });

  it('should update a teacher name', async () => {
    const teacher = await service.create({
      name: 'Test Teacher',
      phone: '1234567890',
      password: '123456789',
    });

    const updatedTeacher = await service.update(teacher.phone, {
      name: 'Updated Teacher',
    });

    expect(updatedTeacher).toBeDefined();
    expect(updatedTeacher.name).toBe('Updated Teacher');
    expect(updatedTeacher.phone).toBe(teacher.phone);
    expect(updatedTeacher.password).toBe(teacher.password);
  });

  it('should update a teacher password', async () => {
    const teacher = await service.create({
      name: 'Test Teacher',
      phone: '1234567890',
      password: '123456789',
    });

    const updatedTeacher = await service.update(teacher.phone, {
      password: '987654321',
    });

    expect(updatedTeacher).toBeDefined();
    expect(updatedTeacher.name).toBe(teacher.name);
    expect(updatedTeacher.phone).toBe(teacher.phone);
    expect(compareSync('987654321', updatedTeacher.password)).toBe(true);
  });
});
