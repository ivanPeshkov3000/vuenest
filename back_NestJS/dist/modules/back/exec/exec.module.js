"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecModule = void 0;
const common_1 = require("@nestjs/common");
const exec_service_1 = require("./exec.service");
const exec_resolver_1 = require("./exec.resolver");
let ExecModule = class ExecModule {
};
ExecModule = __decorate([
    (0, common_1.Module)({
        providers: [exec_resolver_1.ExecResolver, exec_service_1.ExecService]
    })
], ExecModule);
exports.ExecModule = ExecModule;
//# sourceMappingURL=exec.module.js.map