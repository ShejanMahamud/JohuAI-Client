import { create } from "zustand";

interface IUser {
  name: string;
  email: string;
  role: "user" | "admin";
  subscription: "free" | "pro";
  phone: string;
  profile_picture: string;
  tokenUsed: number;
  status: "active" | "inactive";
  wordUsed: number;
  refreshToken: string;
}

interface AuthState {
  user: IUser | null;
  loading: boolean;
  setUser: (user: IUser | null) => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/user", { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        set({ user: data, loading: false });
      } else {
        set({ user: null, loading: false });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ user: null, loading: false });
    }
  },
}));
