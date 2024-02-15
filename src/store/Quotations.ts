import { create } from "zustand";
import { db } from "../firebase";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
const useQuotation = create<QuotationStore>((set, get) => ({
  Quotations: [],
  populateQuotations: (j) => {
    set((state) => ({ ...state, Quotations: j }));
  },
  setQuotation: async (j) => {
    try {
      await addDoc(collection(db, "jobs"), {
        inquiry: j.inquiry,
        Items: j.Items,
        quotationId: j.quotationId,
        createdAt: serverTimestamp(),
        status: j.status,
      });
      set((state) => {
        state.Quotations.push(j);
        return { ...state };
      });
    } catch (e) {
      throw e;
    }
  },
}));

export default useQuotation;
