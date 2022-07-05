"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecService = void 0;
const common_1 = require("@nestjs/common");
let ExecService = class ExecService {
    create(createExecInput) {
        return 'This action adds a new exec';
    }
    findAll() {
        return `This action returns all exec`;
    }
    findOne(id) {
        return `This action returns a #${id} exec`;
    }
    update(id, updateExecInput) {
        return `This action updates a #${id} exec`;
    }
    remove(id) {
        return `This action removes a #${id} exec`;
    }
    getCommands(query) {
        const pool = [];
        for (const command in query) {
            pool.push(this.printCommand(command, query[command]));
        }
        let send = "";
        pool.forEach(str => send += `<br/>${str}`);
        return send;
    }
    printCommand(command, value) {
        console.log(command, value);
        return `<span>Command <i>${command}</i> exec, value: <b>${value}</b></span>`;
    }
};
ExecService = __decorate([
    (0, common_1.Injectable)()
], ExecService);
exports.ExecService = ExecService;
//# sourceMappingURL=exec.service.js.map