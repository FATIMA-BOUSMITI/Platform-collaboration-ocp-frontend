import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiBell, FiTrash2, FiCheckCircle, FiSettings } from "react-icons/fi";
import { notificationApi } from "../../api/notificationApi";
import type {
  Notification,
  NotificationPreferences,
} from "../../api/notificationApi";
import { subscribeRealtime } from "../collaboration/realtime";
import ProjectInvitations from "./ProjectInvitations";
import {
  NotificationIcon,
  notificationCategories,
  notificationLabel,
  notificationLink,
} from "./presentation";
import { refreshUnreadCount, useUnreadCount } from "./inbox";
import { errorMessage, adminApi } from "../../api/adminApi";
import type { Notice } from "../../api/adminApi";
import { useAuthStore } from "../auth/AuthStore";
import { Modal, Feedback, Empty } from "../admin/AdminUI";
import "./Notifications.css";
export default function NotificationsPage(){const userId=useAuthStore(s=>s.user?.userId);return <NotificationCenter key={userId}/>;}
function NotificationCenter() {
  const role = useAuthStore((s) => s.role),
    [items, setItems] = useState<Notification[]>([]),
    [category, setCategory] = useState("ALL"),
    [page, setPage] = useState(0),
    [unread, setUnread] = useState(false),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [preferences, setPreferences] = useState<NotificationPreferences | null>(
      null,
    ),
    [security, setSecurity] = useState<Notice[]>([]);
  const count = useUnreadCount((s) => s.count),
    sequence = useRef(0);
  const reload = useCallback(async () => {
    const request = ++sequence.current;
    setLoading(true);
    try {
      const values = await notificationApi.list(unread, 0, category);
      if (request !== sequence.current) return;
      setItems(values);
      setPage(0);
      setError("");
      await refreshUnreadCount();
    } catch (e) {
      if (request === sequence.current) setError(errorMessage(e));
    } finally {
      if (request === sequence.current) setLoading(false);
    }
  }, [unread, category]);
  useEffect(() => {
    let active = true;
    void Promise.resolve().then(() => {
      if (active) return reload();
    });
    return () => {
      active = false;
      sequence.current++;
    };
  }, [reload]);
  useEffect(
    () =>
      subscribeRealtime((signal) => {
        if (
          ["notification", "notification-state", "connected"].includes(
            signal.kind,
          )
        )
          void reload();
      }),
    [reload],
  );
  useEffect(() => {
    if (role === "ADMIN")
      adminApi
        .notices()
        .then(setSecurity)
        .catch((e) => setError(errorMessage(e)));
  }, [role]);
  async function mark(n: Notification) {
    setBusy(true);
    try {
      await notificationApi.read(n.id, !n.read);
      await reload();
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="notifications-page">
      <header className="collab-page-heading">
        <div>
          <p className="collab-eyebrow">VOTRE ACTIVITÉ</p>
          <h1>Notifications</h1>
          <p>Messages, affectations et échéances au même endroit.</p>
        </div>
        <div className="collab-actions">
          <button
            disabled={busy}
            onClick={() => {
              void notificationApi
                .preferences()
                .then(setPreferences)
                .catch((e) => setError(errorMessage(e)));
            }}
          >
            <FiSettings />
            Préférences
          </button>
          <button
            className="collab-primary"
            disabled={busy || count === 0}
            onClick={async () => {
              setBusy(true);
              try {
                await notificationApi.readAll();
                await reload();
              } catch (e) {
                setError(errorMessage(e));
              } finally {
                setBusy(false);
              }
            }}
          >
            <FiCheckCircle />
            Tout marquer comme lu
          </button>
        </div>
      </header>
      <Feedback error={error} />
      <ProjectInvitations />
      <div className="notifications-tabs">
        <label className="notification-category">
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
        <button aria-pressed={!unread} onClick={() => setUnread(false)}>
          Toutes
        </button>
        <button aria-pressed={unread} onClick={() => setUnread(true)}>
          Non lues
        </button>
        <button onClick={() => void reload()} disabled={loading}>
          Actualiser
        </button>
      </div>
      <section className="notifications-list">
        {loading ? (
          <p role="status">Chargement des notifications…</p>
        ) : !items.length ? (
          <Empty>
            <FiBell />
            Aucune notification {unread ? "non lue" : "pour le moment"}.
          </Empty>
        ) : (
          items.map((n) => (
            <article
              key={n.id}
              className={
                n.read ? "notification-item" : "notification-item unread"
              }
            >
              <NotificationIcon type={n.type} />
              <div>
                <Link
                  to={notificationLink(n.link)}
                  onClick={() => {
                    if (!n.read)
                      void notificationApi
                        .read(n.id, true)
                        .then(refreshUnreadCount)
                        .catch(() => {});
                  }}
                >
                  <small className="notification-category-label">
                    {notificationLabel(n.type)}
                  </small>
                  <h2>{n.title}</h2>
                  <p>{n.body}</p>
                </Link>
                <time>{new Date(n.createdAt).toLocaleString("fr-FR")}</time>
              </div>
              <div className="notification-row-actions">
                <button disabled={busy} onClick={() => void mark(n)}>
                  {n.read ? "Marquer non lue" : "Marquer lue"}
                </button>
                <button
                  disabled={busy}
                  aria-label={"Supprimer : " + n.title}
                  onClick={async () => {
                    setBusy(true);
                    try {
                      await notificationApi.delete(n.id);
                      await reload();
                    } catch (e) {
                      setError(errorMessage(e));
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  <FiTrash2 />
                </button>
              </div>
            </article>
          ))
        )}
      </section>
      {items.length >= (page + 1) * 40 && (
        <button
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              const request = sequence.current;
              const values = await notificationApi.list(
                unread,
                page + 1,
                category,
              );
              if (request !== sequence.current) return;
              setItems((v) => [
                ...new Map([...v, ...values].map((n) => [n.id, n])).values(),
              ]);
              setPage((v) => v + 1);
            } catch (e) {
              setError(errorMessage(e));
            } finally {
              setBusy(false);
            }
          }}
        >
          Charger la suite
        </button>
      )}
      {role === "ADMIN" && security.length > 0 && (
        <section className="notifications-security">
          <h2>Sécurité de votre compte</h2>
          {security.map((n) => (
            <article key={n.id}>
              <span>{n.message}</span>
              <time>{new Date(n.createdAt).toLocaleString("fr-FR")}</time>
              <button
                disabled={busy || n.read}
                onClick={async () => {
                  setBusy(true);
                  try {
                    await adminApi.read(n.id);
                    setSecurity(await adminApi.notices());
                  } catch (e) {
                    setError(errorMessage(e));
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                {n.read ? "Lue" : "Marquer lue"}
              </button>
            </article>
          ))}
        </section>
      )}
      {preferences && (
        <Preferences
          initial={preferences}
          onClose={() => setPreferences(null)}
        />
      )}
    </section>
  );
}
function Preferences({
  initial,
  onClose,
}: {
  initial: NotificationPreferences;
  onClose: () => void;
}) {
  const [value, setValue] = useState(initial),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  return (
    <Modal title="Préférences de notification" onClose={onClose} busy={busy}>
      <Feedback error={error} />
      <form
        className="collab-form"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          try {
            await notificationApi.savePreferences(value);
            onClose();
          } catch (err) {
            setError(errorMessage(err));
          } finally {
            setBusy(false);
          }
        }}
      >
        {(
          ["messages", "tasks", "deadlines", "mentions", "invitations"] as const
        ).map((key, i) => (
          <label className="notification-preference" key={key}>
            <input
              type="checkbox"
              checked={value[key]}
              onChange={(e) => setValue({ ...value, [key]: e.target.checked })}
            />
            {
              [
                "Nouveaux messages",
                "Affectations et modifications de tâches",
                "Rappels d’échéance",
                "Mentions dans les messages et commentaires",
                "Invitations aux projets",
              ][i]
            }
          </label>
        ))}
        <button className="collab-primary" disabled={busy}>
          Enregistrer
        </button>
      </form>
    </Modal>
  );
}
