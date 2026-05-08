import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ChannelsModule } from '../channels/channels.module';
import { SyncService } from './sync.service';

@Module({
  imports: [ScheduleModule.forRoot(), ChannelsModule],
  providers: [SyncService],
})
export class CommonModule {}
