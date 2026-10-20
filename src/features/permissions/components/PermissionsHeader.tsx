 import { FiSave } from "react-icons/fi";
import DashboardHeader from "../../dashboard/components/DashboardHeader";
import "../styles/PermissionsHeader.css";

 interface Props{
    onSave?:()=>void ;
    saving?: boolean;
 }
export default function PermissionsHeader( props:Props) {

    return(
    <div className="permissions-header"> 
          <DashboardHeader title="Matrice des Permissions" subtitle="Définissez les droits d'accès granulaires pour chaque rôle du système." />
           <button
        className="save-permissions-btn"
        onClick={props.onSave}
             disabled={props.saving}
           >
             <FiSave size={20} />
             <span>{props.saving ? "Enregistrement..." : "Enregistrer les modifications"}</span>
      </button>
     </div>);
}