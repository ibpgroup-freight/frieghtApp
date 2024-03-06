import { create } from "zustand";
import Inquiry from "../Components/Inquiry";

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
    jobInitials: "",
    method: "",
    othershippingDetails: "",
    quotationId: "",
    blNo: "",
    HAWB: "",
    Movement: "",
    PayableAt: "",
    PlaceOfDelivery: "",
    PlaceOfIssue: "",
    PlaceOfReceipt: "",
    dueDate: "",
    PostingDate: "",
    Arrival: "",
    Department: "",
    Incharge: "",
    IncoTerm: "",
    Periodicity: "",
    validFrom: "",
    validTo: "",
    Yref: "",
  },
  address: "",
  setaddress(address) {
    set((state) => ({ ...state, address }));
  },
  prestation: [],
  setItemInquiry: (i) => {
    set((state) => {
      return { inquiry: i };
    });
  },
  resetPrestation() {
    set((state) => ({ ...state, prestation: [] }));
  },
  setPrestation(i) {
    set((state) => {
      state.prestation.push(i);
      return { ...state };
    });
  },
  setPrestationArray(i) {
    set((state) => ({ ...state, prestation: i }));
  },
  resetInquiry: () => {
    set((state) => {
      return {
        inquiry: {
          jobInitials: "",
          method: "",
          othershippingDetails: "",
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
          quotationId: "",
          blNo: "",
          HAWB: "",
          Movement: "",
          PayableAt: "",
          PlaceOfDelivery: "",
          PlaceOfIssue: "",
          PlaceOfReceipt: "",
          dueDate: "",
          PostingDate: "",
          AdditionalInfo: "",
          Arrival: "",
          Department: "",
          Incharge: "",
          IncoTerm: "",
          Periodicity: "",
          validFrom: "",
          validTo: "",
          Yref: "",
        },
      };
    });
  },
}));

export default useInquiryItem;
