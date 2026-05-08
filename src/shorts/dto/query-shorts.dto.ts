import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryShortsDto {
  @ApiPropertyOptional({ example: 'Programación', description: 'Filtrar por categoría' })
  @IsString()
  @IsOptional()
  categoria?: string;

  @ApiPropertyOptional({ example: 'nestjs', description: 'Filtrar por tag' })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiPropertyOptional({ example: 'tutorial', description: 'Buscar por texto en título/descripción' })
  @IsString()
  @IsOptional()
  q?: string;

  @ApiPropertyOptional({ example: 'fecha_publicacion', description: 'Ordenar por (fecha_guardado, fecha_publicacion, titulo)', enum: ['fecha_guardado', 'fecha_publicacion', 'titulo'] })
  @IsString()
  @IsOptional()
  sort?: 'fecha_guardado' | 'fecha_publicacion' | 'titulo';

  @ApiPropertyOptional({ example: 'true', description: 'Filtrar por visto/no visto' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  visto?: boolean | string;
}
