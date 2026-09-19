import "./styles/Sidebar.css";

import { MdOutlineClose, MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { FiBell, FiUsers } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";

import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}

function DirectorSidebar({ isOpen, onClose, onLogout }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-header">
          <img src="/ocp-logo.png" alt="OCP" className="sidebar-logo" />
          <button className="close-button" onClick={onClose} aria-label="Fermer le menu">
            <MdOutlineClose />
          </button>
        </div>

        <nav className="sidebar-menu">
          <SidebarSection title="TABLEAU DE BORD" />
          <SidebarItem to="/director" icon={<MdOutlineDashboard />} label="Vue d'ensemble" onClick={onClose} />

          <SidebarSection title="ORGANISATION" />
          <SidebarItem to="/teams" icon={<RiTeamFill />} label="Équipes" onClick={onClose} />
          <SidebarItem to="/users" icon={<FiUsers />} label="Collaborateurs" onClick={onClose} />
          <SidebarItem to="/kanban" icon={<RiTeamFill />} label="Projets et tâches" onClick={onClose} />

          <SidebarSection title="RESSOURCES" />
          <SidebarItem to="/documents" icon={<FaRegFolder />} label="Documents" onClick={onClose} />

          <SidebarSection title="COMMUNICATION" />
          <SidebarItem to="/messages" icon={<FaRegMessage />} label="Messagerie" onClick={onClose} />
          <SidebarItem to="/notifications" icon={<FiBell />} label="Notifications" onClick={onClose} />

          <SidebarSection title="COMPTE" />
          <SidebarItem to="/profile" icon={<FaRegUser />} label="Profil" onClick={onClose} />
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button className="logout-button" onClick={onLogout}>
          <MdOutlineLogout />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

export default DirectorSidebar;