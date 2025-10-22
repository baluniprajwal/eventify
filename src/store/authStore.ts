import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User, token?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
