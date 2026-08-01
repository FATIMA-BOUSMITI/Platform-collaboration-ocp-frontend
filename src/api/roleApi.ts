import axiosClient from "./axiosClient";
import type {  RoleCount, Roles, UserRole } from "../types/role.types";

export async function getRoles() {
    const response = await axiosClient.get<Roles[]>("/roles");
    return response.data;
}

export async function getUsersWithRoles() {
    const response = await axiosClient.get<UserRole[]>("/users");
    return response.data;
}

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

export async function getRolesCountByUsers() {
    const response = await axiosClient.get<RoleCount[]>("/roles/stats");
    return response.data;
}
