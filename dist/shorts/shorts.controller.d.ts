import { ShortsService } from './shorts.service';
import { CreateShortDto } from './dto/create-short.dto';
import { UpdateShortDto } from './dto/update-short.dto';
import { QueryShortsDto } from './dto/query-shorts.dto';
export declare class ShortsController {
    private readonly shortsService;
    constructor(shortsService: ShortsService);
    create(dto: CreateShortDto, req: any): Promise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_short: string;
        youtube_video_id: string;
        titulo: string;
        descripcion: string | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        categoria: string | null;
        visto: boolean | null;
        fecha_publicacion_yt: Date | null;
        fecha_guardado: Date | null;
    }>;
    findAll(req: any, query?: QueryShortsDto): Promise<unknown>;
    findOne(id: string, req: any): Promise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_short: string;
        youtube_video_id: string;
        titulo: string;
        descripcion: string | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        categoria: string | null;
        visto: boolean | null;
        fecha_publicacion_yt: Date | null;
        fecha_guardado: Date | null;
    }>;
    update(id: string, dto: UpdateShortDto, req: any): Promise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_short: string;
        youtube_video_id: string;
        titulo: string;
        descripcion: string | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        categoria: string | null;
        visto: boolean | null;
        fecha_publicacion_yt: Date | null;
        fecha_guardado: Date | null;
    }>;
    remove(id: string, req: any): Promise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_short: string;
        youtube_video_id: string;
        titulo: string;
        descripcion: string | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        categoria: string | null;
        visto: boolean | null;
        fecha_publicacion_yt: Date | null;
        fecha_guardado: Date | null;
    }>;
    toggleVisto(id: string, req: any): Promise<{
        url_miniatura: string | null;
        id_usuario: string | null;
        id_short: string;
        youtube_video_id: string;
        titulo: string;
        descripcion: string | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        categoria: string | null;
        visto: boolean | null;
        fecha_publicacion_yt: Date | null;
        fecha_guardado: Date | null;
    }>;
}
