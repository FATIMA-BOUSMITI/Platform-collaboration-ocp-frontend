import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { useAuthStore, decodeUserFromToken } from "../features/auth/AuthStore";
const baseURL=import.meta.env.VITE_API_URL || "http://localhost:9000/api";
type ManagedConfig=InternalAxiosRequestConfig & {_sessionToken?:string;_sessionRefreshToken?:string|null;_retried?:boolean};
const axiosClient=axios.create({baseURL,timeout:30000,headers:{"Content-Type":"application/json"}});
const publicPaths=["/auth/login","/auth/refresh-token","/auth/forgot-password","/auth/reset-password"];
let refreshing:Promise<string>|null=null;
async function refresh():Promise<string>{
 if(!refreshing){
  const previous=useAuthStore.getState();
  refreshing=(async()=>{
   try{
    if(!previous.refreshToken){if(useAuthStore.getState().accessToken===previous.accessToken)useAuthStore.getState().logout();throw new Error("Session expirée. Reconnectez-vous.");}
    const {data}=await axios.post(baseURL+"/auth/refresh-token",{refreshToken:previous.refreshToken},{timeout:15000});
    if(useAuthStore.getState().refreshToken!==previous.refreshToken)throw new Error("La session a changé.");
    useAuthStore.getState().login(data.accessToken,data.refreshToken,previous.role||"");return data.accessToken;
   
   }catch(error){
    const status=axios.isAxiosError(error)?error.response?.status:undefined;
    // Only an explicit rejection by the authentication service invalidates the session.
    // Network failures, timeouts and server errors remain retryable without losing credentials.
    if(status!==undefined && [401,403,423].includes(status) && useAuthStore.getState().refreshToken===previous.refreshToken)useAuthStore.getState().logout();
    throw error;
   }
  })().finally(()=>{refreshing=null;});
 }
 return refreshing;
}
axiosClient.interceptors.request.use(async config=>{
 if(publicPaths.includes(config.url||"")){config.headers.delete("Authorization");return config;}
 if(!config.headers.has("Authorization")){
  let token=useAuthStore.getState().accessToken;
  if(token){if(decodeUserFromToken(token).exp*1000<=Date.now()+10000)token=await refresh();config.headers.set("Authorization","Bearer "+token);(config as ManagedConfig)._sessionToken=token;(config as ManagedConfig)._sessionRefreshToken=useAuthStore.getState().refreshToken;}
 }
 return config;
});
type RetryConfig=ManagedConfig;
axiosClient.interceptors.response.use(response=>response,async error=>{
 const config=error.config as RetryConfig|undefined;

 // A resource can reject a request even when authentication and refresh succeeded.
 // Surface that resource error instead of signing the user out of the whole application.
 if(config?._sessionToken && config._sessionRefreshToken!==useAuthStore.getState().refreshToken)return Promise.reject(error);
 if(error.response?.status===401 && config && config._sessionToken && !config._retried && !publicPaths.includes(config.url||"")){
  config._retried=true;
  const current=useAuthStore.getState().accessToken;
  const sent=String(config.headers.get("Authorization")||"").replace(/^Bearer /,"");
  if(current && sent!==current){config.headers.set("Authorization","Bearer "+current);return axiosClient(config);}
  const token=await refresh();config.headers.set("Authorization","Bearer "+token);return axiosClient(config);
 }
 return Promise.reject(error);
});

export async function getValidAccessToken():Promise<string>{const token=useAuthStore.getState().accessToken;if(!token)throw new Error("Connexion requise");return decodeUserFromToken(token).exp*1000<=Date.now()+30000?refresh():token;}
export default axiosClient;
