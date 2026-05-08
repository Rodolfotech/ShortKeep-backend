import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface YouTubeVideoInfo {
  videoId: string;
  title: string;
  thumbnail: string;
  description: string;
  publishedAt: string;
}

export interface YouTubePlaylistVideoInfo {
  youtubeVideoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export interface YouTubeChannelInfo {
  channelId: string;
  title: string;
  thumbnail: string;
}

@Injectable()
export class YoutubeService {
  private readonly logger = new Logger(YoutubeService.name);
  private readonly apiKey: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('YOUTUBE_API_KEY') || '';
  }

  async getVideoInfo(url: string): Promise<YouTubeVideoInfo> {
    const videoId = this.extractVideoId(url);
    if (!videoId) throw new Error('Invalid YouTube URL');

    const response = await firstValueFrom(
      this.httpService.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          id: videoId,
          key: this.apiKey,
        },
      }),
    );

    const item = response.data?.items?.[0];
    if (!item) throw new Error('Video not found');

    const snippet = item.snippet;
    return {
      videoId,
      title: snippet.title,
      thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
      description: snippet.description,
      publishedAt: snippet.publishedAt,
    };
  }

  async getChannelInfo(channelId: string): Promise<YouTubeChannelInfo> {
    const response = await firstValueFrom(
      this.httpService.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'snippet',
          id: channelId,
          key: this.apiKey,
        },
      }),
    );

    const item = response.data?.items?.[0];
    if (!item) throw new Error('Channel not found');

    const snippet = item.snippet;
    return {
      channelId,
      title: snippet.title,
      thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
    };
  }

  async getChannelByUrl(url: string): Promise<YouTubeChannelInfo> {
    const identifier = this.extractChannelId(url);
    if (!identifier) throw new Error('Invalid YouTube channel URL');

    const params: any = { part: 'snippet', key: this.apiKey };

    if (/^UC[\w-]{22}$/.test(identifier)) {
      params.id = identifier;
    } else {
      params.forHandle = identifier;
    }

    const response = await firstValueFrom(
      this.httpService.get('https://www.googleapis.com/youtube/v3/channels', { params }),
    );

    const item = response.data?.items?.[0];
    if (!item) throw new Error('Channel not found');

    const snippet = item.snippet;
    return {
      channelId: item.id,
      title: snippet.title,
      thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
    };
  }

  async getVideosByChannel(channelId: string, maxResults = 10): Promise<YouTubePlaylistVideoInfo[]> {
    try {
      const uploadsPlaylistId = channelId.replace(/^UC/, 'UU');

      this.logger.log(`Fetching playlist: ${uploadsPlaylistId}, key length: ${this.apiKey?.length || 0}`);

      const response = await firstValueFrom(
        this.httpService.get('https://www.googleapis.com/youtube/v3/playlistItems', {
          params: {
            part: 'snippet,contentDetails',
            playlistId: uploadsPlaylistId,
            maxResults,
            key: this.apiKey,
          },
        }),
      );

      this.logger.log(`YouTube API response status: ${response.status}, items: ${response.data?.items?.length || 0}`);

      const items = response.data?.items || [];
      return items.map((item: any) => ({
        youtubeVideoId: item.contentDetails.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
        publishedAt: item.snippet.publishedAt,
      }));
    } catch (error) {
      this.logger.error(`Error fetching videos for channel ${channelId}: ${(error as Error).message}`);
      throw new HttpException(
        'Error al obtener videos del canal',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  extractChannelId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/channel\/)(UC[\w-]{22})/,
      /(?:youtube\.com\/@)([\w-]+)/,
      /(?:youtube\.com\/c\/)([\w-]+)/,
      /(?:youtube\.com\/)([\w-]{3,})/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        const reserved = ['feed', 'results', 'account', 'about', 'ads', 't', 'o', 'watch', 'playlist', 'embed'];
        if (reserved.includes(match[1])) continue;
        if (pattern.toString().includes('UC')) return match[1];
        return match[1];
      }
    }

    if (/^UC[\w-]{22}$/.test(url)) return url;

    return null;
  }

  private isShortDuration(duration: string): boolean {
    const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return false;
    const minutes = parseInt(match[1] || '0', 10);
    const seconds = parseInt(match[2] || '0', 10);
    return minutes === 0 && seconds <= 60;
  }
}
