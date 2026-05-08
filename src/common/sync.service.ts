import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ChannelsService } from '../channels/channels.service';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(private channelsService: ChannelsService) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async syncAllChannels() {
    this.logger.log('Starting scheduled sync of all channels...');
    try {
      const results = await this.channelsService.syncAllChannels();
      this.logger.log(`Sync completed: ${JSON.stringify(results)}`);
    } catch (err) {
      this.logger.error(`Sync failed: ${(err as Error).message}`);
    }
  }
}
