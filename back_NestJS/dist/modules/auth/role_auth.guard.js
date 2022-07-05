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
exports.RoleAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const roles_auth_decorator_1 = require("./roles-auth.decorator");
let RoleAuthGuard = class RoleAuthGuard {
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        try {
            const requiredRoles = this.reflector.getAllAndOverride(roles_auth_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
            if (!requiredRoles)
                return true;
            const authHeader = req.headers.authorization;
            if (!authHeader)
                throw new common_1.HttpException({ message: 'В запросе отсутствует заголовок авторизации' }, common_1.HttpStatus.BAD_REQUEST);
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer != 'Bearer' || !token)
                throw new common_1.UnauthorizedException({ message: 'Неверный токен' });
            const user = this.jwtService.verify(token);
            req.user = user;
            console.log("USER: ", user);
            return user.roles.some((role) => requiredRoles.includes(role.name));
        }
        catch (error) {
            throw new common_1.HttpException(`Нет доступа. ${error.message}`, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
RoleAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, core_1.Reflector])
], RoleAuthGuard);
exports.RoleAuthGuard = RoleAuthGuard;
//# sourceMappingURL=role_auth.guard.js.map