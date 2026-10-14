import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../pages/actions/login.action";
import { checkAuthAction } from "../pages/actions/check-auth.action";
import { registerAction } from "../pages/actions/register.action";

type Authstatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  //Propeties
  user: User | null;
  token: string | null;
  authStatus: Authstatus;

  //getters
  isAdmin: () => boolean;
  //actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
  resgiter: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  //Implementación del store
  user: null,
  token: null,
  authStatus: "checking",

  //Getters
  isAdmin: () => {
    const roles = (get().user?.roles || []) as string[];
    return roles.includes("admin");
  },

  //Actions
  login: async (email: string, password: string) => {
    console.log({ email, password });
    try {
      const data = await loginAction(email, password);

      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }

    return true;
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({
        user,
        token,
        authStatus: "authenticated",
      });

      return true;
    } catch (e) {
      set({
        user: undefined,
        token: undefined,
        authStatus: "not-authenticated",
      });
      return false;
    }
  },
  resgiter: async (fullName: string, email: string, password: string) => {
    console.log({ fullName, email, password });
    try {
      const data = await registerAction(email, password, fullName);

      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },
}));
