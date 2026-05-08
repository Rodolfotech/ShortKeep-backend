import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<{
        email: string;
        password: string;
        nombre: string | null;
        id_cargo: number | null;
        id_usuario: string;
        fecha_registro: Date | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        cargo: {
            id_cargo: number;
            nombre_cargo: string;
        } | null;
    } & {
        email: string;
        password: string;
        nombre: string | null;
        id_cargo: number | null;
        id_usuario: string;
        fecha_registro: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        canales: {
            id_usuario: string | null;
            id_canal: string;
            youtube_channel_id: string;
            nombre_canal: string;
            url_miniatura: string | null;
        }[];
        cargo: {
            id_cargo: number;
            nombre_cargo: string;
        } | null;
        shorts: {
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
        }[];
    } & {
        email: string;
        password: string;
        nombre: string | null;
        id_cargo: number | null;
        id_usuario: string;
        fecha_registro: Date | null;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        email: string;
        password: string;
        nombre: string | null;
        id_cargo: number | null;
        id_usuario: string;
        fecha_registro: Date | null;
    }>;
    remove(id: string): Promise<{
        email: string;
        password: string;
        nombre: string | null;
        id_cargo: number | null;
        id_usuario: string;
        fecha_registro: Date | null;
    }>;
}
