import React, { useCallback, useRef } from "react";
import { useState } from "react";
import AddQuotation from "../Components/AddQuotation";
import { ModalCtx } from "../store/Modal";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik, Field, ErrorMessage, FormikProvider } from "formik";
import { toast } from "react-toastify";
import useinvoiceStore from "../store/Invoice";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";
import useJob from "../store/Jobs";
import { LoaderIcon } from "react-hot-toast";
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
const validationSchema = yup.object().shape(
  {
    CustomerName: yup.string().required("Customer Name is required"),
    CustomerAddress: yup.string().required("Customer Address is required"),
    CustomerEmail: yup.string().required("Customer Email is required"),
    CustomerPhoneNo: yup.string().required("Customer Phone Number is required"),
    SalesPerson: yup.string().required("Sales Person is required"),
    VehicleDetails: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Road"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Vehicle Details required"),
    DriverDetails: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Road"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Driver Details required"),
    RouteDetails: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Road"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Route Details required"),
    PlaceOfOrigin: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Road"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Place of Origin is required"),
    PlaceOfDestination: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Road"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Place of Destination is required"),
    PortOfOrigin: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Sea"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Port of Origin is required"),
    PortOfDestination: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Sea"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Port of Destination is required"),
    AirportOfOrigin: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Air"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Airport of Origin is required"),
    AirportOfDestination: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Air"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Airport of Destination is required"),
    CarrierName: yup.string().required("Carrier Name is required"),
    // address: yup.string().required("Which Address you want to Choose"),
    // TodaysDate: yup.string().required("Carrier Name is required"),
    TransitTime: yup.string().required("Transit Time is required"),
    type: yup.string().required("Type of bill is Required"),
    CustomerTRN: yup
      .string()
      .matches(/^\d+$/, "Invalid TRN")
      .required("Customer TRN is required"),
    Weight: yup.string().required("Weight is required"),
    Dimensions: yup.string().required("Dimensions are required"),
    ShipmentTerms: yup.string().required("Shipment Terms are required"),
    TypeOfCargo: yup.string().required("Type of Cargo is required"),
    FlightInformation: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Air"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .notRequired(),
    VesselName: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Sea"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Carrier Name is required"),
    VesselDetails: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Sea"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Vessel Details are required"),
    ShippingLaneDetails: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Sea"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Shipping Lane Details are required"),
    Departure: yup.string().required("Departure Time is required"),
    EstimatedArrival: yup
      .string()
      .required("Estimated Arrival Time is required"),
    ContainerType: yup.string(),
    CustomContainerType: yup.string(),
  },
  [["ContainerType", "CustomContainerType"]]
);

