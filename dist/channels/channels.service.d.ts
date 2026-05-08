import { PrismaService } from '../prisma/prisma.service';
import { YoutubeService } from '../youtube/youtube.service';
import { CreateChannelDto } from './dto/create-channel.dto';
export declare class ChannelsService {
    private prisma;
    private youtube;
    constructor(prisma: PrismaService, youtube: YoutubeService);
    create(dto: CreateChannelDto, userId: string): Promise<{
        id_usuario: string | null;
        id_canal: string;
        youtube_channel_id: string;
        nombre_canal: string;
        url_miniatura: string | null;
    }>;
    findAll(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id_usuario: string | null;
        id_canal: string;
        youtube_channel_id: string;
        nombre_canal: string;
        url_miniatura: string | null;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        id_usuario: string | null;
        id_canal: string;
        youtube_channel_id: string;
        nombre_canal: string;
        url_miniatura: string | null;
    }>;
    getShortsByChannel(channelId: string, userId: string): Promise<{
        id_usuario: string | null;
        id_canal: string | null;
        url_miniatura: string | null;
        id_short: string;
        youtube_video_id: string;
        titulo: string;
        descripcion: string | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        categoria: string | null;
        visto: boolean | null;
        fecha_publicacion_yt: Date | null;
        fecha_guardado: Date | null;
    }[]>;
    remove(id: string, userId: string): Promise<{
        id_usuario: string | null;
        id_canal: string;
        youtube_channel_id: string;
        nombre_canal: string;
        url_miniatura: string | null;
    }>;
    getLatestShortsFromFollowing(userId: string): Promise<({
        channel: {
            id: string;
            nombre: string;
            miniatura: string | null;
        };
        videos: import("../youtube/youtube.service").YouTubePlaylistVideoInfo[];
        error?: undefined;
    } | {
        channel: {
            id: string;
            nombre: string;
            miniatura: string | null;
        };
        videos: never[];
        error: string;
    })[]>;
    sync(id: string, userId: string): Promise<{
        channel: string;
        synced: number;
        shorts: any[];
    }>;
    syncAllChannels(): Promise<{
        channel: string;
        synced: number;
        error?: string;
    }[]>;
}
