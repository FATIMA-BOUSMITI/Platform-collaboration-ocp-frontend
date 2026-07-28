import "./styles/Sidebar.css";

import {
  MdOutlineDashboard,
  MdBusiness,
  MdOutlineLogout,
  MdOutlineClose
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { RiTeamFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FiShield } from "react-icons/fi";

import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";
import { FiClock } from "react-icons/fi";
import { FiActivity } from "react-icons/fi";
import { FiAlertTriangle } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiDatabase } from "react-icons/fi";
import { FiShieldOff } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}



function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>

      {/* Haut */}
      <div className="sidebar-top">

        <div className="sidebar-header">
          <img
            src="/ocp-logo.png"
            alt="OCP"
            className="sidebar-logo"
          />

          <button
            className="close-button"
            onClick={onClose}
          >
            <MdOutlineClose />
          </button>
        </div>

        {/* Zone qui peut défiler */}
        <nav className="sidebar-menu">

          <SidebarSection title="DASHBOARD" />

      <SidebarItem
        to="/dashboard"
        icon={<MdOutlineDashboard />}
        label="Dashboard"
      />

      <SidebarSection title="USERS" />

      <SidebarItem
        to="/users"
        icon={<FiUsers/>}
        label="Liste des utilisateurs"
      />
      <SidebarItem
        to="/profile"
        icon={<FaRegUser />}
        label="Profile"
      />
      

      <SidebarSection title="ORGANISATION" />

      <SidebarItem
        to="/departments"
        icon={<MdBusiness />}
        label="Départements"
      />
      <SidebarItem
        to="/teams"
        icon={<RiTeamFill/>}
        label="Équipes"
      />

      <SidebarSection title="SECURITY" />

      <SidebarItem
        to="/roles"
        icon={<FiShield />}
        label="Rôles"
      />
      <SidebarItem
        to="/permissions"
        icon={<FiShieldOff />}
        label="Permissions"
      />
     

      <SidebarItem
        to="/sessions"
        icon={<FiShield />}
        label="Sessions"
      />
      <SidebarSection title=" MONITORING" />
      <SidebarItem
        to="/logs"
        icon={<FiClock />}
        label="Logs"
      />
      <SidebarItem
        to="/metrics"
        icon={<FiActivity />}
        label="Metrics"
      />
      <SidebarItem
        to="/alerts"
        icon={<FiAlertTriangle />}
        label="Alertes"
      />

      <SidebarSection title=" SETTINGS" />
      <SidebarItem
        to="/settings"
        icon={<FiSettings />}
        label="General"
      />
      <SidebarItem
        to="/notifications"
        icon={<FiBell />}
        label="Notifications"
      />
       <SidebarItem
        to="/backup"
        icon={<FiDatabase />}
        label="Backup"
      />


     

        </nav>

      </div>

      {/* Bas */}
       <div className="sidebar-bottom">
    <button className="logout-button">
      <MdOutlineLogout />
      Déconnexion
    </button>
  </div>


    </aside>
  );
}

export default Sidebar;