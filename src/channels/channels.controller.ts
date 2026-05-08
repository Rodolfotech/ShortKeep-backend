import { Controller, Get, Post, Param, Delete, Req, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';

@ApiTags('Channels')
@ApiBearerAuth()
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar un canal de YouTube para seguir' })
  create(@Body() dto: CreateChannelDto, @Req() req: any) {
    return this.channelsService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar canales que sigues' })
  findAll(@Req() req: any) {
    return this.channelsService.findAll(req.user.id);
  }

  @Get('latest/shorts')
  @ApiOperation({ summary: 'Ver últimos videos de todos tus canales (explorar)' })
  getLatestShorts(@Req() req: any) {
    return this.channelsService.getLatestShortsFromFollowing(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de un canal' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.channelsService.findOne(id, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Dejar de seguir un canal' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.channelsService.remove(id, req.user.id);
  }

  @Post(':id/sync')
  @ApiOperation({ summary: 'Sincronizar y guardar shorts de un canal' })
  sync(@Param('id') id: string, @Req() req: any) {
    return this.channelsService.sync(id, req.user.id);
  }
}
