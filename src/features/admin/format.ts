import { usePreferences } from "./preferences";
export function date(value:string){const p=usePreferences.getState();return new Date(value).toLocaleString(p.language==="en"?"en-GB":"fr-FR",{timeZone:p.timezone});}
