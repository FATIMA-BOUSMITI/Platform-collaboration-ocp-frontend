import type { Role } from "./role.types";

export interface Departement {
  id: string;
  name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photoUrl?: string | null;
  position?: string;
  managerId?: string | null;
  language?: string | null;
  timezone?: string | null;
  roles?: Role[] | Role | null;
  departement?: Departement | null;
  enabled?: boolean;
  roleNames?: string[];
}