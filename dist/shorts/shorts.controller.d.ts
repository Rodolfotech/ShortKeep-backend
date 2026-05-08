import { ShortsService } from './shorts.service';
import { CreateShortDto } from './dto/create-short.dto';
import { UpdateShortDto } from './dto/update-short.dto';
import { QueryShortsDto } from './dto/query-shorts.dto';
export declare class ShortsController {
    private readonly shortsService;
    constructor(shortsService: ShortsService);
    create(dto: CreateShortDto, req: any): Promise<{
        id_usuario: string | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        categoria: string | null;
        fecha_guardado: Date | null;
        titulo: string;
        visto: boolean | null;
        id_short: string;
        youtube_video_id: string;
        url_miniatura: string | null;
        descripcion: string | null;
        fecha_publicacion_yt: Date | null;
    }>;
    findAll(req: any, query?: QueryShortsDto): Promise<unknown>;
    findOne(id: string, req: any): Promise<{
        id_usuario: string | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        categoria: string | null;
        fecha_guardado: Date | null;
        titulo: string;
        visto: boolean | null;
        id_short: string;
        youtube_video_id: string;
        url_miniatura: string | null;
        descripcion: string | null;
        fecha_publicacion_yt: Date | null;
    }>;
    update(id: string, dto: UpdateShortDto, req: any): Promise<{
        id_usuario: string | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        categoria: string | null;
        fecha_guardado: Date | null;
        titulo: string;
        visto: boolean | null;
        id_short: string;
        youtube_video_id: string;
        url_miniatura: string | null;
        descripcion: string | null;
        fecha_publicacion_yt: Date | null;
    }>;
    remove(id: string, req: any): Promise<{
        id_usuario: string | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        categoria: string | null;
        fecha_guardado: Date | null;
        titulo: string;
        visto: boolean | null;
        id_short: string;
        youtube_video_id: string;
        url_miniatura: string | null;
        descripcion: string | null;
        fecha_publicacion_yt: Date | null;
    }>;
    toggleVisto(id: string, req: any): Promise<{
        id_usuario: string | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        categoria: string | null;
        fecha_guardado: Date | null;
        titulo: string;
        visto: boolean | null;
        id_short: string;
        youtube_video_id: string;
        url_miniatura: string | null;
        descripcion: string | null;
        fecha_publicacion_yt: Date | null;
    }>;
}
