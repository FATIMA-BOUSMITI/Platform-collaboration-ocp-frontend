import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { projectInvitationApi } from "../../api/projectInvitationApi";
import type { ProjectInvitation } from "../../api/projectInvitationApi";
import { errorMessage } from "../../api/adminApi";
import { subscribeRealtime } from "../collaboration/realtime";
export default function ProjectInvitations() {
  const [items, setItems] = useState<ProjectInvitation[]>([]),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [accepted, setAccepted] = useState<ProjectInvitation | null>(null);
  const location = useLocation();
  const reload = useCallback(async () => {
    try {
      setItems(await projectInvitationApi.own());
      setError("");
    } catch (e) {
      setError(errorMessage(e));
    }
  }, []);
  useEffect(() => {
    void reload();
  }, [reload]);
  useEffect(
    () =>
      subscribeRealtime((s) => {
        if (s.kind === "notification" || s.kind === "connected") void reload();
      }),
    [reload],
  );
  useEffect(() => {
    if (location.hash.startsWith("#invitation-"))
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ block: "center" });
  }, [location.hash, items]);
  async function respond(invitation: ProjectInvitation, accept: boolean) {
    setBusy(true);
    try {
      const result = await projectInvitationApi.respond(invitation.id, accept);
      if (accept) setAccepted(result);
      await reload();
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  if (!items.length && !error && !accepted) return null;
  return (
    <section className="project-invitations">
      <h2>
        <FiUserPlus />
        Invitations aux projets
      </h2>
      {error && <p role="alert">{error}</p>}
      {accepted && (
        <p role="status">
          Invitation acceptée.{" "}
          <Link to={"/projects?project=" + accepted.projectId}>
            Ouvrir {accepted.projectName}
          </Link>
        </p>
      )}
      {items.map((i) => (
        <article key={i.id} id={"invitation-" + i.id} tabIndex={-1}>
          <div>
            <strong>{i.projectName}</strong>
            <p>Vous êtes invité à collaborer sur ce projet.</p>
            <time dateTime={i.createdAt}>
              {new Date(i.createdAt).toLocaleDateString("fr-FR")}
            </time>
          </div>
          <div>
            <button
              disabled={busy}
              className="collab-primary"
              onClick={() => void respond(i, true)}
            >
              Accepter
            </button>
            <button disabled={busy} onClick={() => void respond(i, false)}>
              Refuser
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
