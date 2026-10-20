import axiosClient from "./axiosClient";
import axios from "axios";
import type { UserStats } from "../features/dashboard/dashboard.types";
import type { User } from "../types/User.type";
import type { UserProfile } from "../types/auth.types";

export async function getUsersStats(): Promise<UserStats> {
  const response = await axiosClient.get<UserStats>("/users/stats");
  return response.data;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosClient.get<User[]>("/users", {
    timeout: 30_000,
  });

  const accounts=(await axiosClient.get<{userId:string;enabled:boolean;accountLocked:boolean}[]>("/auth/users")).data;
  const byId=new Map(accounts.map(account=>[account.userId,account]));
  return response.data.map(user=>({...user,...(byId.get(user.userId||user.id)||{})}));
};

export async function getUserById(userId: string, accessToken?:string): Promise<UserProfile> {
  try {
    const response = await axiosClient.get<UserProfile>(`/users/${userId}`,accessToken?{headers:{Authorization:"Bearer "+accessToken}}:undefined);
    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 404) throw error;
    const legacyResponse = await axiosClient.get<UserProfile>(`/users/user/${userId}`,accessToken?{headers:{Authorization:"Bearer "+accessToken}}:undefined);
    return legacyResponse.data;
  }
}

export async function getUserByAuthUserId(
  authUserId: string,
  accessToken?: string
): Promise<UserProfile> {
  const response = await axiosClient.get<UserProfile>(
    `/users/auth/${authUserId}`,
    accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined
  );
  return response.data;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  departement: string;
  roleId: string;
}

export async function createUser(request: CreateUserRequest): Promise<User> {
  const response = await axiosClient.post<User>("/users", request);
  return response.data;
}

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

export async function updateUser(userId: string, request: UpdateUserRequest): Promise<User> {
  const response = await axiosClient.put<User>(`/users/${userId}`, request);
  return response.data;
}

export const deleteUser = async (id: string): Promise<number> => {
  const response = await axiosClient.delete(`/users/${id}`);
  console.info("DELETE /users responded with HTTP", response.status);

  if (response.status !== 204) {
    throw new Error(
      `Expected DELETE /users/${id} to return HTTP 204, received ${response.status}.`
    );
  }

  return response.status;
};


export async function assignRoles(userId:string,roleIds:string[]):Promise<UserProfile>{const response=await axiosClient.post<UserProfile>("/users/assign-roles",{userId,roleIds});return response.data;}
export interface Departement{id:string;name:string;}
export async function getDepartements():Promise<Departement[]>{return (await axiosClient.get<Departement[]>("/users/departements")).data;}
