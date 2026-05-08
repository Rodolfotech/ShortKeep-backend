import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
export declare class ChannelsController {
    private readonly channelsService;
    constructor(channelsService: ChannelsService);
    create(dto: CreateChannelDto, req: any): Promise<{
        id_usuario: string | null;
        id_canal: string;
        youtube_channel_id: string;
        nombre_canal: string;
        url_miniatura: string | null;
    }>;
    findAll(req: any): import(".prisma/client").Prisma.PrismaPromise<{
        id_usuario: string | null;
        id_canal: string;
        youtube_channel_id: string;
        nombre_canal: string;
        url_miniatura: string | null;
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
        id_usuario: string | null;
        id_canal: string;
        youtube_channel_id: string;
        nombre_canal: string;
        url_miniatura: string | null;
    }>;
    remove(id: string, req: any): Promise<{
        id_usuario: string | null;
        id_canal: string;
        youtube_channel_id: string;
        nombre_canal: string;
        url_miniatura: string | null;
    }>;
    sync(id: string, req: any): Promise<{
        channel: string;
        synced: number;
        shorts: any[];
    }>;
}
