import type { User } from "@/interfaces/user.interface";

//Login, Resgiter, CheckStatus
export interface AuthResponse {
  user: User;
  token: string;
}
