export interface LoginRequest {

  email: string;
  password: string;

}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface JwtPayload{
    sub: string;
    userId: string;
    type: string;
    iat: number;
    exp: number;
  
}


export interface RoleRef {
  id?: string;
  name?: string;
  description?: string;
}

    id: string;
    email: string;
     enabled: boolean;
     accountLocked: boolean;
     lastLogin: Date | null;
     createdAt: Date;
    roleNames?: string[] | string;
    roleName?: string;
    role?: string;
    roles?: string[] | string;
     
export interface UserProfile {
  id?: string;
  userId?: string;
  email?: string;
  enabled?: boolean;
  accountLocked?: boolean;
  lastLogin?: Date | null;
  createdAt?: Date;
  roleNames?: string[];
  roles?: RoleRef[];
}


