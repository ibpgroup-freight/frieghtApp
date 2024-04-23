import { create } from "zustand";

const useUser = create<UserStore>((set) => ({
  role: "",
  isloggedIn: false,
  name: "",
  email: "",
  billType: "",
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
  setbillType(bill) {
    set((state) => {
      return { ...state, billType: bill };
    });
  },
}));

export default useUser;
