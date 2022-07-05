"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFrontDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_front_dto_1 = require("./create-front.dto");
class UpdateFrontDto extends (0, swagger_1.PartialType)(create_front_dto_1.CreateFrontDto) {
}
exports.UpdateFrontDto = UpdateFrontDto;
//# sourceMappingURL=update-front.dto.js.map