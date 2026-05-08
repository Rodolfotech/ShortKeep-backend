import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto {
  @ApiProperty({ example: 'https://youtube.com/@midudev', description: 'URL del canal de YouTube' })
  @IsString()
  url: string;
}
