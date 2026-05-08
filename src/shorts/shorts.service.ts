import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { YoutubeService } from '../youtube/youtube.service';
import { CreateShortDto } from './dto/create-short.dto';
import { UpdateShortDto } from './dto/update-short.dto';
import { QueryShortsDto } from './dto/query-shorts.dto';

@Injectable()
export class ShortsService {
  constructor(
    private prisma: PrismaService,
    private youtube: YoutubeService,
  ) {}

  async create(dto: CreateShortDto, userId: string) {
    const info = await this.youtube.getVideoInfo(dto.url);

    const existing = await this.prisma.shorts.findFirst({
      where: { youtube_video_id: info.videoId, id_usuario: userId },
    });

    if (existing) return existing;

    return this.prisma.shorts.create({
      data: {
        id_short: randomUUID(),
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

  async findAll(userId: string, query?: QueryShortsDto) {
    const conditions: string[] = [];
    const params: any[] = [];

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
    } else if (query?.sort === 'titulo') {
      orderClause = 'titulo ASC';
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query_raw = `SELECT * FROM shorts ${whereClause} ORDER BY ${orderClause}`;

    return this.prisma.$queryRawUnsafe(query_raw, ...params);
  }

  async findOne(id: string, userId: string) {
    const short = await this.prisma.shorts.findFirst({
      where: { id_short: id, id_usuario: userId },
    });
    if (!short) throw new NotFoundException('Short not found');
    return short;
  }

  async update(id: string, dto: UpdateShortDto, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.shorts.update({
      where: { id_short: id },
      data: dto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.shorts.delete({ where: { id_short: id } });
  }

  async toggleVisto(id: string, userId: string) {
    const short = await this.findOne(id, userId);
    return this.prisma.shorts.update({
      where: { id_short: id },
      data: { visto: !short.visto },
    });
  }
}
