import { create } from "zustand";
import { db } from "../firebase";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
const useJob = create<JobStore>((set, get) => ({
  Jobs: [],
  populateJobs: (j) => {
    set((state) => ({ ...state, Jobs: j }));
  },
  setJob: async (j) => {
    try {
      await addDoc(collection(db, "jobs"), {
        inquiry: j.inquiry,
        Items: j.Items,
        jobid: j.jobid,
        createdAt: serverTimestamp(),
        status: j.status,
      });
      set((state) => {
        state.Jobs.push(j);
        return { ...state };
      });
    } catch (e) {
      throw e;
    }
  },
}));

export default useJob;
