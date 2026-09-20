export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface UserRole {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: Role;
  enabled: boolean;
}

export interface Roles {
  id: string;
  name: string;
  description: string;
}

export type Role = Roles;

export interface RoleCount {
  roleName: string;
  userCount: number;
}