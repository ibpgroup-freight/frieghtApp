import { create } from "zustand";
const useinvoiceStore = create<InvoiceStore>((set, get) => ({
  jobInfo: {
    Discount: 0,
    OutstandingDues: 0,
    VATAmount: 0,
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
    AirportOfDestination: "",
    AirportOfOrigin: "",
    TypeOfCargo: "",
    isAirinquiry: false,
    CustomerTRN: "",
    Departure: "",
    EstimatedArrival: "",
    CustomerEmail: "",
    CustomerPhoneNo: "",
    FlightInformation: "",
    type: "",
    DriverDetails: "",
    PlaceOfDestination: "",
    PlaceOfOrigin: "",
    RouteDetails: "",
    VehicleDetails: "",
    ShippingLaneDetails: "",
    VesselDetails: "",
    VesselName: "",
    Jobid: "",
    jobInitials: "",
    method: "",
    othershippingDetails: "",
    quotationId: "",
    address: "",
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
