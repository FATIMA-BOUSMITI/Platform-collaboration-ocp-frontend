import { FiMenu } from "react-icons/fi";
import { useAuthStore, getCurrentUserDisplayInfo } from "../features/auth/AuthStore";
import "./styles/Header.css";

interface HeaderProps {
  onToggleSidebar: () => void;
}

function Header({ onToggleSidebar }: HeaderProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { displayName, initials } = getCurrentUserDisplayInfo(accessToken);

  return (
    <header className="header">

      <div className="header-left">
        <button
          className="menu-button"
          onClick={onToggleSidebar}
        >
          <FiMenu />
        </button>

        <img
          src="/ocp-logo.png"
          alt="Logo OCP"
          className="header-logo"
        />
      </div>

      <div className="header-right">
        <div className="header-user" title={displayName}>
          <div className="header-avatar">{initials}</div>
          <span>{displayName}</span>
        </div>
      </div>

    </header>
  );
}

export default Header;