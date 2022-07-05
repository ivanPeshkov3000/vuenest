"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const post_model_1 = require("../../../models/post.model");
const user_model_1 = require("../../../models/user.model");
const user_post_model_1 = require("../../../models/user_post.model");
const posts_controller_1 = require("./posts.controller");
const posts_service_1 = require("./posts.service");
let PagesModule = class PagesModule {
};
PagesModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([post_model_1.Post, user_model_1.User, user_post_model_1.UserPost])],
        controllers: [posts_controller_1.PostsController],
        providers: [posts_service_1.PostsService]
    })
], PagesModule);
exports.PagesModule = PagesModule;
//# sourceMappingURL=posts.module.js.map