import axiosClient from "./axiosClient";
import type { UserStats } from "../features/dashboard/dashboard.types";
import type { User } from "../types/User.type";
import type { UserProfile } from "../types/auth.types";

export async function getUsersStats(): Promise<UserStats> {
  const response = await axiosClient.get<UserStats>("/users/stats");
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  return response.data;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosClient.get<User[]>("/users");

  return response.data;
<<<<<<< Updated upstream
}

export async function getUserById(userId: string):Promise<UserProfile> {
  
  const response = await axiosClient.get<UserProfile>(`/users/user/${userId}`);
  return response.data;
}
=======
};


// ==================== DEPARTEMENTS ====================

export interface Departement {
  id: string;
  name: string;
}

export const getDepartements = async (): Promise<Departement[]> => {
  const response = await axiosClient.get<Departement[]>(
    "/users/departements"
  );

  return response.data;
};


// ==================== CREATE USER ====================

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  departement: string;
  roleId: string;
}

export const createUser = async (
  user: CreateUserRequest
): Promise<User> => {

  const response = await axiosClient.post<User>(
    "/users",
    user
  );

  return response.data;
};


// ==================== UPDATE USER ====================

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  position?: string;
  managerId?: string;
  language?: string;
  timezone?: string;
  departement?: string;
  roleId?: string;
}

export const updateUser = async (
  id: string,
  user: UpdateUserRequest
): Promise<User> => {

  const response = await axiosClient.put<User>(
    `/users/${id}`,
    user
  );

  return response.data;
};


// ==================== DELETE USER ====================

export const deleteUser = async (
  id: string
): Promise<void> => {

  await axiosClient.delete(`/users/${id}`);
};
>>>>>>> Stashed changes
