import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("../../models/role.model").Role>;
    getAllRoles(): Promise<import("../../models/role.model").Role[]>;
    getRoleByName(name: string): Promise<import("../../models/role.model").Role>;
    updRole(id: string, updateRoleDto: UpdateRoleDto): Promise<[affectedCount: number]>;
    delRole(id: string): Promise<number>;
}
