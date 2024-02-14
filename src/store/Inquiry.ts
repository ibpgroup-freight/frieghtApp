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
        },
      };
    });
  },
}));

export default useInquiryItem;
