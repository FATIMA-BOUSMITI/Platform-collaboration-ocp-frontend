import { FiMenu } from "react-icons/fi";
import "./styles/Header.css";

interface HeaderProps {
  onToggleSidebar: () => void;
}

function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="header">

      <div className="header-left">
        <button
          className="menu-button"
          onClick={onToggleSidebar}
        >
          <FiMenu />
        </button>""

        <img
          src="/ocp-logo.png"
          alt="Logo OCP"
          className="header-logo"
        />
      </div>

      <div className="header-right">

        <div className="header-avatar">
          AD
        </div>
      </div>

    </header>
  );
}

export default Header;