import axiosClient from "./axiosClient";
import type { UserStats } from "../features/dashboard/dashboard.types";
import type { User } from "../types/User.type";
import type { UserProfile } from "../types/auth.types";

export async function getUsersStats(): Promise<UserStats> {
  const response = await axiosClient.get<UserStats>("/users/stats");
  return response.data;
}

export async function getUsers():Promise<User[]>{
  
  const response = await axiosClient.get<User[]>("/users");

  return response.data;
}

export async function getUserById(userId: string):Promise<UserProfile> {
  
  const response = await axiosClient.get<UserProfile>(`/users/user/${userId}`);
  return response.data;
}