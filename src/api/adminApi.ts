import api from "./axiosClient";
import { isAxiosError } from "axios";
export function errorMessage(error:unknown){if(isAxiosError(error)){if(error.response?.status===403)return "Accès refusé. Vos droits ne permettent pas cette action.";if(error.response?.status===401)return "Session expirée. Reconnectez-vous.";return error.response?.data?.message || error.response?.data?.detail || "Le serveur n’a pas pu traiter la demande.";}return error instanceof Error?error.message:"Une erreur est survenue.";}
export interface Session {id:string;email:string;userId:string;createdAt:string;expiresAt:string;active:boolean;}
export interface Activity {id:string;email:string;date:string;success:boolean;device:string;ipAddress:string;}
export interface Notice {id:string;message:string;createdAt:string;read:boolean;}
export interface Team {id:string;name:string;departmentId:string;department:string;responsableId:string|null;chief:string;objective:string;active:boolean;memberIds:string[];}
export interface TeamRequest {name:string;departmentId:string;responsableId:string|null;objective:string;active:boolean;}
export const adminApi={
 stats:async()=>(await api.get<Record<string,number>>("/auth/admin/stats")).data,
 activity:async()=>(await api.get<Activity[]>("/auth/admin/activity")).data,
 sessions:async()=>(await api.get<Session[]>("/auth/admin/sessions")).data,
 revoke:async(id:string)=>{await api.delete("/auth/admin/sessions/"+id);},
 settings:async()=>(await api.get<{language:string;timezone:string}>("/auth/admin/settings")).data,
 saveSettings:async(value:{language:string;timezone:string})=>(await api.put("/auth/admin/settings",value)).data,
 notices:async()=>(await api.get<Notice[]>("/auth/admin/notifications")).data,
 read:async(id:string)=>{await api.patch("/auth/admin/notifications/"+id+"/read");},
 teams:async()=>(await api.get<Team[]>("/users/teams")).data,
 saveTeam:async(value:TeamRequest,id?:string)=>(id?await api.put<Team>("/users/teams/"+id,value):await api.post<Team>("/users/teams",value)).data,
 deleteTeam:async(id:string)=>{await api.delete("/users/teams/"+id);},
 member:async(id:string,userId:string,add:boolean)=>(add?await api.put<Team>("/users/teams/"+id+"/members/"+userId):await api.delete<Team>("/users/teams/"+id+"/members/"+userId)).data,
};
