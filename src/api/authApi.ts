import axiosClient from "./axiosClient";
import type { LoginRequest, LoginResponse } from "../types/auth.types";

export async function login(data: LoginRequest): Promise<LoginResponse> {

  const response = await axiosClient.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
}

export async function logout() {

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}