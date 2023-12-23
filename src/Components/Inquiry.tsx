import React, { useReducer } from "react";
import useInquiryItem from "../store/Inquiry";
type InquiryAndQuotationProps = {
  step: number;
  setstepNumber: React.Dispatch<React.SetStateAction<number>>;
  actionName: string;
};
const initialState = {
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
};
type initialState = {
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
type actionType = keyof initialState;
type action = {
  type: actionType;
  payload: {
    value: string;
  };
};
const InquiryReducer = (state: initialState, action: action) => {
  switch (action.type) {
    case "CustomerName":
    case "CustomerAddress":
    case "SalesPerson":
    case "PortOfOrigin":
    case "PortOfDestination":
    case "Weight":
    case "Dimensions":
    case "TransitTime":
    case "ShipmentTerms":
    case "CarrierName":
      return {
        ...state,
        [action.type.toString()]: action.payload.value,
      };
    default:
      return { ...state };
  }
};
function Inquiry(props: InquiryAndQuotationProps) {
  const [state, dispatch] = useReducer(InquiryReducer, initialState);
  const { inquiry, setItemInquiry } = useInquiryItem();
  console.log(inquiry);
  const Column1Items = [
    { label: "Enter Customer Name", name: "CustomerName" },
    { label: "Enter Customer Address", name: "CustomerAddress" },
    { label: "Enter Sales Person", name: "SalesPerson" },
    { label: "Enter Port Of Origin", name: "PortOfOrigin" },
    { label: "Enter Port Of Destination", name: "PortOfDestination" },
  ];
  const Column2 = [
    { label: "Enter Weight", name: "Weight" },
    { label: "Enter Dimensions", name: "Dimensions" },
    { label: "Enter Transit Time", name: "TransitTime" },
  ];
  const Column3 = [
    { label: "Enter Shipment Terms", name: "ShipmentTerms" },
    { label: "Enter Carrier Name", name: "CarrierName" },
  ];
  return (
    <div className="w-full flex flex-col justify-center space-y-10 py-12">
      <div className="px-5 flex justify-between w-full">
        <div className="flex flex-col space-y-1">
          {Column1Items.map((i) => (
            <div key={i.name}>
              <label className="text-xl" key={i.name}>
                {i.label}
              </label>
              <input
                type="text"
                className="border-2 border-slate-300 px-2 py-1 rounded-md w-full focus:outline-none "
                name={i.name}
                value={state[i.name as keyof initialState]}
                onChange={(e) =>
                  dispatch({
                    type: i.name as keyof initialState,
                    payload: { value: e.target.value },
                  })
                }
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-1">
          {Column2.map((i) => (
            <div key={i.name}>
              <label className="text-xl" key={i.name}>
                {i.label}
              </label>
              <input
                type="text"
                className="border-2 border-slate-300 px-2 py-1 rounded-md w-full focus:outline-none "
                name={i.name}
                value={state[i.name as keyof initialState]}
                onChange={(e) =>
                  dispatch({
                    type: i.name as keyof initialState,
                    payload: { value: e.target.value },
                  })
                }
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-1">
          {Column3.map((i) => (
            <div key={i.name}>
              <label className="text-xl" key={i.name}>
                {i.label}
              </label>
              <input
                type="text"
                className="border-2 border-slate-300 px-2 py-1 rounded-md w-full focus:outline-none "
                name={i.name}
                value={state[i.name as keyof initialState]}
                onChange={(e) =>
                  dispatch({
                    type: i.name as keyof initialState,
                    payload: { value: e.target.value },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <button
          className="bg-blue-500 text-white rounded-md px-5 py-3 text-2xl text-center"
          onClick={() => {
            setItemInquiry(state);
          }}
        >
          Add Inquiry
        </button>
      </div>
      <div className="flex w-full justify-center">
        <button
          className="bg-blue-700 text-white rounded-md px-5 py-3 text-2xl text-center"
          onClick={() => {
            console.log("Done");
            props.setstepNumber((p) => p + 1);
          }}
        >
          Proceed To {props.actionName}
        </button>
      </div>
    </div>
  );
}

export default Inquiry;
