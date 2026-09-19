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
  const payload = token.split(".")[1];
  if (!payload) throw new Error("Invalid access token");
  return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
}

const storedToken = localStorage.getItem("accessToken");
let storedUser: DecodedUser | null = null;

if (storedToken) {
  try {
    const decodedUser = decodeUserFromToken(storedToken);
    if (decodedUser.exp * 1000 > Date.now()) {
      storedUser = decodedUser;
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
    }
  } catch {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: storedUser ? storedToken : null,
  refreshToken: localStorage.getItem("refreshToken"),
  role: localStorage.getItem("role"),
  isAuthenticated: !!storedUser,
  user: storedUser,

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