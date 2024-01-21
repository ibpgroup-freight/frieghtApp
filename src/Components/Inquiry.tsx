import React, { useReducer } from "react";
import useInquiryItem from "../store/Inquiry";
import * as Yup from "yup";
import { ErrorMessage, Field, useFormik, FormikProvider } from "formik";
const validationSchema = Yup.object().shape(
  {
    CustomerName: Yup.string()
      .required("Customer Name is required")
      .min(5, "Atleast 5 Characters Long"),
    CustomerAddress: Yup.string()
      .required("Customer Address is required")
      .min(5, "Atleast 5 Characters Long"),
    SalesPerson: Yup.string()
      .required("Sales Person is required")
      .min(5, "Atleast 5 Characters Long"),
    PortOfOrigin: Yup.string()
      .required("Port of Origin is required")
      .min(5, "Atleast 3 Characters Long"),
    PortOfDestination: Yup.string()
      .required("Port of Destination is required")
      .min(5, "Atleast 3 Characters Long"),
    Weight: Yup.string().required("Weight is required"),
    Dimensions: Yup.string()
      .required("Dimensions are required")
      .min(5, "Atleast 5 Characters Long"),
    TransitTime: Yup.string().required("Transit Time is required"),
    ShipmentTerms: Yup.string().required("Shipment Terms are required"),
    ContainerType: Yup.string().when(
      "CustomContainerType",
      ([CustomContainerType], schema) => {
        return CustomContainerType
          ? schema.notRequired()
          : schema
              .min(5, "At least 5 Characters Long")
              .required(
                "Either Container Type Or Custom Container Type is required"
              );
      }
    ),
    CarrierName: Yup.string()
      .required("Carrier Name is required")
      .min(5, "Atleast 5 Characters Long"),
    CustomContainerType: Yup.string().when(
      "ContainerType",
      ([ContainerType], schema) => {
        return ContainerType
          ? schema.notRequired()
          : schema.required(
              "Either Container Type Or Custom Container Type is required"
            );
      }
    ),

    // Add validation rules for other fields
  },
  [["CustomContainerType", "ContainerType"]]
);
// const InquiryReducer = (state: Inquiry, action: action) => {
//   switch (action.type) {
//     case "CustomerName":
//     case "CustomerAddress":
//     case "SalesPerson":
//     case "PortOfOrigin":
//     case "PortOfDestination":
//     case "Weight":
//     case "Dimensions":
//     case "TransitTime":
//     case "ShipmentTerms":
//     case "ContainerType":
//     case "CustomContainerType":
//     case "CarrierName":
//       return {
//         ...state,
//         [action.type.toString()]: action.payload.value,
//       };
//     default:
//       return { ...state };
//   }
// };
function Inquiry(props: InquiryAndQuotationProps) {
  const { inquiry, setItemInquiry } = useInquiryItem();

  // const [state, dispatch] = useReducer(InquiryReducer, inquiry);
  const formik = useFormik({
    initialValues: inquiry,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      setItemInquiry(values);
      props.setstepNumber((prevStep) => prevStep + 1);
    },
  });

  console.log(inquiry);
  const Column1Items = [
    { label: "Enter Customer Name", name: "CustomerName", type: "text" },
    { label: "Enter Customer Address", name: "CustomerAddress", type: "text" },
    { label: "Enter Sales Person", name: "SalesPerson", type: "text" },
    { label: "Enter Port Of Origin", name: "PortOfOrigin", type: "text" },
    {
      label: "Enter Port Of Destination",
      name: "PortOfDestination",
      type: "text",
    },
  ];
  const Column2 = [
    { label: "Enter Weight", name: "Weight", type: "number" },
    { label: "Enter Dimensions", name: "Dimensions", type: "text" },
    {
      label: "Enter Transit Time",
      name: "TransitTime",
      type: "datetime-local",
      options: [],
    },
    {
      label: "Container Type",
      name: "ContainerType",
      type: "select",
      options: [
        "20ft",
        "40ft",
        "40 HC",
        "45 HC",
        "20 OT",
        "40 OT",
        "20 FR",
        "40 FR",
        "20 RF",
        "40 RF",
        "RORO",
        "Break Bulk",
      ],
    },
    {
      label: "Custom Container Type",
      name: "CustomContainerType",
      type: "text",
    },
  ];
  const Column3 = [
    {
      label: "Enter Shipment Terms",
      name: "ShipmentTerms",
      type: "select",
      options: [
        "Exworks",
        "FOB",
        "FCA",
        "EXW",
        "FCA",
        "FAS",
        "FOB",
        "CFR",
        "CIF",
        "CPT",
        "CIP",
        "DPU",
        "DAP",
        "DDP",
      ],
    },

    { label: "Enter Carrier Name", name: "CarrierName", type: "text" },
  ];
  return (
    <FormikProvider value={formik}>
      <div className="w-full flex flex-col justify-center space-y-7 py-5 flex-wrap ">
        <form onSubmit={formik.handleSubmit}>
          <div className="px-5 flex flex-col lg:flex-row justify-between w-full my-5">
            <div className="flex flex-col space-y-1">
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
            <div className="flex flex-col space-y-1">
              {Column2.map((i) => (
                <div key={i.name} className="px-4">
                  <label className="text-xl" key={i.name}>
                    {i.label}
                  </label>
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
            <div className="flex flex-col space-y-1">
              {Column3.map((i) => (
                <div key={i.name} className="px-4">
                  <label className="text-xl" key={i.name}>
                    {i.label}
                  </label>
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
          </div>

          <div className="flex w-full justify-center">
            <button
              className="bg-blue-700 text-white rounded-md px-5 py-3 text-2xl text-center"
              type="submit"
            >
              Add And Proceed To {props.actionName}
            </button>
          </div>
        </form>
      </div>
    </FormikProvider>
  );
}

export default Inquiry;
