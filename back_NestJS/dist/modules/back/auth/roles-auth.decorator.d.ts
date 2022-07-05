export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: string[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
