import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
export interface DecodedUser {sub:string;userId:string;role?:string;type:string;iat:number;exp:number;sessionId?:string;email?:string;fullName?:string;firstName?:string;lastName?:string;name?:string;}
export function decodeUserFromToken(token:string):DecodedUser {
 const user=jwtDecode<DecodedUser>(token);
 if(!user.userId || user.type!=="ACCESS" || !Number.isFinite(user.exp))throw new Error("Session invalide");
 return user;
}
export function normalizeRole(role:string){const value=role.replace(/^ROLE_/i,"").toUpperCase();return ["ADMINISTRATOR","ADMINISTRATEUR"].includes(value)?"ADMIN":value;}
interface AuthState {accessToken:string|null;refreshToken:string|null;role:string|null;user:DecodedUser|null;isAuthenticated:boolean;login:(access:string,refresh:string,role:string)=>void;logout:()=>void;}
function initial(){
 try{const accessToken=localStorage.getItem("accessToken"),refreshToken=localStorage.getItem("refreshToken");
  if(accessToken){const user=decodeUserFromToken(accessToken);if(user.exp*1000>Date.now()||refreshToken)return {accessToken,refreshToken,user,role:normalizeRole(user.role||localStorage.getItem("role")||""),isAuthenticated:true};}
 }catch{/* Invalid persisted sessions are cleared before rendering. */}
 for(const key of ["accessToken","refreshToken","role"])localStorage.removeItem(key);
 return {accessToken:null,refreshToken:null,user:null,role:null,isAuthenticated:false};
}
export const useAuthStore=create<AuthState>((set)=>({...initial(),
 login:(access,refresh,role)=>{const user=decodeUserFromToken(access);const normalized=normalizeRole(user.role||role);localStorage.setItem("accessToken",access);localStorage.setItem("refreshToken",refresh);localStorage.setItem("role",normalized);set({accessToken:access,refreshToken:refresh,role:normalized,user,isAuthenticated:true});},
 logout:()=>{for(const key of ["accessToken","refreshToken","role"])localStorage.removeItem(key);set({accessToken:null,refreshToken:null,role:null,user:null,isAuthenticated:false});}
}));
window.addEventListener("storage",event=>{if(event.key==="accessToken"||event.key==="refreshToken")useAuthStore.setState(initial());});


export function getCurrentUserDisplayInfo(accessToken:string|null):{displayName:string;initials:string;email:string}{
 if(!accessToken)return {displayName:"Utilisateur",initials:"U",email:""};
 try{const decoded=decodeUserFromToken(accessToken);const fullName=[decoded.firstName,decoded.lastName].filter(Boolean).join(" ")||decoded.fullName||decoded.name||"";const email=decoded.email||decoded.sub||"";const displayName=fullName||email||"Utilisateur";const initials=fullName?fullName.split(/\s+/).slice(0,2).map(part=>part[0]).join("").toUpperCase():displayName.slice(0,2).toUpperCase();return {displayName,initials,email};}catch{return {displayName:"Utilisateur",initials:"U",email:""};}
}
