import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShortDto {
  @ApiProperty({ example: 'https://youtube.com/shorts/abc123', description: 'URL del short de YouTube' })
  @IsString()
  url: string;

  @ApiPropertyOptional({ example: 'Programación', description: 'Categoría del short' })
  @IsString()
  @IsOptional()
  categoria?: string;

  @ApiPropertyOptional({ example: ['nestjs', 'typescript'], description: 'Tags del short' })
  @IsArray()
  @IsOptional()
  tags?: string[];
}
