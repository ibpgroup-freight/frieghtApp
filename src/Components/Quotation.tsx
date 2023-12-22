import React, { useState, useReducer } from "react";
import AddQuotation from "./AddQuotation";
import { useContext } from "react";
import { ModalCtx } from "../store/Modal";
type InquiryAndQuotationProps = {
  step: number;
  setstepNumber: React.Dispatch<React.SetStateAction<number>>;
  actionName: string;
};
type initialState = {
  QuoteValidity: string;
  Charges: string;
  ChargeDescription: string;
  UnitPerKg: string;
  Currency: string;
  AmountPerUnit: string;
  CostAndSellSection: string;
};
const initialState = {
  QuoteValidity: "",
  Charges: "",
  ChargeDescription: "",
  UnitPerKg: "",
  Currency: "",
  AmountPerUnit: "",
  CostAndSellSection: "",
};
type action = {
  type: keyof initialState;
  payload: {
    value: string;
  };
};
const QuotationReducer = (state: initialState, action: action) => {
  switch (action.type) {
    case "AmountPerUnit":
    case "ChargeDescription":
    case "Charges":
    case "CostAndSellSection":
    case "Currency":
    case "QuoteValidity":
    case "UnitPerKg":
      return { ...state, [action.type]: action.payload.value };
    default:
      return { ...state };
  }
};
function Quotation(props: InquiryAndQuotationProps) {
  const ctx = useContext(ModalCtx);
  const [state, dispatch] = useReducer(QuotationReducer, initialState);
  const [showQuotation, setshowQuotation] = useState(false);
  const Column1 = [
    { label: "Quote Validity", name: "QuoteValidity" },
    { label: "Charges", name: "Charges" },
    { label: "Charge Description", name: "ChargeDescription" },
    { label: "Unit Per Kg", name: "UnitPerKg" },
    { label: "Currency", name: "Currency" },
    { label: "Amount Per Unit", name: "AmountPerUnit" },
    { label: "Cost And Sell Section", name: "CostAndSellSection" },
  ];
  return (
    <div className={`px-5 flex justify-evenly w-full relativ`}>
      {showQuotation && <AddQuotation closeQuotation={setshowQuotation} />}
      <table className="border border-slate-400 border-spacing-x-10 border-spacing-y-2">
        <thead>
          <tr>
            {Column1.map((i) => (
              <th className="border border-slate-300 p-4">{i.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Column1.map((i) => (
              <td className="border border-slate-300 p-4">{i.label}</td>
            ))}
          </tr>
        </tbody>
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
  );
}

export default Quotation;
