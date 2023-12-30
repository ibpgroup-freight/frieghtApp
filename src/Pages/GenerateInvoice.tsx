import React from "react";
import { useState } from "react";
import AddQuotation from "../Components/AddQuotation";
import { ModalCtx } from "../store/Modal";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
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
function GenerateInvoice() {
  const [showQuotation, setshowQuotation] = useState(false);
  const ctx = useContext(ModalCtx);
  const [state, dispatch] = React.useReducer(InquiryReducer, initialState);

  const [items, setitems] = useState<Item[]>([]);
  const Column1 = [
    { label: "Quote Validity", name: "QuoteValidity" },
    { label: "Charges", name: "Charges" },
    { label: "Charge Description", name: "ChargeDescription" },
    { label: "Unit Per Kg", name: "UnitPerKg" },
    { label: "Currency", name: "Currency" },
    { label: "Amount Per Unit", name: "AmountPerUnit" },
    { label: "Cost And Sell Section", name: "CostAndSellSection" },
  ];
  const Column1Items = [
    { label: "Enter Customer Name", name: "CustomerName" },
    { label: "Enter Customer Address", name: "CustomerAddress" },
    { label: "Enter Sales Person", name: "SalesPerson" },
    { label: "Enter Port Of Origin", name: "PortOfOrigin" },
    { label: "Enter Port Of Destination", name: "PortOfDestination" },
    { label: "Enter Carrier Name", name: "CarrierName" },
  ];
  console.log("Items in invoice", items);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full py-4 space-y-3 items-center">
      <div className="relative mx-auto w-5/6 ">
        {showQuotation && (
          <AddQuotation
            closeQuotation={setshowQuotation}
            AddItemToInvoice={(item: Item) => setitems((p) => [...p, item])}
          />
        )}
      </div>

      <h1 className="text-5xl text-center text-blue-600 font-serif">
        Generate Invoice
      </h1>

      <div className="w-3/5">
        <h1 className="text-xl text-center text-blue-900 font-serif">
          Invoice Details
        </h1>

        <div className="flex flex-col space-y-2">
          {Column1Items.map((i) => (
            <div key={i.name} className="px-4">
              <label className="text-xl" key={i.name}>
                {i.label}
              </label>
              <input
                type="text"
                required
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
      <div className="space-y-2 w-4/5">
        <h1 className="text-xl text-center text-blue-900 font-serif">
          Add Services
        </h1>
        <div className={`px-5 flex justify-evenly w-full`}>
          <table className="border border-slate-400 border-spacing-x-10 border-spacing-y-2">
            <thead>
              <tr>
                {Column1.map((i) => (
                  <th className="border border-slate-300 p-4" key={i.name}>
                    {i.label}
                  </th>
                ))}
              </tr>
            </thead>
            {items && (
              <tbody>
                {items.map((i) => (
                  <tr key={i.id}>
                    <td className="border border-slate-300 p-4">
                      {i.QuoteValidity}
                    </td>
                    <td className="border border-slate-300 p-4">{i.Charges}</td>
                    <td className="border border-slate-300 p-4">
                      {i.ChargeDescription}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.UnitPerKg}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.Currency}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.AmountPerUnit}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.CostAndSellSection}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          <div className="absolute right-40">
            <button
              className="text-2xl rounded-full text-green-600"
              onClick={(e) => {
                console.log("Here");
                setshowQuotation(true);
                ctx.setToggle();
              }}
            >
              + Add
            </button>
          </div>
        </div>
      </div>
      <button
        className="bg-blue-700 text-white rounded-md px-5 py-3 text-2xl text-center"
        onClick={() => {
          if (items.length > 0)
            navigate("/invoicePdf", {
              state: {
                job: { id: Date.now.toString(), items, inquiry: state },
              },
            });
        }}
      >
        Generate Invoice
      </button>
    </div>
  );
}

export default GenerateInvoice;
