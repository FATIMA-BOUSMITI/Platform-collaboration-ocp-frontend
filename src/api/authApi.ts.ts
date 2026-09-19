import axiosClient from "./axiosClient";

export interface LoginRequest {
    email: string;
    password: string;
}


export const login = async (data: LoginRequest) => {

    const response = await axiosClient.post(
        "/auth/login",
        data
    );

    return response.data;
};
export const forgotPassword = async (data: { email: string }) => {
  const response = await axiosClient.post(
    "/auth/forgot-password",
    data
  );

  return response.data;
};
export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}

export const resetPassword = async (
    data: ResetPasswordRequest
) => {
    return axiosClient.post(
        "/auth/reset-password",
        data
    );
};

export interface RefreshTokenRequest {
    refreshToken: string;
}

export async function refreshToken(data: RefreshTokenRequest) {
    const response = await axiosClient.post("/auth/refresh", data);
    return response.data;
}

export async function logout() {
    await axiosClient.post("/auth/logout");
}

export async function changePassword(data: { oldPassword: string; newPassword: string }) {
    await axiosClient.patch("/auth/change-password", data);
}