import React, { useState, useReducer } from "react";
import AddQuotation from "./AddQuotation";
import { useContext } from "react";
import { ModalCtx } from "../store/Modal";
import useItemStore from "../store/Item";
import useInquiryItem from "../store/Inquiry";
import { toast } from "react-toastify";

// const quotation: QuotationItem = {
//   id: "",
//   QuoteValidity: "",
//   Charges: "",
//   ChargeDescription: "",
//   UnitPerKg: "",
//   Currency: "",
//   RateAmountPerUnit: "",
//   MinRateAmountPerUnit: "",
//   MinCostAmountPerUnit: "",
//   CostAmountPerUnit: "",
// };

// const QuotationReducer = (state: QuotationItem, action: QuotationAction) => {
//   switch (action.type) {
//     case "AmountPerUnit":
//     case "ChargeDescription":
//     case "Charges":
//     case "CostAndSellSection":
//     case "Currency":
//     case "QuoteValidity":
//     case "UnitPerKg":
//       return { ...state, [action.type]: action.payload.value };
//     default:
//       return { ...state };
//   }
// };
function Quotation(props: InquiryAndQuotationProps) {
  const ctx = useContext(ModalCtx);
  const { items } = useItemStore();
  const { inquiry } = useInquiryItem();
  // const [state, dispatch] = useReducer(QuotationReducer, quotation);
  const [showQuotation, setshowQuotation] = useState(false);
  const Column1 = [
    { label: "Index", name: "Sr no" },
    { label: "Quote Validity", name: "QuoteValidity" },
    { label: "Charges", name: "Charges" },
    { label: "Charge Description", name: "ChargeDescription" },
    {
      label: "Units",
      name: "Units",
      subheadings: ["Min", "Max"],
    },
    {
      label: "Rate",
      name: "Rate",
      subheadings: ["Cost Per Unit", "Min", "Max"],
    },

    {
      label: "Cost",
      name: "Cost",
      subheadings: ["Cost Per Unit", "Min", "Max"],
    },
    { label: "Currency", name: "Currency" },
    // { label: "Amount Per Unit", name: "AmountPerUnit" },
    // { label: "Cost And Sell Section", name: "CostAndSellSection" },
  ];
  console.log("Inq", inquiry);
  return (
    <div className="w-full">
      <div className={`md:px-5 flex justify-evenly  w-full `}>
        {showQuotation && <AddQuotation closeQuotation={setshowQuotation} />}
        <div className=" w-full overflow-auto mt-20">
          <table className="border overflow-x-auto w-full ml-30 border-slate-400 md:border-spacing-x-10 md:border-spacing-y-2">
            <thead>
              <tr>
                {Column1.map((column) => (
                  <React.Fragment key={column.name}>
                    <th
                      className="border border-slate-300 p-4 bg-blue-50 w-auto"
                      colSpan={
                        column.subheadings ? column.subheadings.length : 1
                      }
                    >
                      {column.label}
                      {column.subheadings &&
                        column.subheadings.map((subheading, subIndex) => (
                          <th
                            className="px-4 border-t-2 border-black text-center"
                            key={`${column.name}_${subIndex}`}
                            colSpan={1}
                          >
                            {subheading}
                          </th>
                        ))}
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            {items && (
              <tbody>
                {items.map((i, index) => (
                  <tr>
                    <td className="border border-slate-300 p-4">{index + 1}</td>
                    <td className="border border-slate-300 p-4">
                      {i.QuoteValidity}
                    </td>
                    <td className="border border-slate-300 p-4">{i.Charges}</td>
                    <td className="border border-slate-300 p-4">
                      {i.ChargeDescription}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.minUnits}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.maxUnits}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {/* {i.UnitPerKg} */}
                      {i.RateAmountPerUnit}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.MinRateAmountPerUnit}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.MinRateAmountPerUnit}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {/* {i.UnitPerKg} */}
                      {i.CostAmountPerUnit}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.MinCostAmountPerUnit}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.MinCostAmountPerUnit}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.Currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        <div className="absolute right-20">
          <button
            className="text-2xl rounded-full text-green-600"
            onClick={(e) => {
              console.log("Here");
              setshowQuotation(true);
              ctx.setToggle();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height={70}
              width={70}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  opacity="0.5"
                  d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"
                  fill="#054d00"
                ></path>{" "}
                <path
                  d="M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                  fill="#054d00"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex w-full justify-center my-10">
        <button
          className="bg-blue-700 text-white rounded-md px-5 py-3 text-2xl text-center"
          onClick={() => {
            if (items.length <= 0) return toast.info("Add Some Items First");
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
