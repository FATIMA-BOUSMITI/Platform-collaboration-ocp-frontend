import { create } from "zustand";

interface DecodedUser {
  sub: string;
  userId: string;
  type: string;
  iat: number;
  exp: number;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  user: DecodedUser | null;
  isAuthenticated: boolean;

  login: (access: string, refresh: string, role: string) => void;
  logout: () => void;
}

function decodeUserFromToken(token: string): DecodedUser {
  return JSON.parse(atob(token.split(".")[1]));
}

const storedToken = localStorage.getItem("accessToken");

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: storedToken,
  refreshToken: localStorage.getItem("refreshToken"),
  role: localStorage.getItem("role"),
  isAuthenticated: !!storedToken,
  user: storedToken ? decodeUserFromToken(storedToken) : null,

  login: (access, refresh, role) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("role", role);

    const decodedUser = decodeUserFromToken(access);

    set({
      accessToken: access,
      refreshToken: refresh,
      role: role,
      user: decodedUser,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");

    set({
      accessToken: null,
      refreshToken: null,
      role: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));