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
exports.FrontController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const front_service_1 = require("./front.service");
let FrontController = class FrontController {
    constructor(frontService) {
        this.frontService = frontService;
    }
    getPage(page) {
        return this.frontService.getPage(page);
    }
};
__decorate([
    (0, common_1.Get)(':page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FrontController.prototype, "getPage", null);
FrontController = __decorate([
    (0, swagger_1.ApiTags)('Front'),
    (0, common_1.Controller)('/public'),
    __metadata("design:paramtypes", [front_service_1.FrontService])
], FrontController);
exports.FrontController = FrontController;
//# sourceMappingURL=front.controller.js.map