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
import { LoaderIcon } from "react-hot-toast";
import useCompanyInfo from "../store/CompanyInfo";
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
    Jobid: yup.string().when("type", {
      is: (type: string) =>
        !type?.includes("Lading") && !type?.includes("Airway"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    CustomerName: yup.string().required("Customer Name is required"),

    CustomerAddress: yup.string().required("Customer Address is required"),
    CustomerEmail: yup.string().required("Customer Email is required"),
    CustomerPhoneNo: yup.string().required("Customer Phone Number is required"),
    SalesPerson: yup.string().required("Sales Person is required"),
    address: yup.string().required("Your Address is required"),
    termsAndConditions: yup.string().notRequired(),
    specialInstructions: yup.string().notRequired(),
    ConsigneeReference: yup.string().notRequired(),

    type: yup.string().required("Type of bill is Required"),
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
    // TodaysDate: yup.string().required("Carrier Name is required"),
    TransitTime: yup.string().required("Transit Time is required"),
    CustomerTRN: yup
      .string()
      .matches(/^\d+$/, "Invalid TRN")
      .required("Customer TRN is required"),
    Weight: yup.string().required("Weight is required"),
    Dimensions: yup.string().when("type", {
      is: (type: string) => !type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
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
    Movement: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Lading"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Movement Details are required"),
    PlaceOfDelivery: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Lading"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Place Of Delivery required"),

    PlaceOfReceipt: yup.string().when("type", {
      is: (type: string) => type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    TotalContainers: yup.string().when("type", {
      is: (type: string) => type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    NotifyAddress: yup.string().when("type", {
      is: (type: string) => type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Currency: yup.string().when("type", {
      is: (type: string) => type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    PlaceOfIssue: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Lading"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Place Of Issue required"),
    PayableAt: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Lading"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Payable at required"),
    Departure: yup.string().required("Departure Time is required"),
    EstimatedArrival: yup
      .string()
      .required("Estimated Arrival Time is required"),
    ContainerType: yup
      .string()
      .when("CustomContainerType", ([CustomContainerType], schema) => {
        return CustomContainerType
          ? schema.notRequired()
          : schema.required(
              "Either Container Type Or Custom Container Type is required"
            );
      })
      .when("type", {
        is: (type: string) =>
          !type?.includes("Lading") && !type?.includes("Air"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
    CustomContainerType: yup
      .string()
      .when("ContainerType", ([ContainerType], schema) => {
        return ContainerType
          ? schema.notRequired()
          : schema.required(
              "Either Container Type Or Custom Container Type is required"
            );
      })
      .when("type", {
        is: (type: string) =>
          !type?.includes("Lading") && !type?.includes("Air"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
    PortOfLoading: yup.string().when("type", {
      is: (type: string) => type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    PortOfDischarge: yup.string().when("type", {
      is: (type: string) => type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    ExportReference: yup.string(),
    ForwardingAgent: yup.string(),
  },
  [["ContainerType", "CustomContainerType"]]
);

function GenerateInvoice() {
  const [showQuotation, setshowQuotation] = useState(false);
  const ctx = useContext(ModalCtx);
  const {
    Items: temp_Items,
    jobInfo,
    setInfo,
    setItems: setInvoiceItems,
    setladingItems,
    setladleInfo,
    setAirwayInfo,
    setAirwayBillItems,
  } = useinvoiceStore();
  const { setInformation } = useCompanyInfo();
  const { setItemInquiry, inquiry, resetInquiry } = useInquiryItem();
  const {
    setitemsArray,
    items: quotationItemsStore,
    ladingItems: quotationLadingItemsStore,
    resetItems,
    setBillOfLadingItems,
    AirwayItems,
    setAirwayItems,
  } = useItemStore();
  const navigate = useNavigate();
  const [loadingdetails, setloadingdetails] = useState<boolean>(false);
  const jobidRef = useRef<HTMLInputElement | null>(null);
  // const [items, setitems] = useState<QuotationItem[]>(
  //   quotationItemsStore || []
  // );
  // const [state, dispatch] = React.useReducer(InquiryReducer, inq);

  // console.log("q", items);
  const ResetFields = useCallback(() => {
    resetItems();
    resetInquiry();
  }, []);
  const formikObj = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...inquiry,
      Jobid: jobidRef.current?.value || "",
      Discount: 0,
      OutstandingDues: 0,
      VATAmount: 0,
      address: "",
      termsAndConditions: "",
      specialInstructions: "",
      PlaceOfIssue: "",
      PlaceOfDelivery: "",
      PayableAt: "",
      Movement: "",
      PlaceOfReceipt: "",
      VesselName: "",
      TotalContainers: 0,
      NotifyAddress: "",
      Currency: "",
      PortOfLoading: "",
      PortOfDischarge: "",
      ExportReference: "",
      ForwardingAgent: "",
      ConsigneeReference: "",
      AirwayBillInquiry: "",
      FlightDetails: "",
      CustomerAccount: "",
      Flight: "",
      ReferenceNumber: "",
      HandlingInformation: "",
      PaymentMethod: "",
      AccountingInformation: "",
      RequestedFlight: "",
    },
    onSubmit(values) {
      console.log("Here");
      // if (quotationItemsStore.length === 0) {
      //   toast.error("Add Some Items First");
      //   return;
      // }
      console.log(values, "all cvalues");
      if (!values.type) {
        toast.error("Select Bill Type First");
        return;
      }
      if (values.type === "BillOfLading") {
        setladleInfo(values);
        setladingItems(quotationLadingItemsStore);
      } else if (values.type === "AirwayBill") {
        setAirwayInfo(values);
        console.log("Airwat items", AirwayItems);
        setAirwayBillItems(AirwayItems);
      } else {
        setInfo(values);
        setInvoiceItems(quotationItemsStore);
      }
      if (values.type?.includes("Lading")) {
        navigate("/billofladdle");
      } else if (values.type?.includes("Airway")) {
        navigate("/airwayBill");
      } else {
        navigate("/testPdf", {
          state: {
            quotationItemsStore,
            jobInfo: values,
          },
        });
      }
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
  const billofLadleTable = [
    { label: "Index", name: "Sr no" },

    {
      label: "No of Packages",
      name: "NoOfPackages",
      type: "number",
      options: [],
    },
    { label: "Package Description", name: "Description", type: "number" },
    { label: "Container Number", name: "ContainerNo", type: "number" },
    { label: "Seal Number", name: "SealNo", type: "number" },
    { label: "Measurement", name: "Measurement", type: "text" },
    { label: "Weight (Optional)", name: "Weight", type: "number" },
  ];
  const AirwayBillTable = [
    { label: "Index", name: "Sr no" },
    {
      label: "No of Pieces",
      name: "NoPieces",
      type: "number",
      options: [],
    },
    { label: "Gross Weight", name: "GrossWeight", type: "number" },
    { label: "Unit", name: "Unit", type: "text" },
    { label: "Rate", name: "SealNo", type: "number" },
    { label: "ChargeableWeight", name: "ChargeableWeight", type: "number" },
    { label: "NatureOfGoods", name: "NatureOfGoods", type: "number" },
    { label: "Rate Per Charge", name: "RatePerCharge", type: "number" },
  ];
  const Column1Items = [
    { label: "Enter Customer Name", name: "CustomerName", type: "text" },
    { label: "Enter Customer Address", name: "CustomerAddress", type: "text" },
    { label: "Enter Sales Person", name: "SalesPerson", type: "text" },
    ...(formikObj.values.type?.includes("Air")
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
    ...(formikObj.values.type?.includes("Lading")
      ? [
          {
            label: "Notify Address",
            name: "NotifyAddress",
            type: "textarea",
          },
          {
            label: "Consignee Reference",
            name: "ConsigneeReference",
            type: "textarea",
          },
          {
            label: "Port Of Loading",
            name: "PortOfLoading",
            type: "text",
          },
          {
            label: "Port Of Discharge",
            name: "PortOfDischarge",
            type: "text",
          },
          {
            label: "Forwarding Agent",
            name: "ForwardingAgent",
            type: "textarea",
          },
          {
            label: "Export Reference",
            name: "ExportReference",
            type: "text",
          },
          {
            label: "Movement",
            name: "Movement",
            type: "textarea",
          },
          {
            label: "Notify Address",
            name: "Notify Address",
            type: "textarea",
          },
          {
            label: "Vessel Name",
            name: "VesselName",
            type: "text",
          },
          {
            label: "Enter Place Of Delivery",
            name: "PlaceOfDelivery",
            type: "text",
          },
          {
            label: "Enter Place Of Receipt",
            name: "PlaceOfReceipt",
            type: "text",
          },
        ]
      : []),
    ...(formikObj.values.type?.includes("Road")
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
    ...(formikObj.values.type?.includes("Sea")
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
    ...(!formikObj.values.type?.includes("Lading")
      ? [
          {
            label: "Enter Any Outstanding Dues",
            name: "OutstandingDues",
            type: "number",
          },
        ]
      : []),
  ];
  const Column2Items = [
    { label: "Enter Customer Email", name: "CustomerEmail", type: "text" },
    {
      label: "Enter Customer Phone Number",
      name: "CustomerPhoneNo",
      type: "text",
    },
    ...(formikObj.values.type?.includes("Lading")
      ? [
          {
            label: "Currency",
            name: "Currency",
            type: "text",
          },
          {
            label: "Weight",
            name: "Weight",
            type: "number",
          },
          {
            label: "Shipment Terms",
            name: "ShipmentTerms",
            type: "text",
          },
          {
            label: "Type Of Cargo",
            name: "TypeOfCargo",
            type: "text",
          },
          {
            label: "Place Of Issue",
            name: "PlaceOfIssue",
            type: "textarea",
          },
          {
            label: "PayableAt",
            name: "PayableAt",
            type: "textarea",
          },
        ]
      : []),
    ...(!formikObj.values.type?.includes("Lading") &&
    !formikObj.values.type?.includes("Air")
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

    ...(!formikObj.values.type?.includes("Lading")
      ? [
          {
            label: "Enter Discount If Applicable",
            name: "Discount",
            type: "number",
          },
        ]
      : []),
    ...(formikObj.values.type?.includes("Airway")
      ? [
          {
            label: "Flight Details",
            name: "FlightDetails",
            type: "textarea",
          },
          {
            label: "Customer Account",
            name: "CustomerAccount",
            type: "textarea",
          },
          {
            label: "Requested Flight",
            name: "RequestedFlight",
            type: "text",
          },
          {
            label: "Payment Method",
            name: "PaymentMethod",
            type: "text",
          },
          {
            label: "Accounting Information",
            name: "AccountingInformation",
            type: "textarea",
          },
        ]
      : []),
    // { label: "Enter VAT Amount", name: "VATAmount", type: "number" },
    {
      label: "Special Instructions",
      name: "specialInstructions",
      type: "textarea",
    },
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
    {
      label: "Address",
      name: "address",
      type: "select",
      options: ["Dubai", "Bahrain"],
    },
  ];
  console.log(temp_Items, "   ", jobInfo);
  const filljobDetailsbyId = async () => {
    try {
      setloadingdetails(true);
      console.log("job", jobidRef.current?.value);
      const docs = await getDocs(
        query(
          collection(db, "jobs"),
          where("jobid", "==", jobidRef.current?.value!)
        )
      );
      if (docs.empty) return toast.error("No Such Job Exists");
      const mydoc = docs.docs[0];
      console.log("Data", docs.docs[0]?.data());
      const jobtype = mydoc?.data()?.type;

      // console.log("Data", formikObj.values);

      setItemInquiry({
        ...(mydoc?.data()?.inquiry as Inquiry),
        method: mydoc?.data()?.method,
        jobInitials: mydoc?.data()?.jobInitials,
        type:
          jobtype === "road"
            ? "RoadFreight"
            : jobtype === "sea"
            ? "SeaFreight"
            : "AirFreight",
      });
      setitemsArray(mydoc?.data()?.Items as QuotationItem[]);

      // setInfo(docs.docs[0]?.data()?.inquiry as Inquiry);
      // setItems(docs.docs[0]?.data()?.Items as QuotationItem[]);\
      toast.success("Filled Data");
    } catch (e) {
      toast.error("No Such Job");
    } finally {
      setloadingdetails(false);
    }
  };
  console.log("Type value", formikObj.values.type);
  console.log("QuotationLadingItems", quotationLadingItemsStore);
  console.log("airwayItems", AirwayItems);
  console.log("items", quotationItemsStore);

  return (
    <div className="w-full ">
      <FormikProvider value={formikObj}>
        <div className="flex flex-col w-full py-4 space-y-3 items-center">
          <div className="fixed mx-auto w-5/6">
            {showQuotation && (
              <AddQuotation
                closeQuotation={setshowQuotation}
                AddItemToInvoice={(
                  item: QuotationItem | LadingItems | AirwayItem
                ) =>
                  formikObj.values.type === "BillOfLading"
                    ? setBillOfLadingItems([
                        ...quotationLadingItemsStore,
                        item as LadingItems,
                      ])
                    : formikObj.values.type === "AirwayBill"
                    ? setAirwayItems([...AirwayItems, item as AirwayItem])
                    : setitemsArray([
                        ...quotationItemsStore,
                        item as QuotationItem,
                      ])
                }
                quotationType={formikObj.values.type}
              />
            )}
          </div>

          <h1 className="text-5xl text-center text-blue-600 font-serif">
            Generate Invoice
          </h1>
          <div className="flex items-center w-3/5 justify-between">
            <label className="text-xl" htmlFor="jobid">
              Enter Job Id
            </label>
            <input
              type={"text"}
              name={"jobid"}
              placeholder="jobId"
              className="w-3/5 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              ref={jobidRef}
            />
            <button
              className="bg-blue-500 text-white p-3 rounded-md"
              onClick={filljobDetailsbyId}
              type="button"
            >
              {loadingdetails ? (
                <LoaderIcon className="p-2 mx-auto" />
              ) : (
                "Fill Details"
              )}
            </button>
            <button
              className="bg-red-500 text-white p-3 rounded-md"
              onClick={ResetFields}
              type="button"
            >
              Reset Fields
            </button>
          </div>

          <div className="lg:w-4/5">
            <h1 className="text-xl text-center text-blue-900 font-serif">
              Invoice Details
            </h1>
            <form
              onSubmit={formikObj.handleSubmit}
              className="w-full space-y-5 flex flex-col justify-center"
            >
              <div className="mx-auto w-3/5 items-center space-x-4 flex  justify-center space-y-2">
                <label className="text-xl">{"Type of Bill"}</label>
                <Field
                  as="select"
                  name="type"
                  className="w-3/5 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  defaultValue={formikObj.values.type}
                >
                  <option value={""}>Select Type</option>
                  <option value={"AirFreight"}>AirFreight Invoice</option>
                  <option value={"RoadFreight"}>RoadFreight Invoice</option>
                  <option value={"SeaFreight"}>SeaFreight Invoice</option>
                  <option value={"BillOfLading"}>Bill Of Lading</option>
                  <option value={"AirwayBill"}>AirWay Bill</option>
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
              <div className="w-4/5  flex flex-col lg:flex-row flex-wrap justify-center items-center lg:justify-start mx-auto gap-3 ">
                <div className="px-4 w-4/5">
                  <label className="text-xl">
                    Other Terms And Conditions (If Any)
                  </label>

                  <Field
                    as="textarea"
                    name="termsAndConditions"
                    className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name={"termsaAndConditions"}
                    component="div"
                    className="text-red-500"
                  />
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
                        {formikObj.values.type === "BillOfLading"
                          ? billofLadleTable.map((column) => (
                              <React.Fragment key={column.name}>
                                <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                                  {column.label}
                                </th>
                              </React.Fragment>
                            ))
                          : formikObj.values.type === "AirwayBill"
                          ? AirwayBillTable.map((column) => (
                              <React.Fragment key={column.name}>
                                <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                                  {column.label}
                                </th>
                              </React.Fragment>
                            ))
                          : Column1.map((column) => (
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
                    {formikObj.values.type === "BillOfLading" ? (
                      quotationLadingItemsStore && (
                        <tbody>
                          {quotationLadingItemsStore.map((i, index) => (
                            <tr key={index}>
                              <td className="border border-slate-300 p-4">
                                {index + 1}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.NoOfPackages}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.PackageDescription}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.ContainerNo}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.SealNo}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.Dimensions}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.Weight}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )
                    ) : formikObj.values.type === "AirwayBill" ? (
                      <tbody>
                        {AirwayItems.map((i, index) => (
                          <tr key={index}>
                            <td className="border border-slate-300 p-4">
                              {index + 1}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.NoPieces}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.GrossWeight}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Unit}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Rate}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.ChargeableWeight}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.NatureOfGoods}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.RatePerCharge}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
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
                              {/* {i.UnitPerKg} */}
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
                        </td> */}
                            {/* <td className="border border-slate-300 p-4">
                          {i.MinCostAmountPerUnit}
                        </td> */}
                            {/* <td className="border border-slate-300 p-4">
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
                Save
              </button>
            </form>
          </div>
        </div>
      </FormikProvider>
    </div>
  );
}

export default GenerateInvoice;
