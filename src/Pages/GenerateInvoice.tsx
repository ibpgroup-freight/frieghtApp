import React from "react";
import { useState } from "react";
import AddQuotation from "../Components/AddQuotation";
import { ModalCtx } from "../store/Modal";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik, Field, ErrorMessage, FormikProvider } from "formik";
import { toast } from "react-toastify";
import useinvoiceStore from "../store/Invoice";
// const init = {
//   CustomerName: "",
//   CustomerAddress: "",
//   SalesPerson: "",
//   PortOfOrigin: "",
//   PortOfDestination: "",
//   TransitTime: "",
//   CarrierName: "",
//   ContainerType: "",
//   TodaysDate: "",
//   CustomerPhone: "",
//   CustomerEmail: "",
//   CustomerTRN: "",
//   Jobid: "",
// };
const validationSchema = yup.object().shape({
  Jobid: yup.string().required("Job Id is required"),
  CustomerName: yup.string().required("Customer Name is required"),
  CustomerAddress: yup.string().required("Customer Address is required"),
  SalesPerson: yup.string().required("Sales Person is required"),
  PortOfOrigin: yup.string().required("Port of Origin is required"),
  PortOfDestination: yup.string().required("Port of Destination is required"),
  CarrierName: yup.string().required("Carrier Name is required"),
  TodaysDate: yup.string().required("Carrier Name is required"),
  TransitTime: yup.string().required("Transit Time is required"),
  CustomerEmail: yup
    .string()
    .email("Invalid email")
    .required("Customer Email is required"),
  CustomerPhone: yup
    .string()
    .matches(/^\d+$/, "Invalid phone number")
    .required("Customer Phone is required"),
  CustomerTRN: yup
    .string()
    .matches(/^\d+$/, "Invalid TRN")
    .required("Customer TRN is required"),
});

function GenerateInvoice() {
  const [showQuotation, setshowQuotation] = useState(false);
  const ctx = useContext(ModalCtx);
  const { Items: temp_Items, jobInfo, setInfo, setItems } = useinvoiceStore();
  const navigate = useNavigate();

  const [items, setitems] = useState<QuotationItem[]>(temp_Items);
  // const [state, dispatch] = React.useReducer(InquiryReducer, inq);
  const formikObj = useFormik({
    initialValues: jobInfo,
    onSubmit(values) {
      console.log("Here");
      if (items.length === 0) {
        toast.error("Add Some Items First");
        return;
      }
      setInfo(values);
      setItems(items);
      navigate("/testPdf", {
        state: {
          items,
          jobInfo: values,
        },
      });
    },
    validationSchema,
  });
  const Column1 = [
    { label: "Quote Validity", name: "QuoteValidity", type: "text" },
    { label: "Charges", name: "Charges", type: "text" },
    { label: "Charge Description", name: "ChargeDescription", type: "text" },
    { label: "Unit Per Kg", name: "UnitPerKg", type: "number" },
    { label: "Currency", name: "Currency", type: "number" },
    { label: "Amount Per Unit", name: "AmountPerUnit", type: "number" },
    { label: "Cost And Sell Section", name: "CostAndSellSection" },
  ];
  const Column1Items = [
    { label: "Enter Job Id", name: "Jobid", type: "text" },
    { label: "Enter Customer Name", name: "CustomerName", type: "text" },
    { label: "Enter Customer Address", name: "CustomerAddress", type: "text" },
    { label: "Enter Sales Person", name: "SalesPerson", type: "text" },
    { label: "Enter Port Of Origin", name: "PortOfOrigin", type: "text" },
    {
      label: "Enter Port Of Destination",
      name: "PortOfDestination",
      type: "text",
    },
    { label: "Enter Carrier Name", name: "CarrierName", type: "text" },
    {
      label: "Enter Any Outstanding Dues",
      name: "OutstandingDues",
      type: "number",
    },
  ];
  const Column2Items = [
    { label: "Enter Customer Email", name: "CustomerEmail", type: "text" },
    {
      label: "Enter Customer Phone Number",
      name: "CustomerPhone",
      type: "text",
    },
    { label: "Enter Customer TRN", name: "CustomerTRN", type: "number" },
    {
      label: "Enter Transit Time",
      name: "TransitTime",
      type: "datetime-local",
    },
    { label: "Enter Todays Date", name: "TodaysDate", type: "date" },

    { label: "Enter Discount If Applicable", name: "Discount", type: "number" },
    { label: "Enter VAT Amount", name: "VATAmount", type: "number" },
  ];
  console.log(temp_Items, "   ", jobInfo);
  return (
    <FormikProvider value={formikObj}>
      <div className="flex flex-col w-full py-4 space-y-3 items-center">
        <div className="relative mx-auto w-5/6 ">
          {showQuotation && (
            <AddQuotation
              closeQuotation={setshowQuotation}
              AddItemToInvoice={(item: QuotationItem) =>
                setitems((p) => [...p, item])
              }
            />
          )}
        </div>

        <h1 className="text-5xl text-center text-blue-600 font-serif">
          Generate Invoice
        </h1>

        <div className="w-4.5/5">
          <h1 className="text-xl text-center text-blue-900 font-serif">
            Invoice Details
          </h1>
          <form onSubmit={formikObj.handleSubmit}>
            <div className="flex  flex-col lg:flex-row justify-between space-y-2">
              <div className="2/5">
                {Column1Items.map((i) => (
                  <div key={i.name} className="px-4">
                    <label className="text-xl" key={i.name}>
                      {i.label}
                    </label>
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
              <div className="2/5">
                {Column2Items.map((i) => (
                  <div key={i.name} className="px-4">
                    <label className="text-xl" key={i.name}>
                      {i.label}
                    </label>
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

            <div className="space-y-2 w-5/5">
              <h1 className="text-xl text-center text-blue-900 font-serif">
                Add Services
              </h1>
              <div className="w-3/5 md:w-full overflow-auto">
                <table className="border overflow-x-auto w-full ml-30 border-slate-400 md:border-spacing-x-10 md:border-spacing-y-2">
                  <thead>
                    <tr>
                      {Column1.map((i) => (
                        <th
                          className="border border-slate-300 p-4"
                          key={i.name}
                        >
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
                          <td className="border border-slate-300 p-4">
                            {i.Charges}
                          </td>
                          <td className="border border-slate-300 p-4">
                            {i.ChargeDescription}
                          </td>
                          {/* <td className="border border-slate-300 p-4">
                            {i.UnitPerKg}
                          </td> */}
                          <td className="border border-slate-300 p-4">
                            {i.Currency}
                          </td>
                          {/* <td className="border border-slate-300 p-4">
                            {i.AmountPerUnit}
                          </td>
                          <td className="border border-slate-300 p-4">
                            {i.CostAndSellSection}
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  )}
                  <ErrorMessage
                    name="items"
                    component="div"
                    className="text-red-500"
                  />
                </table>
                <div className="absolute right-40">
                  <button
                    type="button"
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
              type="submit"
              className="bg-blue-700 w-3/6 mx-2 my-5 text-white rounded-lg px-5 py-3 text-2xl text-center"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}

export default GenerateInvoice;
