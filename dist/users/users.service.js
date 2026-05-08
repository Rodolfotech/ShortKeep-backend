"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const hashed = await bcrypt.hash(dto.password, 10);
        return this.prisma.usuarios.create({
            data: {
                id_usuario: (0, node_crypto_1.randomUUID)(),
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
    async findOne(id) {
        const user = await this.prisma.usuarios.findUnique({
            where: { id_usuario: id },
            include: { cargo: true, canales: true, shorts: true },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async update(id, dto) {
        await this.findOne(id);
        const data = { ...dto };
        if (dto.password)
            data.password = await bcrypt.hash(dto.password, 10);
        return this.prisma.usuarios.update({
            where: { id_usuario: id },
            data,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.usuarios.delete({ where: { id_usuario: id } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map