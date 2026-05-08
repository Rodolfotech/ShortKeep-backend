import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ShortsService } from './shorts.service';
import { CreateShortDto } from './dto/create-short.dto';
import { UpdateShortDto } from './dto/update-short.dto';
import { QueryShortsDto } from './dto/query-shorts.dto';

@ApiTags('Shorts')
@ApiBearerAuth()
@Controller('shorts')
export class ShortsController {
  constructor(private readonly shortsService: ShortsService) {}

  @Post()
  @ApiOperation({ summary: 'Guardar un short desde URL de YouTube' })
  create(@Body() dto: CreateShortDto, @Req() req: any) {
    return this.shortsService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar shorts guardados (con filtros)' })
  findAll(@Req() req: any, @Query() query?: QueryShortsDto) {
    return this.shortsService.findAll(req.user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un short' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.shortsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un short' })
  update(@Param('id') id: string, @Body() dto: UpdateShortDto, @Req() req: any) {
    return this.shortsService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un short' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.shortsService.remove(id, req.user.id);
  }

  @Patch(':id/visto')
  @ApiOperation({ summary: 'Alternar visto/no visto' })
  toggleVisto(@Param('id') id: string, @Req() req: any) {
    return this.shortsService.toggleVisto(id, req.user.id);
  }
}
