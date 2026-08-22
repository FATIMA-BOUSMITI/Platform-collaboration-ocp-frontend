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