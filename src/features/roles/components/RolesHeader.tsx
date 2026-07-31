import { FiUsers } from "react-icons/fi";
import RoleStats from "./RoleStats"

import "../styles/RolesHeader.css";

interface HeaderProps{
    usersTotale:number ;
}

function RolesHeader({usersTotale}:HeaderProps){

  return (
    <div className="roles-header">

      <div className="roles-header-left">

        <div className="roles-icon">
          <FiUsers />
        </div>

        <div>

          <h1>Gestion des rôles</h1>

          <p>
                   {usersTotale} utilisateurs · Vue Administrateur
          </p>

        </div>

      </div>

      <RoleStats />

    </div>
  );

}

export default RolesHeader;