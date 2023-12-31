import { create } from "zustand";

type UserStore = {
  role: string;
  isloggedIn: boolean;
  name: string;
  email: string;
  AuthStateLogIn: () => void;
  AuthStateLogOut: () => void;
};
const useUser = create<UserStore>((set) => ({
  role: "",
  isloggedIn: false,
  name: "",
  email: "",
  AuthStateLogIn() {
    set((state) => {
      return { ...state, isloggedIn: true };
    });
  },
  AuthStateLogOut() {
    set((state) => {
      return { ...state, isloggedIn: false };
    });
  },
}));

export default useUser;
