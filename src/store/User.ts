import { create } from "zustand";

const useUser = create<UserStore>((set) => ({
  role: "",
  isloggedIn: false,
  name: "",
  email: "",
  billType: "",
  phone: "",
  AuthStateLogIn(role, isloggedIn, name, email) {
    set((state) => {
      return { ...state, isloggedIn: true, role, name, email };
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
