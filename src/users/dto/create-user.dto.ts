import { IsEmail, IsString, MinLength, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Correo electrónico' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Contraseña (mín. 6 caracteres)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: 'Juan Pérez', description: 'Nombre del usuario' })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({ example: 1, description: 'ID del cargo' })
  @IsInt()
  @IsOptional()
  id_cargo?: number;
}
