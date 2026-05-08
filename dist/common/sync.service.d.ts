import { ChannelsService } from '../channels/channels.service';
export declare class SyncService {
    private channelsService;
    private readonly logger;
    constructor(channelsService: ChannelsService);
    syncAllChannels(): Promise<void>;
}
