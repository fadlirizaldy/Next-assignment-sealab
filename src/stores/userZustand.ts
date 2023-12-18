import { UserType } from "@/utils/types";
import { create } from "zustand";

interface AuthStoreInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  user: UserType;
  setUser: (user: UserType) => void;
}

const useAuthStore = create<AuthStoreInterface>((set) => ({
  isLoggedIn: false,
  user: {} as UserType,
  setIsLoggedIn: (val) => set((state) => ({ isLoggedIn: val })), // function to set the authentication status
  setUser: (user) => set({ user }), // function to set user information
}));

export default useAuthStore;
