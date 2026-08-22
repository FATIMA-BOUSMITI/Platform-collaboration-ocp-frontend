import { create } from "zustand";

interface AuthState {

  accessToken: string | null;

  refreshToken: string | null;

  role: string | null;

  isAuthenticated: boolean;

  login: (
    access: string,
    refresh: string,
    role: string
  ) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({

  accessToken: localStorage.getItem("accessToken"),

  refreshToken: localStorage.getItem("refreshToken"),

  role: localStorage.getItem("role"),

  isAuthenticated: !!localStorage.getItem("accessToken"),

  login: (access, refresh, role) => {

    localStorage.setItem("accessToken", access);

    localStorage.setItem("refreshToken", refresh);

    localStorage.setItem("role", role);

    set({
      accessToken: access,
      refreshToken: refresh,
      role: role,
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
      isAuthenticated: false,
    });
  },

}));