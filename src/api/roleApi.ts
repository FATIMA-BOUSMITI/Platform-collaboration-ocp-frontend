import axiosClient from "./axiosClient";
import type { Role, UserRole } from "../types/role.types";

export async function getRoles() {
    const response = await axiosClient.get<Role[]>("/roles");
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
    await axiosClient.put(`/users/${userId}/role`, {
        roleId
    });
}