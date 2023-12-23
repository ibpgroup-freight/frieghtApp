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
type InquiryStore = {
  inquiry: Inquiry;
  setItemInquiry: (i: Inquiry) => void;
};
const useInquiryItem = create<InquiryStore>((set) => ({
  inquiry: {
    CustomerName: "",
    CustomerAddress: "",
    SalesPerson: "",
    PortOfOrigin: "",
    PortOfDestination: "",
    Weight: "",
    Dimensions: "",
    TransitTime: "",
    ShipmentTerms: "",
    CarrierName: "",
  },
  setItemInquiry: (i) => {
    set((state) => {
      return { inquiry: i };
    });
  },
}));

export default useInquiryItem;
