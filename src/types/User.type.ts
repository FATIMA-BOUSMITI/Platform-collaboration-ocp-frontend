
export interface User{
     id: string;
     email: string;
     enabled: boolean;
     accountLocked: boolean,
     lastLogin: null,
     createdAt: Date,
     roleNames:  string[] 
}