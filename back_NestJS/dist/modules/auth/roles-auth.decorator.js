"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const role_auth_guard_1 = require("./role_auth.guard");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.ROLES_KEY, roles), (0, common_1.UseGuards)(role_auth_guard_1.RoleAuthGuard));
exports.Roles = Roles;
//# sourceMappingURL=roles-auth.decorator.js.map