import { PrismaClient, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  private get employee() {
    return (this.databaseService as any).employee;
  }

  create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employee.create({ data: createEmployeeDto });
  }

  findAll(role?: 'ADMIN' | 'USER') {
    return this.employee.findMany({
      where: {
        role,
      },
    });
  }

  findOne(id: number) {
    return this.employee.findUnique({
      where: { id },
    });
  }

  update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  remove(id: number) {
    return this.employee.delete({
      where: { id },
    });
  }
}
