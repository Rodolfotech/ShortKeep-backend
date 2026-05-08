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
var SyncService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const channels_service_1 = require("../channels/channels.service");
let SyncService = SyncService_1 = class SyncService {
    channelsService;
    logger = new common_1.Logger(SyncService_1.name);
    constructor(channelsService) {
        this.channelsService = channelsService;
    }
    async syncAllChannels() {
        this.logger.log('Starting scheduled sync of all channels...');
        try {
            const results = await this.channelsService.syncAllChannels();
            this.logger.log(`Sync completed: ${JSON.stringify(results)}`);
        }
        catch (err) {
            this.logger.error(`Sync failed: ${err.message}`);
        }
    }
};
exports.SyncService = SyncService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_12_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyncService.prototype, "syncAllChannels", null);
exports.SyncService = SyncService = SyncService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [channels_service_1.ChannelsService])
], SyncService);
//# sourceMappingURL=sync.service.js.map