import type { User } from "./types/User.type";
import type { UserRole } from "./types/role.types";

export function mapUserToUserRole(user: User): UserRole {
  const roles = Array.isArray(user.roles)
    ? user.roles
    : user.roles && typeof user.roles === "object" && "name" in user.roles
      ? [user.roles as typeof user.roles]
      : [];

  const primaryRole = roles[0];

  return {
    id: user.id,
    firstName: user.firstName ?? "Utilisateur",
    lastName: user.lastName ?? "",
    department: user.departement?.name ?? "À définir",
    email: user.email,
    role: {
      id: primaryRole?.id ?? "",
      name: primaryRole?.name ?? user.roleNames?.[0] ?? "Aucun rôle",
      description: primaryRole?.description ?? "",
    },
    enabled: user.enabled ?? true,
  };
}