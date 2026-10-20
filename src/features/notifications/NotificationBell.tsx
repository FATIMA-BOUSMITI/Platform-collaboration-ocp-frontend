import { Link } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { useUnreadCount } from "./inbox";
export default function NotificationBell() {
  const count = useUnreadCount((s) => s.count);
  return (
    <Link
      to="/notifications"
      className="notification-bell"
      aria-label={
        count ? count + " notification(s) non lue(s)" : "Notifications"
      }
    >
      <FiBell />
      {count > 0 && <span>{count > 99 ? "99+" : count}</span>}
    </Link>
  );
}
