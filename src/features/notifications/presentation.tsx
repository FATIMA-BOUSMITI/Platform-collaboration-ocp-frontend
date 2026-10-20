import {
  FiAtSign,
  FiCheckCircle,
  FiClock,
  FiMessageSquare,
  FiUserPlus,
} from "react-icons/fi";
export const notificationCategories = [
  { value: "ALL", label: "Toutes les catégories" },
  { value: "MESSAGES", label: "Messages" },
  { value: "TASKS", label: "Tâches" },
  { value: "MENTIONS", label: "Mentions" },
  { value: "PROJECTS", label: "Invitations" },
  { value: "DEADLINES", label: "Échéances" },
];
export function notificationLabel(type: string) {
  return (
    (
      {
        MESSAGE: "Message",
        TASK_ASSIGNED: "Affectation",
        TASK_UPDATED: "Modification",
        TASK_STATUS: "Statut Kanban",
        TASK_COMMENT: "Commentaire",
        TASK_DUE: "Échéance",
        MENTION: "Mention",
        PROJECT_INVITATION: "Invitation",
      } as Record<string, string>
    )[type] || "Activité"
  );
}
export function NotificationIcon({ type }: { type: string }) {
  const Icon =
    type === "MENTION"
      ? FiAtSign
      : type === "PROJECT_INVITATION"
        ? FiUserPlus
        : type === "MESSAGE"
          ? FiMessageSquare
          : type === "TASK_DUE"
            ? FiClock
            : FiCheckCircle;
  return (
    <span className={"notification-icon " + type.toLowerCase()}>
      <Icon />
    </span>
  );
}
export function notificationLink(link: string) {
  return /^\/(projects|messages|notifications)([?#].*)?$/.test(link)
    ? link
    : "/notifications";
}
