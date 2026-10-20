import { create } from "zustand";
import { useAuthStore } from "../auth/AuthStore";
import { notificationApi } from "../../api/notificationApi";
export const useUnreadCount=create<{count:number;set:(count:number)=>void}>(set=>({count:0,set:count=>set({count})}));
export async function refreshUnreadCount(){const user=useAuthStore.getState().user?.userId;if(!user)return;const count=await notificationApi.count();if(useAuthStore.getState().user?.userId===user)useUnreadCount.getState().set(count);}
