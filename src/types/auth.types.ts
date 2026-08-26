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


export interface UserProfile {

     id: String;
     email: String;
     enabled: boolean;
     accountLocked: boolean;
     lastLogin: Date | null;
     createdAt: Date;
     roleNames: string[];
     
}


