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
  CustomContainerType: string;
  ContainerType: string;
};
type InquiryStore = {
  inquiry: Inquiry;
  setItemInquiry: (i: Inquiry) => void;
  resetInquiry: () => void;
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
    ContainerType: "",
    CarrierName: "",
    CustomContainerType: "",
  },
  setItemInquiry: (i) => {
    set((state) => {
      return { inquiry: i };
    });
  },
  resetInquiry: () => {
    set((state) => {
      return {
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
          ContainerType: "",
          CustomContainerType: "",
        },
      };
    });
  },
}));

export default useInquiryItem;
