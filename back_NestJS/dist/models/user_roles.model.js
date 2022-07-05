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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const role_model_1 = require("./role.model");
const user_model_1 = require("./user.model");
let UserRole = class UserRole extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Уникальный идентификатор' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], UserRole.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id роли' }),
    (0, sequelize_typescript_1.ForeignKey)(() => role_model_1.Role),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], UserRole.prototype, "role_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id пользователя' }),
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], UserRole.prototype, "user_id", void 0);
UserRole = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'user_roles' })
], UserRole);
exports.UserRole = UserRole;
//# sourceMappingURL=user_roles.model.js.map