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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shorts_service_1 = require("./shorts.service");
const create_short_dto_1 = require("./dto/create-short.dto");
const update_short_dto_1 = require("./dto/update-short.dto");
const query_shorts_dto_1 = require("./dto/query-shorts.dto");
let ShortsController = class ShortsController {
    shortsService;
    constructor(shortsService) {
        this.shortsService = shortsService;
    }
    create(dto, req) {
        return this.shortsService.create(dto, req.user.id);
    }
    findAll(req, query) {
        return this.shortsService.findAll(req.user.id, query);
    }
    findOne(id, req) {
        return this.shortsService.findOne(id, req.user.id);
    }
    update(id, dto, req) {
        return this.shortsService.update(id, dto, req.user.id);
    }
    remove(id, req) {
        return this.shortsService.remove(id, req.user.id);
    }
    toggleVisto(id, req) {
        return this.shortsService.toggleVisto(id, req.user.id);
    }
};
exports.ShortsController = ShortsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Guardar un short desde URL de YouTube' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_short_dto_1.CreateShortDto, Object]),
    __metadata("design:returntype", void 0)
], ShortsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar shorts guardados (con filtros)' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_shorts_dto_1.QueryShortsDto]),
    __metadata("design:returntype", void 0)
], ShortsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener detalle de un short' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShortsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un short' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_short_dto_1.UpdateShortDto, Object]),
    __metadata("design:returntype", void 0)
], ShortsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un short' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShortsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/visto'),
    (0, swagger_1.ApiOperation)({ summary: 'Alternar visto/no visto' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShortsController.prototype, "toggleVisto", null);
exports.ShortsController = ShortsController = __decorate([
    (0, swagger_1.ApiTags)('Shorts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('shorts'),
    __metadata("design:paramtypes", [shorts_service_1.ShortsService])
], ShortsController);
//# sourceMappingURL=shorts.controller.js.map