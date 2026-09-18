import axiosClient from "./axiosClient";
import type {
  RoleCount,
  Roles,
  UserRole
} from "../types/role.types";


// ==================== GET ROLES ====================

export async function getRoles(): Promise<Roles[]> {

  const response = await axiosClient.get<Roles[]>(
    "/roles"
  );

  return response.data;
}


// ==================== GET USERS WITH ROLES ====================

export async function getUsersWithRoles(): Promise<UserRole[]> {

  const response = await axiosClient.get<UserRole[]>(
    "/users"
  );

  return response.data;
}


// ==================== UPDATE USER ROLE ====================

export async function updateUserRole(
  userId: string,
  roleId: string
) {

  const response = await axiosClient.post(
    "/users/assign-roles",
    {
      userId,
      roleIds: [roleId]
    }
  );

  return response.data;
}


// ==================== ROLES COUNT ====================

export async function getRolesCountByUsers(): Promise<RoleCount[]> {

  const response = await axiosClient.get<RoleCount[]>(
    "/roles/stats"
  );

  return response.data;
}