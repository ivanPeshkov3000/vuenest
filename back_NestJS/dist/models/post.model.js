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
exports.Post = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const user_model_1 = require("./user.model");
const user_post_model_1 = require("./user_post.model");
let Post = class Post extends sequelize_typescript_1.Model {
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
], Post.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/hello_world', description: 'Локальный адрес поста' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], Post.prototype, "uri", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1.01.1997', description: 'Дата поста' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], Post.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Привет мир!', description: 'Заголовок поста' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/static/md/hello_world.md', description: 'Локальная ссылка на md-файл поста' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Авторы поста' }),
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.User, () => user_post_model_1.UserPost),
    __metadata("design:type", Array)
], Post.prototype, "author", void 0);
Post = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'posts' })
], Post);
exports.Post = Post;
//# sourceMappingURL=post.model.js.map