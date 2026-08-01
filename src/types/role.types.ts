

export interface UserRole {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: Roles;
  enabled: boolean;
}

export interface Roles{
   id: string;
  name: string;
  description: string;
}

export interface RoleCount {
  roleName: string;
  userCount: number;
}