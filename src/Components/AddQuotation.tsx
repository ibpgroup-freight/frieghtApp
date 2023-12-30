import React from "react";
import { useContext } from "react";
import { ModalCtx } from "../store/Modal";
import useItemStore from "../store/Item";
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
type qprops = {
  closeQuotation: React.Dispatch<React.SetStateAction<boolean>>;
  AddItemToInvoice?: (item: Item) => void;
};
type InitialState = {
  id: string;
  QuoteValidity: string;
  Charges: string;
  ChargeDescription: string;
  UnitPerKg: string;
  Currency: string;
  AmountPerUnit: string;
  CostAndSellSection: string;
};
type action = {
  type: keyof InitialState;
  payload: {
    value: string;
  };
};
const InitialState: InitialState = {
  id: "",
  QuoteValidity: "",
  Charges: "",
  ChargeDescription: "",
  UnitPerKg: "",
  Currency: "",
  AmountPerUnit: "",
  CostAndSellSection: "",
};
const AddQuotationReducer = (state: InitialState, action: action) => {
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
function AddQuotation({ closeQuotation, AddItemToInvoice }: qprops) {
  const [val, setval] = React.useState("");
  const [state, dispatch] = React.useReducer(AddQuotationReducer, InitialState);
  const { AddItem, items } = useItemStore();

  const ctx = useContext(ModalCtx);
  const Column1 = [
    { label: "Quote Validity", name: "QuoteValidity" },
    { label: "Charges", name: "Charges" },
    { label: "Charge Description", name: "ChargeDescription" },
  ];
  const Column2 = [
    { label: "Unit Per Kg", name: "UnitPerKg" },
    { label: "Currency", name: "Currency" },
    { label: "Amount Per Unit", name: "AmountPerUnit" },
    { label: "Cost And Sell Section", name: "CostAndSellSection" },
  ];
  return (
    <div className="left-0 right-0 absolute bg-white border border-slate-500 z-50 py-10 rounded-md">
      <div
        className="text-white bg-red-600  p-1 px-3 cursor-pointer rounded-full text-xl absolute right-9"
        onClick={(e) => {
          ctx.setToggle();
          closeQuotation((p) => !p);
        }}
      >
        X
      </div>
      <h2 className="text-center text-2xl text-blue-800">Add Item</h2>
      <div className="flex justify-evenly">
        <div className="flex flex-col space-y-2 items-center">
          {Column1.map((i) => (
            <div
              className="flex flex-col items-center justify-start"
              key={i.name}
            >
              <label className="text-xl">{i.name}</label>
              <input
                type="text"
                className="border-2 border-slate-300 px-2 py-1 rounded-md w-full focus:outline-none "
                value={state[i.name as keyof InitialState]}
                onChange={(e) =>
                  dispatch({
                    type: i.name as keyof InitialState,
                    payload: { value: e.target.value },
                  })
                }
                name={i.name}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-3 items-center">
          {Column2.map((i) => (
            <div
              className="flex flex-col items-center justify-start"
              key={i.name}
            >
              <label className="text-xl">{i.name}</label>
              <input
                type="text"
                className="border-2 border-slate-300 px-2 py-1 rounded-md w-full focus:outline-none "
                value={state[i.name as keyof InitialState]}
                onChange={(e) =>
                  dispatch({
                    type: i.name as keyof InitialState,
                    payload: { value: e.target.value },
                  })
                }
                name={i.name}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <button
          className="p-4 bg-blue-600 text-white rounded-md"
          onClick={() => {
            !AddItemToInvoice ? AddItem(state) : AddItemToInvoice(state);
            closeQuotation((p) => !p);
            ctx.setToggle();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddQuotation;
