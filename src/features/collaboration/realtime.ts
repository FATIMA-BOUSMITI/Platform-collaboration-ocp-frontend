import { create } from "zustand";
export interface RealtimeSignal {kind:string;conversationId?:string;messageId?:string;userId?:string;notification?:{id:string;title:string;body:string;link:string;read:boolean;createdAt:string;type:string};}
export const useRealtime=create<{connected:boolean;signal:RealtimeSignal|null;setConnected:(value:boolean)=>void;receive:(signal:RealtimeSignal)=>void}>(set=>({connected:false,signal:null,setConnected:connected=>set({connected}),receive:signal=>set({signal})}));
const listeners=new Set<(signal:RealtimeSignal)=>void>();
export function dispatchRealtime(signal:RealtimeSignal){useRealtime.getState().receive(signal);for(const listener of listeners)listener(signal);}
export function subscribeRealtime(listener:(signal:RealtimeSignal)=>void){listeners.add(listener);return()=>{listeners.delete(listener);};}
