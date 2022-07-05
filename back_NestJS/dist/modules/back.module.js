"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const roles_module_1 = require("./roles/roles.module");
const users_module_1 = require("./users/users.module");
const user_model_1 = require("../models/user.model");
const role_model_1 = require("../models/role.model");
const user_roles_model_1 = require("../models/user_roles.model");
const auth_module_1 = require("./auth/auth.module");
const posts_module_1 = require("./posts/posts.module");
const post_model_1 = require("../models/post.model");
const user_post_model_1 = require("../models/user_post.model");
let BackModule = class BackModule {
};
BackModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAMEDB,
                autoLoadModels: true,
                models: [user_model_1.User, role_model_1.Role, user_roles_model_1.UserRole, post_model_1.Post, user_post_model_1.UserPost],
            }),
            roles_module_1.RolesModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            posts_module_1.PagesModule
        ],
    })
], BackModule);
exports.BackModule = BackModule;
//# sourceMappingURL=back.module.js.map