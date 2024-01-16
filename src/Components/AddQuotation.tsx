import React from "react";
import { useContext } from "react";
import { ModalCtx } from "../store/Modal";
import useItemStore from "../store/Item";
import { useFormik, FormikProvider, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
type qprops = {
  closeQuotation: React.Dispatch<React.SetStateAction<boolean>>;
  AddItemToInvoice?: (item: QuotationItem) => void;
};
const validationSchema = Yup.object().shape({
  QuoteValidity: Yup.string().required("Quote Validity is required"),
  Charges: Yup.number().required("Charges is required"),
  ChargeDescription: Yup.string().required("Charge Description is required"),
  UnitPerKg: Yup.number().required("Unit Per Kg is required"),
  Currency: Yup.string().required("Currency is required"),
  AmountPerUnit: Yup.string().required("Amount Per Unit is required"),
  CostAndSellSection: Yup.string().required(
    "Cost And Sell Section is required"
  ),
});

const InitialState = {
  id: "",
  QuoteValidity: "",
  Charges: "",
  ChargeDescription: "",
  UnitPerKg: "",
  Currency: "",
  AmountPerUnit: "",
  CostAndSellSection: "",
};
const AddQuotationReducer = (state: QuotationItem, action: QuotationAction) => {
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
  const { AddItem, items } = useItemStore();
  const [state, dispatch] = React.useReducer(AddQuotationReducer, InitialState);
  const formikobj = useFormik({
    initialValues: InitialState,
    validationSchema,
    onSubmit: (values) => {
      !AddItemToInvoice ? AddItem(values) : AddItemToInvoice(values);
      closeQuotation((p) => !p);
      ctx.setToggle();
    },
  });
  const ctx = useContext(ModalCtx);
  const Column1 = [
    { label: "Quote Validity", name: "QuoteValidity", type: "text" },
    { label: "Charges", name: "Charges", type: "number" },
    { label: "Charge Description", name: "ChargeDescription" },
  ];
  const Column2 = [
    { label: "Unit Per Kg", name: "UnitPerKg", type: "number" },
    {
      label: "Currency",
      name: "Currency",
      type: "select",
      options: ["USD", "Euro"],
    },
    { label: "Amount Per Unit", name: "AmountPerUnit" },
    { label: "Cost And Sell Section", name: "CostAndSellSection" },
  ];
  return (
    <FormikProvider value={formikobj}>
      <div className="absolute  md:w-3/5 bg-white border border-slate-500 z-50 py-10 rounded-md">
        <form onSubmit={formikobj.handleSubmit}>
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
          <div className="flex flex-col md:flex-row justify-evenly">
            <div className="flex flex-col space-y-2 items-center">
              {Column2.map((i) => (
                <div
                  className="flex flex-col items-center justify-start"
                  key={i.name}
                >
                  <label className="text-xl">{i.name}</label>
                  {i.type === "select" ? (
                    <>
                      <Field
                        as="select"
                        name={i.name}
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select Value </option>
                        {i.options?.map((o) => (
                          <option value={o} key={o}>
                            {o}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name={i.name}
                        component="div"
                        className="text-red-500"
                      />
                    </>
                  ) : (
                    <>
                      <Field
                        type={i.type}
                        name={i.name}
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      />
                      <ErrorMessage
                        name={i.name}
                        component="div"
                        className="text-red-500"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-3 items-center">
              {Column1.map((i) => (
                <div
                  className="flex flex-col items-center justify-start"
                  key={i.name}
                >
                  <label className="text-xl">{i.name}</label>
                  <Field
                    type={i.type}
                    name={i.name}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name={i.name}
                    component="div"
                    className="text-red-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button
              className="p-4 bg-blue-600 text-white rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </FormikProvider>
  );
}

export default AddQuotation;
