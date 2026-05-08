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
exports.ChannelsService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const prisma_service_1 = require("../prisma/prisma.service");
const youtube_service_1 = require("../youtube/youtube.service");
let ChannelsService = class ChannelsService {
    prisma;
    youtube;
    constructor(prisma, youtube) {
        this.prisma = prisma;
        this.youtube = youtube;
    }
    async create(dto, userId) {
        const info = await this.youtube.getChannelByUrl(dto.url);
        const existing = await this.prisma.canales.findFirst({
            where: { youtube_channel_id: info.channelId, id_usuario: userId },
        });
        if (existing)
            throw new common_1.ConflictException('Channel already added');
        return this.prisma.canales.create({
            data: {
                id_canal: (0, node_crypto_1.randomUUID)(),
                youtube_channel_id: info.channelId,
                nombre_canal: info.title,
                url_miniatura: info.thumbnail,
                id_usuario: userId,
            },
        });
    }
    findAll(userId) {
        return this.prisma.canales.findMany({
            where: { id_usuario: userId },
            orderBy: { nombre_canal: 'asc' },
        });
    }
    async findOne(id, userId) {
        const channel = await this.prisma.canales.findFirst({
            where: { id_canal: id, id_usuario: userId },
        });
        if (!channel)
            throw new common_1.NotFoundException('Channel not found');
        return channel;
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.canales.delete({ where: { id_canal: id } });
    }
    async getLatestShortsFromFollowing(userId) {
        const following = await this.prisma.canales.findMany({
            where: { id_usuario: userId },
        });
        const results = await Promise.all(following.map(async (channel) => {
            try {
                const videos = await this.youtube.getVideosByChannel(channel.youtube_channel_id);
                return {
                    channel: { id: channel.id_canal, nombre: channel.nombre_canal, miniatura: channel.url_miniatura },
                    videos,
                };
            }
            catch {
                return {
                    channel: { id: channel.id_canal, nombre: channel.nombre_canal, miniatura: channel.url_miniatura },
                    videos: [],
                    error: 'Error fetching videos',
                };
            }
        }));
        return results;
    }
    async sync(id, userId) {
        const channel = await this.findOne(id, userId);
        const videos = await this.youtube.getVideosByChannel(channel.youtube_channel_id);
        const results = [];
        for (const video of videos) {
            const existing = await this.prisma.shorts.findFirst({
                where: { youtube_video_id: video.youtubeVideoId, id_usuario: userId },
            });
            if (existing)
                continue;
            const created = await this.prisma.shorts.create({
                data: {
                    id_short: (0, node_crypto_1.randomUUID)(),
                    youtube_video_id: video.youtubeVideoId,
                    titulo: video.title,
                    url_miniatura: video.thumbnail,
                    fecha_publicacion_yt: new Date(video.publishedAt),
                    id_usuario: userId,
                },
            });
            results.push(created);
        }
        return { channel: channel.nombre_canal, synced: results.length, shorts: results };
    }
    async syncAllChannels() {
        const channels = await this.prisma.canales.findMany();
        const results = [];
        for (const channel of channels) {
            try {
                const videos = await this.youtube.getVideosByChannel(channel.youtube_channel_id);
                let count = 0;
                for (const video of videos) {
                    const existing = await this.prisma.shorts.findFirst({
                        where: { youtube_video_id: video.youtubeVideoId, id_usuario: channel.id_usuario },
                    });
                    if (existing)
                        continue;
                    await this.prisma.shorts.create({
                        data: {
                            id_short: (0, node_crypto_1.randomUUID)(),
                            youtube_video_id: video.youtubeVideoId,
                            titulo: video.title,
                            url_miniatura: video.thumbnail,
                            fecha_publicacion_yt: new Date(video.publishedAt),
                            id_usuario: channel.id_usuario,
                        },
                    });
                    count++;
                }
                results.push({ channel: channel.nombre_canal, synced: count });
            }
            catch (err) {
                results.push({ channel: channel.nombre_canal, synced: 0, error: err.message });
            }
        }
        return results;
    }
};
exports.ChannelsService = ChannelsService;
exports.ChannelsService = ChannelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        youtube_service_1.YoutubeService])
], ChannelsService);
//# sourceMappingURL=channels.service.js.map