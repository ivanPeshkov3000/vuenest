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
exports.ExecResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const exec_service_1 = require("./exec.service");
const exec_entity_1 = require("./entities/exec.entity");
const create_exec_input_1 = require("./dto/create-exec.input");
const update_exec_input_1 = require("./dto/update-exec.input");
const privateApiCommand_dto_1 = require("./dto/privateApiCommand.dto");
let ExecResolver = class ExecResolver {
    constructor(execService) {
        this.execService = execService;
    }
    getCommand(query) {
        return this.execService.getCommands(query);
    }
    createExec(createExecInput) {
        return this.execService.create(createExecInput);
    }
    findAll() {
        return this.execService.findAll();
    }
    findOne(id) {
        return this.execService.findOne(id);
    }
    updateExec(updateExecInput) {
        return this.execService.update(updateExecInput.id, updateExecInput);
    }
    removeExec(id) {
        return this.execService.remove(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Какой-то запрос' }),
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [privateApiCommand_dto_1.CommandDto]),
    __metadata("design:returntype", String)
], ExecResolver.prototype, "getCommand", null);
__decorate([
    (0, graphql_1.Mutation)(() => exec_entity_1.Exec),
    __param(0, (0, graphql_1.Args)('createExecInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exec_input_1.CreateExecInput]),
    __metadata("design:returntype", void 0)
], ExecResolver.prototype, "createExec", null);
__decorate([
    (0, graphql_1.Query)(() => [exec_entity_1.Exec], { name: 'exec' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExecResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => exec_entity_1.Exec, { name: 'exec' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExecResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => exec_entity_1.Exec),
    __param(0, (0, graphql_1.Args)('updateExecInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_exec_input_1.UpdateExecInput]),
    __metadata("design:returntype", void 0)
], ExecResolver.prototype, "updateExec", null);
__decorate([
    (0, graphql_1.Mutation)(() => exec_entity_1.Exec),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExecResolver.prototype, "removeExec", null);
ExecResolver = __decorate([
    (0, swagger_1.ApiTags)('Exec'),
    (0, graphql_1.Resolver)(() => exec_entity_1.Exec),
    __metadata("design:paramtypes", [exec_service_1.ExecService])
], ExecResolver);
exports.ExecResolver = ExecResolver;
//# sourceMappingURL=exec.resolver.js.map