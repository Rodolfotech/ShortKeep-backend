import { Injectable, NotFoundException, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { YoutubeService } from '../youtube/youtube.service';
import { CreateChannelDto } from './dto/create-channel.dto';

@Injectable()
export class ChannelsService {
  constructor(
    private prisma: PrismaService,
    private youtube: YoutubeService,
  ) {}

  async create(dto: CreateChannelDto, userId: string) {
    try {
      const info = await this.youtube.getChannelByUrl(dto.url);

      const existing = await this.prisma.canales.findFirst({
        where: { youtube_channel_id: info.channelId, id_usuario: userId },
      });
      if (existing) throw new ConflictException('Channel already added');

      return this.prisma.canales.create({
        data: {
          id_canal: randomUUID(),
          youtube_channel_id: info.channelId,
          nombre_canal: info.title,
          url_miniatura: info.thumbnail,
          id_usuario: userId,
        },
      });
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new BadRequestException(error.message || 'Invalid YouTube channel URL');
    }
  }

  findAll(userId: string) {
    return this.prisma.canales.findMany({
      where: { id_usuario: userId },
      orderBy: { nombre_canal: 'asc' },
    });
  }

  async findOne(id: string, userId: string) {
    const channel = await this.prisma.canales.findFirst({
      where: { id_canal: id, id_usuario: userId },
    });
    if (!channel) throw new NotFoundException('Channel not found');
    return channel;
  }

  async getShortsByChannel(channelId: string, userId: string) {
    return this.prisma.shorts.findMany({
      where: { id_usuario: userId, id_canal: channelId },
      orderBy: { fecha_publicacion_yt: 'desc' },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.canales.delete({ where: { id_canal: id } });
  }

  async getLatestShortsFromFollowing(userId: string) {
    const following = await this.prisma.canales.findMany({
      where: { id_usuario: userId },
    });

    const results = await Promise.all(
      following.map(async (channel) => {
        try {
          const videos = await this.youtube.getVideosByChannel(channel.youtube_channel_id);
          return {
            channel: { id: channel.id_canal, nombre: channel.nombre_canal, miniatura: channel.url_miniatura },
            videos,
          };
        } catch {
          return {
            channel: { id: channel.id_canal, nombre: channel.nombre_canal, miniatura: channel.url_miniatura },
            videos: [],
            error: 'Error fetching videos',
          };
        }
      }),
    );

    return results;
  }

  async sync(id: string, userId: string) {
    try {
      const channel = await this.findOne(id, userId);
      const videos = await this.youtube.getVideosByChannel(channel.youtube_channel_id);

      const results: any[] = [];
      for (const video of videos) {
        const existing = await this.prisma.shorts.findFirst({
          where: { youtube_video_id: video.youtubeVideoId, id_usuario: userId },
        });
        if (existing) continue;

        const created = await this.prisma.shorts.create({
          data: {
            id_short: randomUUID(),
            youtube_video_id: video.youtubeVideoId,
            titulo: video.title,
            url_miniatura: video.thumbnail,
            fecha_publicacion_yt: new Date(video.publishedAt),
            id_usuario: userId,
            id_canal: id,
          },
        });
        results.push(created);
      }

      return { channel: channel.nombre_canal, synced: results.length, shorts: results };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error syncing shorts');
    }
  }

  async syncAllChannels() {
    const channels = await this.prisma.canales.findMany();
    const results: { channel: string; synced: number; error?: string }[] = [];

    for (const channel of channels) {
      try {
        const videos = await this.youtube.getVideosByChannel(channel.youtube_channel_id);
        let count = 0;
        for (const video of videos) {
          const existing = await this.prisma.shorts.findFirst({
            where: { youtube_video_id: video.youtubeVideoId, id_usuario: channel.id_usuario },
          });
          if (existing) continue;

          await this.prisma.shorts.create({
            data: {
              id_short: randomUUID(),
              youtube_video_id: video.youtubeVideoId,
              titulo: video.title,
              url_miniatura: video.thumbnail,
              fecha_publicacion_yt: new Date(video.publishedAt),
              id_usuario: channel.id_usuario!,
            },
          });
          count++;
        }
        results.push({ channel: channel.nombre_canal, synced: count });
      } catch (err) {
        results.push({ channel: channel.nombre_canal, synced: 0, error: (err as Error).message });
      }
    }

    return results;
  }
}
