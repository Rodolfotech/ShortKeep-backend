import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.prisma.usuarios.create({
      data: {
        id_usuario: randomUUID(),
        email: dto.email,
        password: hashed,
        nombre: dto.nombre,
        id_cargo: dto.id_cargo ?? null,
      },
    });
  }

  findAll() {
    return this.prisma.usuarios.findMany({ include: { cargo: true } });
  }

  async findOne(id: string) {
    const user = await this.prisma.usuarios.findUnique({
      where: { id_usuario: id },
      include: { cargo: true, canales: true, shorts: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.password) data.password = await bcrypt.hash(dto.password, 10);
    return this.prisma.usuarios.update({
      where: { id_usuario: id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.usuarios.delete({ where: { id_usuario: id } });
  }
}
