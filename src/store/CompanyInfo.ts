import { create } from "zustand";
import { db } from "../firebase";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
const useCompanyInfo = create<CompanyInfoStore>((set, get) => ({
  Location: [],
  resetInformation() {
    set((state) => ({ ...state, Location: [] }));
  },
  setInformation(a) {
    set((state) => ({ ...state, Location: a }));
  },
}));

export default useCompanyInfo;
