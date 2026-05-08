import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
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
export declare class YoutubeService {
    private configService;
    private httpService;
    private readonly logger;
    private readonly apiKey;
    constructor(configService: ConfigService, httpService: HttpService);
    getVideoInfo(url: string): Promise<YouTubeVideoInfo>;
    getChannelInfo(channelIdOrHandle: string): Promise<YouTubeChannelInfo>;
    getChannelByUrl(url: string): Promise<YouTubeChannelInfo>;
    getVideosByChannel(channelId: string, maxResults?: number): Promise<YouTubePlaylistVideoInfo[]>;
    extractVideoId(url: string): string | null;
    extractChannelId(url: string): string | null;
    private isShortDuration;
}
