import { Module } from '@nestjs/common';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AppModule {}
