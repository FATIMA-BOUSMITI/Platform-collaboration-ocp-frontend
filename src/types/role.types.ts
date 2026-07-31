export interface Role {
  id: string;
  name: string;
  description: string;
  color?: string; //a supprimer apres 
  usersCount?: number; // a supprimer
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