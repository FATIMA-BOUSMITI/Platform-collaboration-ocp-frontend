import "./styles/Sidebar.css";

import {
  MdOutlineDashboard,
  MdBusiness,
  MdOutlineLogout,
  MdOutlineClose
} from "react-icons/md";

import { RiTeamFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";
import { FiBell } from "react-icons/fi";
import { FaRegMessage } from "react-icons/fa6";
import { FaRegFolder } from "react-icons/fa6";
import { LuKanban } from "react-icons/lu";
interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}



function Managersidebar({ isOpen, onClose,onLogout }: SidebarProps) {
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

          <SidebarSection title="TABLEAU DE BORD" />

      <SidebarItem
        to="/dashboard"
        icon={<MdOutlineDashboard />}
        label="Vue d'ensemble"
        onClick={onClose}
      />

      <SidebarSection title="MON ÉQUIPE" />

      <SidebarItem
        to="/teams"
        icon={<RiTeamFill/>}
        label="Membres"
        onClick={onClose}
      />
      
      

      <SidebarSection title="Projets" />

      <SidebarItem
        to="/projets"
        icon={<LuKanban />}
        label="Gestion Kanban"
        onClick={onClose}
      />
      <SidebarSection title="RESSOURCES" />

      <SidebarItem
        to="/documents"
        icon={<FaRegFolder />}
        label="Documents"
        onClick={onClose}
      />
      

      <SidebarSection title="COMMUNICATION" />

      <SidebarItem
        to="/messages"
        icon={<FaRegMessage/>}
        label="Messagerie"
        onClick={onClose}
      />
      <SidebarItem
        to="/notifications"
        icon={<FiBell/>}
        label="Notifications"
        onClick={onClose}
      />
     
      
     {/*<SidebarSection title=" MONITORING" />
      <SidebarItem
        to="/logs"
        icon={<FiClock />}
        label="Logs"
        onClick={onClose}
      />
      <SidebarItem
        to="/metrics"
        icon={<FiActivity />}
        label="Metrics"
        onClick={onClose}
      />
      <SidebarItem
        to="/alerts"
        icon={<FiAlertTriangle />}
        label="Alertes"
        onClick={onClose}
      />*/}

      <SidebarSection title=" COMPTE" />
      <SidebarItem
        to="/profile"
        icon={<FaRegUser />}
        label="Profile"
        onClick={onClose}
      />


     

        </nav>

      </div>

      {/* Bas */}
      <div className="sidebar-bottom">
        <button className="logout-button" onClick={onLogout}>
          <MdOutlineLogout />
          Déconnexion
        </button>
      </div>


    </aside>
  );
}

export default Managersidebar;