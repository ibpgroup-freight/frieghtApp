import { create } from "zustand";
const useinvoiceStore = create<InvoiceStore>((set, get) => ({
  jobInfo: {
    CustomerName: "",
    CustomerAddress: "",
    SalesPerson: "",
    PortOfOrigin: "",
    PortOfDestination: "",
    TransitTime: "",
    CarrierName: "",
    ContainerType: "",
    TodaysDate: "",
    CustomerPhone: "",
    CustomerEmail: "",
    CustomerTRN: "",
    Jobid: "",
    Discount: 0,
    OutstandingDues: 0,
    VATAmount: 0,
  },
  Items: [],
  setInfo(j) {
    set((state) => ({ ...state, jobInfo: j }));
  },
  setItems(j) {
    set((state) => {
      return { ...state, Items: j };
    });
  },
}));

export default useinvoiceStore;
