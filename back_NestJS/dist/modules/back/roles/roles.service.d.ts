import { Repository } from 'sequelize-typescript';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/models/role.model';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    createRole(dto: CreateRoleDto): Promise<Role>;
    getAllRoles(): Promise<Role[]>;
    getRoleByName(name: string): Promise<Role>;
    updateRole(id: number, opts: UpdateRoleDto): Promise<[affectedCount: number]>;
    deleteRole(id: number): Promise<number>;
}
