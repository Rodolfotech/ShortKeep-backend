import { Module } from '@nestjs/common';
import { ShortsService } from './shorts.service';
import { ShortsController } from './shorts.controller';
import { YoutubeModule } from '../youtube/youtube.module';

@Module({
  imports: [YoutubeModule],
  controllers: [ShortsController],
  providers: [ShortsService],
})
export class ShortsModule {}
