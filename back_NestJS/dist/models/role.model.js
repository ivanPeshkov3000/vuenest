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
exports.Role = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const user_model_1 = require("./user.model");
const user_roles_model_1 = require("./user_roles.model");
let Role = class Role extends sequelize_typescript_1.Model {
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
], Role.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['Admin', 'Moderator', 'User'],
        description: 'Название роли',
    }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Администратор', description: 'Описание роли' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Role.prototype, "desc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['r', 'w', 'rw'], description: 'Права роли' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('r', 'w', 'rw') }),
    __metadata("design:type", Array)
], Role.prototype, "rights", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Область роли' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING) }),
    __metadata("design:type", Array)
], Role.prototype, "scope", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.User, () => user_roles_model_1.UserRole),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
Role = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'roles1', createdAt: false, updatedAt: false })
], Role);
exports.Role = Role;
//# sourceMappingURL=role.model.js.map