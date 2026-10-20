import { useCallback,useEffect } from "react";
import { useBlocker,useBeforeUnload } from "react-router-dom";
export function useUnsavedChanges(dirty:boolean){
 const blocker=useBlocker(dirty);
 useEffect(()=>{if(blocker.state==="blocked"){if(window.confirm("Des modifications ne sont pas enregistrées. Quitter cette page ?"))blocker.proceed();else blocker.reset();}},[blocker]);
 useBeforeUnload(useCallback((event:BeforeUnloadEvent)=>{if(dirty){event.preventDefault();event.returnValue="";}},[dirty]));
}