function GenerateJob() {
  const [showQuotation, setshowQuotation] = useState(false);
  const ctx = useContext(ModalCtx);
  const {
    Items: temp_Items,
    jobInfo,
    setInfo,
    setItems: setInvoiceItems,
  } = useinvoiceStore();
  const { setItemInquiry, inquiry, prestation } = useInquiryItem();
  const { setitemsArray, items: quotationItemsStore } = useItemStore();
  const { setJob } = useJob();
  const navigate = useNavigate();
  const [loadingdetails, setloadingdetails] = useState<boolean>(false);
  const quotationidRef = useRef<HTMLInputElement | null>(null);
  const [isloading, setisloading] = useState<boolean>(false);
  // const [items, setitems] = useState<QuotationItem[]>(
  //   quotationItemsStore || []
  // );
  // const [state, dispatch] = React.useReducer(InquiryReducer, inq);
  const filljobDetailsbyId = useCallback(async () => {
    try {
      setloadingdetails(true);
      console.log("job", quotationidRef.current?.value);
      const docs = await getDocs(
        query(
          collection(db, "quotations"),
          where("quotationId", "==", quotationidRef.current?.value!)
        )
      );
      if (docs.empty) return toast.error("No Such Job Exists");
      if (docs.docs[0]?.data().status !== "approved") {
        return toast.error("Quotation is Unapproved");
      }
      console.log("Data", docs.docs[0]?.data());
      setItemInquiry({
        ...(docs.docs[0]?.data()?.inquiry as Inquiry),
        quotationId: docs.docs[0]?.data()?.quotationId,
        jobInitials: docs.docs[0]?.data()?.jobInitials,
        method: docs.docs[0]?.data()?.method,
      });
      setitemsArray(docs.docs[0]?.data()?.Items as QuotationItem[]);
      // setInfo(docs.docs[0]?.data()?.inquiry as Inquiry);
      // setItems(docs.docs[0]?.data()?.Items as QuotationItem[]);
      toast.success("Filled Details");
    } catch (e) {
      toast.error("No Such Job");
    } finally {
      setloadingdetails(false);
    }
  }, [quotationidRef, loadingdetails]);
  // console.log("q", items);

  const formikObj = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...inquiry,
      Discount: 0,
      OutstandingDues: 0,
      VATAmount: 0,
    },
    async onSubmit(values) {
      try {
        if (!quotationidRef.current?.value) {
          toast.error("Please Enter A Quotation Id");
          return;
        }
        setisloading(true);
        console.log(inquiry, "inquieru");
        await setJob({
          inquiry: {
            ...values,
            method: inquiry.method,
            jobInitials: inquiry.jobInitials,
          },
          Items: quotationItemsStore,
          jobid:
            quotationidRef.current?.value!.slice(0, 2) +
            `-J-${new Date().toLocaleDateString()}-${Math.floor(
              Math.random() * 100000
            )}`,
          status: "pending",
          method: inquiry.method,
          prestation: prestation,
        });
        toast.success("Job Generated Successfully");
        navigate("/analytics");
      } catch (e) {
        console.log(e);
        toast.error("Failed To Generate Job");
      } finally {
        setisloading(false);
      }
      console.log("Here");
    },
    validationSchema,
  });
  console.log("qi", formikObj.errors);

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

    // {
    //   label: "Cost",
    //   name: "Cost",
    //   subheadings: ["Cost Per Unit", "Min", "Max"],
    // },
    { label: "Currency", name: "Currency" },
    // { label: "Amount Per Unit", name: "AmountPerUnit" },
    // { label: "Cost And Sell Section", name: "CostAndSellSection" },
  ];
  console.log(formikObj.values.type, "type");
  const Column1Items = [
    { label: "Enter Customer Name", name: "CustomerName", type: "text" },
    { label: "Enter Customer Address", name: "CustomerAddress", type: "text" },
    { label: "Enter Sales Person", name: "SalesPerson", type: "text" },
    ...(formikObj.values.type?.includes("Air") ||
    formikObj.values.type?.includes("air")
      ? [
          {
            label: "Enter Airport Of Origin",
            name: "AirportOfOrigin",
            type: "text",
          },
          {
            label: "Enter Airport Of Destination",
            name: "AirportOfDestination",
            type: "text",
          },
          {
            label: "Flight Information",
            name: "FlightInformation",
            type: "textarea",
          },
        ]
      : []),
    ...(formikObj.values.type?.includes("Lading") ||
    formikObj.values.type?.includes("lading")
      ? [
          {
            label: "Movement",
            name: "Movement",
            type: "text",
          },
          {
            label: "Enter Place Of Delivery",
            name: "PlaceOfDelivery",
            type: "text",
          },
          {
            label: "Enter Place Of Receipt",
            name: "Enter Place Of Receipt",
            type: "text",
          },
        ]
      : []),
    ...(formikObj.values.type?.includes("Road") ||
    formikObj.values.type?.includes("road")
      ? [
          {
            label: "Enter Place Of Origin",
            name: "PlaceOfOrigin",
            type: "text",
          },
          {
            label: "Enter Place Of Destination",
            name: "PlaceOfDestination",
            type: "text",
          },

          {
            label: "Enter Vehicle Details",
            name: "VehicleDetails",
            type: "textarea",
          },
          {
            label: "Enter Driver Details",
            name: "DriverDetails",
            type: "textarea",
          },
          {
            label: "Enter Route Details",
            name: "RouteDetails",
            type: "textarea",
          },
        ]
      : []),
    ...(formikObj.values.type?.includes("Sea") ||
    formikObj.values.type?.includes("sea")
      ? [
          { label: "Enter Port Of Origin", name: "PortOfOrigin", type: "text" },
          {
            label: "Enter Port Of Destination",
            name: "PortOfDestination",
            type: "text",
          },
          {
            label: "Enter Vessel Name",
            name: "VesselName",
            type: "textarea",
          },
          {
            label: "Enter Vessel Details",
            name: "VesselDetails",
            type: "textarea",
          },
          {
            label: "Enter Shipping Lane Details",
            name: "ShippingLaneDetails",
            type: "textarea",
          },
        ]
      : []),
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
      name: "CustomerPhoneNo",
      type: "text",
    },
    ...(!formikObj.values.type?.includes("air")
      ? [
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
        ]
      : []),
    { label: "Enter Customer TRN", name: "CustomerTRN", type: "number" },
    {
      label: "Enter Transit Time",
      name: "TransitTime",
      type: "number",
    },
    { label: "Enter Todays Date", name: "TodaysDate", type: "date" },

    {
      label: "Departure",
      name: "Departure",
      type: "datetime-local",
    },
    {
      label: "Estimated Arrival",
      name: "EstimatedArrival",
      type: "datetime-local",
    },
  ];
  console.log(temp_Items, "   ", jobInfo);
  return (
    <div>
      <div className="relative mx-auto w-full">
        {showQuotation && (
          <AddQuotation
            closeQuotation={setshowQuotation}
            AddItemToInvoice={(item: QuotationItem) =>
              // setitems((p) => [...p, item])
              setitemsArray([...quotationItemsStore, item])
            }
          />
        )}
      </div>
      <FormikProvider value={formikObj}>
        <div className="flex flex-col w-full py-4 space-y-3 items-center">
          <h1 className="text-5xl text-center text-blue-600 font-serif">
            Generate Job
          </h1>
          <div className="flex items-center w-3/5 justify-between">
            <label className="text-xl" htmlFor="jobid">
              Enter Quotation Id
            </label>
            <input
              type={"text"}
              name={"QuotationId"}
              placeholder="QuotationId"
              className="w-3/5 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              ref={quotationidRef}
            />
            <button
              className="bg-blue-500 text-white p-3 rounded-md"
              onClick={filljobDetailsbyId}
            >
              {loadingdetails ? (
                <LoaderIcon className="p-2 mx-auto" />
              ) : (
                "Fill Details"
              )}
            </button>
          </div>

          <div className="w-4.5/5">
            <h1 className="text-xl text-center text-blue-900 font-serif">
              Invoice Details
            </h1>
            <form
              onSubmit={formikObj.handleSubmit}
              className="w-full space-y-5 flex flex-col justify-center"
            >
              <div className="mx-auto w-3/5 items-center space-x-4 flex  justify-center space-y-2">
                <Field
                  as="select"
                  name="type"
                  className="w-3/5 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  hidden
                >
                  <option value={""}>Select Bill Tyoe</option>
                  <option value={"AirFreight"}>AirFreight Bill</option>
                  <option value={"RoadFreight"}>RoadFreight Bill</option>
                  <option value={"SeaFreight"}>SeaFreight Bill</option>
                  <option value={"BillOfLadding"}>Bill Of Ladding</option>
                </Field>
                <ErrorMessage
                  name={"type"}
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex  flex-col space-y-2">
                <h1 className="text-xl text-center text-blue-900 font-serif">
                  Fill Details
                </h1>
                <div className="w-4/5 flex flex-col lg:flex-row flex-wrap justify-center items-center lg:justify-start mx-auto gap-3">
                  {Column1Items.map((i) => (
                    <div key={i.name} className="px-4 w-2/5">
                      <label className="text-xl" key={i.name}>
                        {i.label}
                      </label>
                      <Field
                        as={i.type === "textarea" ? "textarea" : "input"}
                        type={i.type}
                        name={i.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      />
                      <ErrorMessage
                        name={i.name}
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  ))}
                </div>
                <div className="w-4/5  flex flex-col lg:flex-row flex-wrap justify-center items-center lg:justify-start mx-auto gap-3 ">
                  {Column2Items.map((i) =>
                    i.type === "select" ? (
                      <>
                        <div key={i.name} className="px-4 w-2/5">
                          <label className="text-xl" key={i.name}>
                            {i.label}
                          </label>

                          <Field
                            as="select"
                            type={i.type}
                            name={i.name}
                            className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                          >
                            <option>Select</option>
                            {i.options?.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name={i.name}
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </>
                    ) : (
                      <div key={i.name} className="px-4 w-2/5">
                        <label className="text-xl" key={i.name}>
                          {i.label}
                        </label>

                        <Field
                          as={i.type === "textarea" ? "textarea" : "input"}
                          type={i.type}
                          name={i.name}
                          className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name={i.name}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="w-full space-y-2 w-5/5">
                <h1 className="text-xl text-center text-blue-900 font-serif">
                  Add Services
                </h1>
                <div className="mx-auto w-[90%] overflow-auto mt-20">
                  <table className="border overflow-x-auto w-full ml-30 border-slate-400 md:border-spacing-x-10 md:border-spacing-y-2">
                    <thead>
                      <tr>
                        {Column1.map((column) => (
                          <React.Fragment key={column.name}>
                            <th
                              className="border border-slate-300 p-4 bg-blue-50 w-auto"
                              colSpan={
                                column.subheadings
                                  ? column.subheadings.length
                                  : 1
                              }
                            >
                              {column.label}
                              {column.subheadings &&
                                column.subheadings.map(
                                  (subheading, subIndex) => (
                                    <th
                                      className="px-4 border-t-2 border-black text-center"
                                      key={`${column.name}_${subIndex}`}
                                      colSpan={1}
                                    >
                                      {subheading}
                                    </th>
                                  )
                                )}
                            </th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>
                    {quotationItemsStore && (
                      <tbody>
                        {quotationItemsStore.map((i, index) => (
                          <tr>
                            <td className="border border-slate-300 p-4">
                              {index + 1}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.QuoteValidity}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Charges}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.ChargeDescription}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Units}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Units}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.RateAmountPerUnit}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.MinRateAmountPerUnit}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.MinRateAmountPerUnit}
                            </td>
                            {/* <td className="border border-slate-300 p-4">
                            {i.CostAmountPerUnit}
                          </td>
                          <td className="border border-slate-300 p-4">
                            {i.MinCostAmountPerUnit}
                          </td>
                          <td className="border border-slate-300 p-4">
                            {i.MinCostAmountPerUnit}
                          </td> */}
                            <td className="border border-slate-300 p-4">
                              {i.Currency}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                  <div className="absolute right-20">
                    <button
                      className="text-2xl rounded-full text-green-600"
                      onClick={(e) => {
                        console.log("Here");
                        setshowQuotation(true);
                        ctx.setToggle();
                      }}
                      type="button"
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
              </div>
              <button
                type="submit"
                className="bg-blue-700 w-40 !mx-auto   text-white rounded-lg px-5 py-3 text-2xl self-center"
              >
                {isloading ? (
                  <LoaderIcon className="p-2 mx-auto" />
                ) : (
                  "Generate Job"
                )}
              </button>
            </form>
          </div>
        </div>
      </FormikProvider>
    </div>
  );
}

export default GenerateJob;
