import { create } from "zustand";


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
