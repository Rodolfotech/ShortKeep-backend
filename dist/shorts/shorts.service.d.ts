import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { YoutubeService } from '../youtube/youtube.service';
import { CreateShortDto } from './dto/create-short.dto';
import { UpdateShortDto } from './dto/update-short.dto';
import { QueryShortsDto } from './dto/query-shorts.dto';
export declare class ShortsService {
    private prisma;
    private youtube;
    constructor(prisma: PrismaService, youtube: YoutubeService);
    create(dto: CreateShortDto, userId: string): Promise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_short: string;
        youtube_video_id: string;
        titulo: string;
        descripcion: string | null;
        tags: Prisma.JsonValue | null;
        categoria: string | null;
        visto: boolean | null;
        fecha_publicacion_yt: Date | null;
        fecha_guardado: Date | null;
    }>;
    findAll(userId: string, query?: QueryShortsDto): Promise<unknown>;
    findOne(id: string, userId: string): Promise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_short: string;
        youtube_video_id: string;
        titulo: string;
        descripcion: string | null;
        tags: Prisma.JsonValue | null;
        categoria: string | null;
        visto: boolean | null;
        fecha_publicacion_yt: Date | null;
        fecha_guardado: Date | null;
    }>;
    update(id: string, dto: UpdateShortDto, userId: string): Promise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_short: string;
        youtube_video_id: string;
        titulo: string;
        descripcion: string | null;
        tags: Prisma.JsonValue | null;
        categoria: string | null;
        visto: boolean | null;
        fecha_publicacion_yt: Date | null;
        fecha_guardado: Date | null;
    }>;
    remove(id: string, userId: string): Promise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_short: string;
        youtube_video_id: string;
        titulo: string;
        descripcion: string | null;
        tags: Prisma.JsonValue | null;
        categoria: string | null;
        visto: boolean | null;
        fecha_publicacion_yt: Date | null;
        fecha_guardado: Date | null;
    }>;
    toggleVisto(id: string, userId: string): Promise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_short: string;
        youtube_video_id: string;
        titulo: string;
        descripcion: string | null;
        tags: Prisma.JsonValue | null;
        categoria: string | null;
        visto: boolean | null;
        fecha_publicacion_yt: Date | null;
        fecha_guardado: Date | null;
    }>;
}
