"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var YoutubeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let YoutubeService = YoutubeService_1 = class YoutubeService {
    configService;
    httpService;
    logger = new common_1.Logger(YoutubeService_1.name);
    apiKey;
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        this.apiKey = this.configService.get('YOUTUBE_API_KEY') || '';
    }
    async getVideoInfo(url) {
        const videoId = this.extractVideoId(url);
        if (!videoId)
            throw new Error('Invalid YouTube URL');
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet',
                id: videoId,
                key: this.apiKey,
            },
        }));
        const item = response.data?.items?.[0];
        if (!item)
            throw new Error('Video not found');
        const snippet = item.snippet;
        return {
            videoId,
            title: snippet.title,
            thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
            description: snippet.description,
            publishedAt: snippet.publishedAt,
        };
    }
    async getChannelInfo(channelId) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://www.googleapis.com/youtube/v3/channels', {
            params: {
                part: 'snippet',
                id: channelId,
                key: this.apiKey,
            },
        }));
        const item = response.data?.items?.[0];
        if (!item)
            throw new Error('Channel not found');
        const snippet = item.snippet;
        return {
            channelId,
            title: snippet.title,
            thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
        };
    }
    async getChannelByUrl(url) {
        const identifier = this.extractChannelId(url);
        if (!identifier)
            throw new Error('Invalid YouTube channel URL');
        const params = { part: 'snippet', key: this.apiKey };
        if (/^UC[\w-]{22}$/.test(identifier)) {
            params.id = identifier;
        }
        else {
            params.forHandle = identifier;
        }
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://www.googleapis.com/youtube/v3/channels', { params }));
        const item = response.data?.items?.[0];
        if (!item)
            throw new Error('Channel not found');
        const snippet = item.snippet;
        return {
            channelId: item.id,
            title: snippet.title,
            thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
        };
    }
    async getVideosByChannel(channelId, maxResults = 10) {
        try {
            const uploadsPlaylistId = channelId.replace(/^UC/, 'UU');
            this.logger.log(`Fetching playlist: ${uploadsPlaylistId}, key length: ${this.apiKey?.length || 0}`);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://www.googleapis.com/youtube/v3/playlistItems', {
                params: {
                    part: 'snippet,contentDetails',
                    playlistId: uploadsPlaylistId,
                    maxResults,
                    key: this.apiKey,
                },
            }));
            this.logger.log(`YouTube API response status: ${response.status}, items: ${response.data?.items?.length || 0}`);
            const items = response.data?.items || [];
            return items.map((item) => ({
                youtubeVideoId: item.contentDetails.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
                publishedAt: item.snippet.publishedAt,
            }));
        }
        catch (error) {
            this.logger.error(`Error fetching videos for channel ${channelId}: ${error.message}`);
            throw new common_1.HttpException('Error al obtener videos del canal', common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
    extractVideoId(url) {
        const patterns = [
            /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
            /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
            /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
            /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        ];
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match)
                return match[1];
        }
        return null;
    }
    extractChannelId(url) {
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
                if (reserved.includes(match[1]))
                    continue;
                if (pattern.toString().includes('UC'))
                    return match[1];
                return match[1];
            }
        }
        if (/^UC[\w-]{22}$/.test(url))
            return url;
        return null;
    }
    isShortDuration(duration) {
        const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
        if (!match)
            return false;
        const minutes = parseInt(match[1] || '0', 10);
        const seconds = parseInt(match[2] || '0', 10);
        return minutes === 0 && seconds <= 60;
    }
};
exports.YoutubeService = YoutubeService;
exports.YoutubeService = YoutubeService = YoutubeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], YoutubeService);
//# sourceMappingURL=youtube.service.js.map