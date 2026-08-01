import type { User } from "./types/User.type"
import type { UserRole } from "./types/role.types"

export function mapUserToUserRole(user: User): UserRole {
   
    return {
          id: user.id ,
          firstName: "Utilisateur",
          lastName: "",
          department: "À définir",
          email: user.email,
          role:  {

            id: "",

            name: user.roleNames[0] ?? "Aucun rôle",

            description: ""

        }
          ,
          enabled: user.enabled,

    };
}