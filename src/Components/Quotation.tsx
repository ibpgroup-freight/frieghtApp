import React, { useState, useReducer } from "react";
import AddQuotation from "./AddQuotation";
import { useContext } from "react";
import { ModalCtx } from "../store/Modal";
import useItemStore from "../store/Item";

const quotation: QuotationItem = {
  id: "",
  QuoteValidity: "",
  Charges: "",
  ChargeDescription: "",
  UnitPerKg: "",
  Currency: "",
  AmountPerUnit: "",
  CostAndSellSection: "",
};

const QuotationReducer = (state: QuotationItem, action: QuotationAction) => {
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
  const { items } = useItemStore();
  const [state, dispatch] = useReducer(QuotationReducer, quotation);
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
    <div>
      <div className={`md:px-5 flex justify-evenly  w-full `}>
        {showQuotation && <AddQuotation closeQuotation={setshowQuotation} />}
        <div className="w-3/5 md:w-full overflow-auto">
          <table className="border overflow-x-auto w-full ml-30 border-slate-400 md:border-spacing-x-10 md:border-spacing-y-2">
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
                  <tr>
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
        </div>

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

export default Quotation;
