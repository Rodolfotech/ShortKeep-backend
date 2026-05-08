"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShortDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_short_dto_1 = require("./create-short.dto");
class UpdateShortDto extends (0, mapped_types_1.PartialType)(create_short_dto_1.CreateShortDto) {
}
exports.UpdateShortDto = UpdateShortDto;
//# sourceMappingURL=update-short.dto.js.map