import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { adminApi,errorMessage } from "../../../api/adminApi";
import type { Activity } from "../../../api/adminApi";
export default function RecentActivity({to="/activity"}:{to?:string}){const [items,setItems]=useState<Activity[]>([]),[error,setError]=useState("");useEffect(()=>{adminApi.activity().then(setItems).catch(e=>setError(errorMessage(e)));},[]);return <section><h2>Activité récente</h2>{error&&<p role="alert">{error}</p>}{items.map(i=><p key={i.id}>{i.email} · {i.success?"Connexion réussie":"Connexion échouée"}</p>)}<Link to={to||"/activity"}>Voir tout</Link></section>;}
