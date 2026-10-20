import { useAuthStore } from "../auth/AuthStore";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiBell, FiCheck, FiTrash2 } from "react-icons/fi";
import { useUnreadCount, refreshUnreadCount } from "./inbox";
import { notificationApi } from "../../api/notificationApi";
import type { Notification } from "../../api/notificationApi";
import { errorMessage } from "../../api/adminApi";
import { subscribeRealtime } from "../collaboration/realtime";
import {
  NotificationIcon,
  notificationCategories,
  notificationLabel,
  notificationLink,
} from "./presentation";
import "./Notifications.css";
export default function NotificationBell(){const userId=useAuthStore(s=>s.user?.userId);return <NotificationPreview key={userId}/>;}
function NotificationPreview() {
  const count = useUnreadCount((s) => s.count),
    [open, setOpen] = useState(false),
    [items, setItems] = useState<Notification[]>([]),
    [category, setCategory] = useState("ALL"),
    [loading, setLoading] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const root = useRef<HTMLDivElement>(null),
    trigger = useRef<HTMLButtonElement>(null),
    sequence = useRef(0),
    id = useId(),
    location = useLocation();
  const reload = useCallback(async () => {
    const request = ++sequence.current;
    setLoading(true);
    try {
      const [data] = await Promise.all([
        notificationApi.list(false, 0, category),
        refreshUnreadCount(),
      ]);
      if (request === sequence.current) {
        setItems(data.slice(0, 6));
        setError("");
      }
    } catch (e) {
      if (request === sequence.current) setError(errorMessage(e));
    } finally {
      if (request === sequence.current) setLoading(false);
    }
  }, [category]);
  useEffect(() => {
    if (open) void reload();
    return () => {
      sequence.current++;
    };
  }, [open, reload]);
  useEffect(
    () =>
      subscribeRealtime((signal) => {
        if (
          open &&
          ["notification", "notification-state", "connected"].includes(
            signal.kind,
          )
        )
          void reload();
      }),
    [open, reload],
  );
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search, location.hash]);
  useEffect(() => {
    if (!open) return;
    function outside(e: MouseEvent) {
      if (root.current && !root.current.contains(e.target as Node))
        setOpen(false);
    }
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  async function remove(n: Notification) {
    setBusy(true);
    try {
      await notificationApi.delete(n.id);
      await Promise.all([reload(), refreshUnreadCount()]);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="notification-widget" ref={root}>
      <button
        ref={trigger}
        className="notification-bell"
        aria-label={count ? count + " notifications non lues" : "Notifications"}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <FiBell />
        {count > 0 && <span>{count > 99 ? "99+" : count}</span>}
      </button>
      {open && (
        <section
          id={id}
          className="notification-popover"
          role="dialog"
          aria-modal="false"
          aria-label="Notifications récentes"
        >
          <header>
            <div>
              <h2>Notifications</h2>
              <p>{count} non lue(s)</p>
            </div>
            <button
              disabled={busy || count === 0}
              aria-label="Tout marquer comme lu"
              title="Tout marquer comme lu"
              onClick={async () => {
                setBusy(true);
                try {
                  await notificationApi.readAll();
                  await Promise.all([reload(), refreshUnreadCount()]);
                } catch (e) {
                  setError(errorMessage(e));
                } finally {
                  setBusy(false);
                }
              }}
            >
              <FiCheck />
            </button>
          </header>
          <label className="notification-popover-filter">
            Catégorie
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {notificationCategories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          {error && (
            <p role="alert" className="notification-popover-error">
              {error}
            </p>
          )}
          <div className="notification-popover-list">
            {loading ? (
              <p role="status" className="notification-popover-empty">
                Chargement…
              </p>
            ) : !items.length ? (
              <p className="notification-popover-empty">
                Aucune notification dans cette catégorie.
              </p>
            ) : (
              items.map((n) => (
                <article key={n.id} className={n.read ? "" : "unread"}>
                  <NotificationIcon type={n.type} />
                  <Link
                    to={notificationLink(n.link)}
                    onClick={() => {
                      setOpen(false);
                      if (!n.read)
                        void notificationApi
                          .read(n.id, true)
                          .then(refreshUnreadCount)
                          .catch(() => {});
                    }}
                  >
                    <small>{notificationLabel(n.type)}</small>
                    <strong>{n.title}</strong>
                    <p>{n.body}</p>
                    <time dateTime={n.createdAt}>
                      {new Date(n.createdAt).toLocaleString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </Link>
                  <button
                    disabled={busy}
                    aria-label={"Supprimer : " + n.title}
                    onClick={() => void remove(n)}
                  >
                    <FiTrash2 />
                  </button>
                </article>
              ))
            )}
          </div>
          <footer>
            <Link to="/notifications" onClick={() => setOpen(false)}>
              Voir toutes les notifications
            </Link>
          </footer>
        </section>
      )}
    </div>
  );
}
