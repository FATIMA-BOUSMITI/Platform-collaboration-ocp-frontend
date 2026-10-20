import { create } from "zustand";
export const usePreferences=create<{language:string;timezone:string;set:(p:{language:string;timezone:string})=>void}>(set=>({language:"fr",timezone:"UTC",set:p=>set(p)}));
