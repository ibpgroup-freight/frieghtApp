import { create } from "zustand";
import Inquiry from "../Components/Inquiry";

type Inquiry = {
  CustomerName: string;
  CustomerAddress: string;
  SalesPerson: string;
  PortOfOrigin: string;
  PortOfDestination: string;
  Weight: string;
  Dimensions: string;
  TransitTime: string;
  ShipmentTerms: string;
  CarrierName: string;
};
type Item = {
  id: string;
  QuoteValidity: string;
  Charges: string;
  ChargeDescription: string;
  UnitPerKg: string;
  Currency: string;
  AmountPerUnit: string;
  CostAndSellSection: string;
};
type Job = {
  id: string;
  inquiry: Inquiry;
  Items: Item[];
};
type JobStore = {
  Jobs: Job[];
  setJob: (i: Job) => void;
};
const useJob = create<JobStore>((set) => ({
  Jobs: [],
  setJob: (j) => {
    set((state) => {
      state.Jobs.push(j);
      return { ...state };
    });
  },
}));

export default useJob;
