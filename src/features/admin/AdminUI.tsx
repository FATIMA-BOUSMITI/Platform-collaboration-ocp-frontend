import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
export function Page({title,description,children,actions}:{title:string;description?:string;children:ReactNode;actions?:ReactNode}){return <section className="admin-page"><header className="admin-page-header"><div><h1>{title}</h1>{description&&<p>{description}</p>}</div>{actions}</header>{children}</section>;}
export function Feedback({error,success}:{error?:string;success?:string}){return <>{error&&<p className="admin-feedback error" role="alert">{error}</p>}{success&&<p className="admin-feedback success" role="status">{success}</p>}</>;}
export function Empty({children}:{children:ReactNode}){return <p className="admin-empty">{children}</p>;}
export function Modal({title,children,onClose,busy=false}:{title:string;children:ReactNode;onClose:()=>void;busy?:boolean}){
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const previous=document.activeElement as HTMLElement|null;const d=ref.current;d?.showModal();return()=>{d?.close();previous?.focus();};},[]);
 return <dialog ref={ref} className="admin-modal" aria-label={title} onCancel={e=>{e.preventDefault();if(!busy)onClose();}} onKeyDown={e=>{if(e.key!=="Tab")return;const items=Array.from(ref.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')||[]);if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}><header><h2>{title}</h2><button type="button" aria-label="Fermer" disabled={busy} onClick={onClose}>×</button></header>{children}</dialog>;
}

