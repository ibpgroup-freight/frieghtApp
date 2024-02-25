import React from "react";
import { useContext } from "react";
import { ModalCtx } from "../store/Modal";
import useItemStore from "../store/Item";
import { useFormik, FormikProvider, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
type qprops = {
  closeQuotation: React.Dispatch<React.SetStateAction<boolean>>;
  AddItemToInvoice?: (item: QuotationItem) => void;
  quotationType?: string;
};
const validationSchema = Yup.object().shape({
  QuoteValidity: Yup.string().when("type", {
    is: (type: string) => !type?.includes("BillOfLading"),
    then: (schema) => schema.required("Quote Validity is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  Charges: Yup.string().when("type", {
    is: (type: string) => !type?.includes("BillOfLading"),
    then: (schema) => schema.required("Charges required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  ChargeDescription: Yup.string().when("type", {
    is: (type: string) => !type?.includes("BillOfLading"),
    then: (schema) => schema.required("Charge Description is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // UnitPerKg: Yup.number().required("Unit Per Kg is required"),
  type: Yup.string(),
  Currency: Yup.string().when("type", {
    is: (type: string) => !type?.includes("BillOfLading"),
    then: (schema) => schema.required("Currency is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  RateAmountPerUnit: Yup.string().when("type", {
    is: (type: string) => !type?.includes("BillOfLading"),
    then: (schema) => schema.required("Rate Amount Per Unit is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  MinRateAmountPerUnit: Yup.string().when("type", {
    is: (type: string) => !type?.includes("BillOfLading"),
    then: (schema) => schema.required("Min Rate Amount Per Unit is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  NoOfPackages: Yup.string().when("type", {
    is: (type: string) => type?.includes("BillOfLading"),
    then: (schema) => schema.required("No Of Packages are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  PackageDescription: Yup.string().when("type", {
    is: (type: string) => type?.includes("BillOfLading"),
    then: (schema) => schema.required("Package Description is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  SealNo: Yup.string().when("type", {
    is: (type: string) => type?.includes("BillOfLading"),
    then: (schema) => schema.required("SealNo is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  ContainerNo: Yup.string().when("type", {
    is: (type: string) => type?.includes("BillOfLading"),
    then: (schema) => schema.required("ContainerNo is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // MinCostAmountPerUnit: Yup.string().required(
  //   "Cost Amount Per Unit is required"
  // ),
  // CostAmountPerUnit: Yup.string().required(
  //   "Min Cost Amount Per Unit is required"
  // ),
  // minUnits: Yup.string().required("min Units are required"),
  // maxUnits: Yup.string().required("max Units are required"),
  Units: Yup.string().when("type", {
    is: (type: string) => !type?.includes("BillOfLading"),
    then: (schema) => schema.required("Units Are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  Weight: Yup.string(),
  Dimensions: Yup.string(),
});

const InitialState = {
  id: "",
  QuoteValidity: "",
  Charges: "",
  ChargeDescription: "",
  // UnitPerKg: "",
  Currency: "",
  RateAmountPerUnit: "",
  MinRateAmountPerUnit: "",
  // MinCostAmountPerUnit: "",
  // CostAmountPerUnit: "",
  Units: "",
  Dimensions: "",
  Weight: "",
  ContainerNo: "",
  SealNo: "",
  NoOfPackages: "",
  PackageDescription: "",
  type: "",
};
// const AddQuotationReducer = (state: QuotationItem, action: QuotationAction) => {
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
function AddQuotation({
  closeQuotation,
  AddItemToInvoice,
  quotationType,
}: qprops) {
  // const [val, setval] = React.useState("");
  const { AddItem, items } = useItemStore();
  // const [state, dispatch] = React.useReducer(AddQuotationReducer, InitialState);
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
    { label: "Charge", name: "Charges", type: "text" },
    { label: "Charge Description", name: "ChargeDescription" },
    { label: "Quote Validity", name: "QuoteValidity", type: "text" },
    // { label: "Max Units", name: "maxUnits", type: "number" },
    // { label: "Min Units", name: "minUnits", type: "number" },
    { label: "Units", name: "Units", type: "text" },
    { label: "Weight (Optional)", name: "Weight", type: "number" },
    { label: "Dimensions (Optional)", name: "Dimensions", type: "text" },
  ];
  const Column2 = [
    {
      label: "Currency",
      name: "Currency",
      type: "text",
      options: ["USD", "Euro"],
    },
    { label: "Amount Per Unit", name: "RateAmountPerUnit" },
    { label: "Min Amount Per Unit", name: "MinRateAmountPerUnit" },
  ];
  const laddingBillColumns = [
    {
      label: "No of Packages",
      name: "NoOfPackages",
      type: "number",
      options: [],
    },
    {
      label: "Package Description",
      name: "PackageDescription",
      type: "number",
    },
    { label: "Container Number", name: "ContainerNo", type: "number" },
    { label: "Seal Number", name: "SealNo", type: "number" },
    { label: "Measurement", name: "Measurement", type: "text" },
    { label: "Weight", name: "Weight", type: "number" },
  ];
  // const Column3 = [
  //   {
  //     label: "Currency",
  //     name: "Currency",
  //     type: "text",
  //     options: ["USD", "Euro"],
  //   },
  //   { label: "Amount Per Unit", name: "CostAmountPerUnit" },
  //   { label: "Min Amount Per Unit", name: "MinCostAmountPerUnit" },
  // ];
  console.log(formikobj.errors);
  return (
    <FormikProvider value={formikobj}>
      <div className=" mx-auto md:w-3/5 px-10 bg-white border border-black z-1000 py-10 rounded-md">
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.nativeEvent.preventDefault();
            e.nativeEvent.stopImmediatePropagation();
            formikobj.handleSubmit(e);
          }}
        >
          <div
            className="text-white  bg-red-600  p-1 px-3 cursor-pointer rounded-full text-xl absolute right-9"
            onClick={(e) => {
              ctx.setToggle();
              closeQuotation((p) => !p);
            }}
          >
            X
          </div>
          <h2 className=" text-4xl text-black-800 w-full font-serif text-center  uppercase ">
            Add Item
          </h2>
          <hr className="mb-10 mt-5"></hr>
          <div className="flex flex-col sm:flex-row justify-evenly">
            {quotationType !== "BillOfLading" && (
              <div className="flex flex-col space-y-3 items-center">
                <h1 className="text-2xl text-black-800 w-full font-serif text-center">
                  Info Section
                </h1>
                {Column1.map((i) => (
                  <div
                    className="flex flex-col items-center justify-start"
                    key={i.name}
                  >
                    <label className="text-xl">{i.label}</label>
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
            )}
            {quotationType !== "BillOfLading" && (
              <div className="flex flex-col space-y-2 items-center">
                <h2 className="text-2xl text-black-800 w-full font-serif text-center">
                  Rate Section
                </h2>
                {Column2.map((i) => (
                  <div
                    className="flex flex-col items-center justify-start"
                    key={i.name}
                  >
                    <label className="text-xl">{i.label}</label>
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
            )}
            {quotationType === "BillOfLading" && (
              <div className="flex flex-col space-y-2 items-center">
                <h2 className="text-2xl text-black-800 w-full font-serif text-center">
                  Information
                </h2>
                {laddingBillColumns.map((i) => (
                  <div
                    className="flex flex-col items-center justify-start"
                    key={i.name}
                  >
                    <label className="text-xl">{i.label}</label>
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
            )}
            {/* <div className="flex flex-col space-y-2 items-center">
              <h2 className="text-2xl text-black-800 w-full font-serif text-center">
                Cost Section
              </h2>
              {Column3.map((i) => (
                <div
                  className="flex flex-col items-center justify-start"
                  key={i.name}
                >
                  <label className="text-xl">{i.label}</label>
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
            </div> */}
          </div>

          <div className="flex justify-center mt-5">
            <button className="p-4 bg-blue-600 text-white rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </FormikProvider>
  );
}

export default AddQuotation;
