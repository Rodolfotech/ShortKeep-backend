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
exports.ShortsService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const prisma_service_1 = require("../prisma/prisma.service");
const youtube_service_1 = require("../youtube/youtube.service");
let ShortsService = class ShortsService {
    prisma;
    youtube;
    constructor(prisma, youtube) {
        this.prisma = prisma;
        this.youtube = youtube;
    }
    async create(dto, userId) {
        const info = await this.youtube.getVideoInfo(dto.url);
        const existing = await this.prisma.shorts.findFirst({
            where: { youtube_video_id: info.videoId, id_usuario: userId },
        });
        if (existing)
            return existing;
        return this.prisma.shorts.create({
            data: {
                id_short: (0, node_crypto_1.randomUUID)(),
                youtube_video_id: info.videoId,
                titulo: info.title,
                url_miniatura: info.thumbnail,
                descripcion: info.description,
                categoria: dto.categoria || 'General',
                tags: dto.tags || [],
                fecha_publicacion_yt: new Date(info.publishedAt),
                id_usuario: userId,
            },
        });
    }
    async findAll(userId, query) {
        const conditions = [];
        const params = [];
        conditions.push(`id_usuario = ?`);
        params.push(userId);
        if (query?.categoria) {
            conditions.push(`categoria = ?`);
            params.push(query.categoria);
        }
        if (query?.visto !== undefined) {
            const visto = query.visto === 'true' || query.visto === true;
            conditions.push(`visto = ?`);
            params.push(visto);
        }
        if (query?.tag) {
            conditions.push(`JSON_CONTAINS(tags, ?)`);
            params.push(JSON.stringify(query.tag));
        }
        if (query?.q) {
            const searchTerm = `%${query.q}%`;
            conditions.push(`(titulo LIKE ? OR descripcion LIKE ?)`);
            params.push(searchTerm, searchTerm);
        }
        let orderClause = 'fecha_guardado DESC';
        if (query?.sort === 'fecha_publicacion') {
            orderClause = 'fecha_publicacion_yt DESC';
        }
        else if (query?.sort === 'titulo') {
            orderClause = 'titulo ASC';
        }
        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
        const query_raw = `SELECT * FROM shorts ${whereClause} ORDER BY ${orderClause}`;
        return this.prisma.$queryRawUnsafe(query_raw, ...params);
    }
    async findOne(id, userId) {
        const short = await this.prisma.shorts.findFirst({
            where: { id_short: id, id_usuario: userId },
        });
        if (!short)
            throw new common_1.NotFoundException('Short not found');
        return short;
    }
    async update(id, dto, userId) {
        await this.findOne(id, userId);
        return this.prisma.shorts.update({
            where: { id_short: id },
            data: dto,
        });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.shorts.delete({ where: { id_short: id } });
    }
    async toggleVisto(id, userId) {
        const short = await this.findOne(id, userId);
        return this.prisma.shorts.update({
            where: { id_short: id },
            data: { visto: !short.visto },
        });
    }
};
exports.ShortsService = ShortsService;
exports.ShortsService = ShortsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        youtube_service_1.YoutubeService])
], ShortsService);
//# sourceMappingURL=shorts.service.js.map