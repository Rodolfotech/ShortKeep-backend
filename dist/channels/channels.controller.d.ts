import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
export declare class ChannelsController {
    private readonly channelsService;
    constructor(channelsService: ChannelsService);
    create(dto: CreateChannelDto, req: any): Promise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_canal: string;
        youtube_channel_id: string;
        nombre_canal: string;
    }>;
    findAll(req: any): import(".prisma/client").Prisma.PrismaPromise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_canal: string;
        youtube_channel_id: string;
        nombre_canal: string;
    }[]>;
    getLatestShorts(req: any): Promise<({
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
    findOne(id: string, req: any): Promise<{
        channel: {
            url_miniatura: string | null;
            id_usuario: string | null;
            id_canal: string;
            youtube_channel_id: string;
            nombre_canal: string;
        };
        shorts: {
            id_short: string;
            youtube_video_id: string;
            titulo: string;
            url_miniatura: string | null;
            descripcion: string | null;
            tags: import("@prisma/client/runtime/library").JsonValue | null;
            categoria: string | null;
            visto: boolean | null;
            fecha_publicacion_yt: Date | null;
            fecha_guardado: Date | null;
            id_usuario: string | null;
            id_canal: string | null;
        }[];
    }>;
    remove(id: string, req: any): Promise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_canal: string;
        youtube_channel_id: string;
        nombre_canal: string;
    }>;
    sync(id: string, req: any): Promise<{
        channel: string;
        synced: number;
        shorts: any[];
    }>;
}
