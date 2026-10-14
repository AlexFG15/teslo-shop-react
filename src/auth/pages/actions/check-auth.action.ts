import { tesloApi } from "@/api/teslo-Api";
import type { AuthResponse } from "@/auth/interfaces/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  try {
    const { data } = await tesloApi.get<AuthResponse>("/auth/check-status");
    localStorage.setItem("token", data.token);

    return data;
  } catch (e) {
    localStorage.removeItem("token");
    throw new Error("Token expired or not valid");
  }
};
