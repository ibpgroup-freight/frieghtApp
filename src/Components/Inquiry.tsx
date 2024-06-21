import React, { useEffect, useReducer, useState } from "react";
import useInquiryItem from "../store/Inquiry";
import * as Yup from "yup";
import { ErrorMessage, Field, useFormik, FormikProvider } from "formik";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import CustomLoader from "./CustomLoader";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
const RoadvalidationSchema = Yup.object().shape(
  {
    CustomerName: Yup.string(),
    CustomerAddress: Yup.string(),
    CustomerEmail: Yup.string(),
    CustomerPhoneNo: Yup.string(),
    SalesPerson: Yup.string(),
    VehicleDetails: Yup.string(),
    DriverDetails: Yup.string(),
    RouteDetails: Yup.string(),
    PlaceOfOrigin: Yup.string(),
    PlaceOfDestination: Yup.string(),
    Weight: Yup.string(),
    TypeOfCargo: Yup.string(),
    Dimensions: Yup.string(),
    TransitTime: Yup.string(),
    ShipmentTerms: Yup.string(),
    ContainerType: Yup.string()
      .when("CustomContainerType", ([CustomContainerType], schema) => {
        return CustomContainerType
          ? schema.notRequired()
          : schema.required(
              "Either Container Type Or Custom Container Type is required"
            );
      })
      .when("type", {
        is: (type: string) =>
          !type.includes("Air") ||
          !type.includes("air") ||
          type !== "Quotation",
        then: (schema) => schema.required("Units Are required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    CustomContainerType: Yup.string()
      .when("ContainerType", ([ContainerType], schema) => {
        return ContainerType
          ? schema.notRequired()
          : schema.required(
              "Either Container Type Or Custom Container Type is required"
            );
      })
      .when("type", {
        is: (type: string) =>
          !type.includes("Air") ||
          !type.includes("air") ||
          type !== "Quotation",
        then: (schema) => schema.required("Units Are required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    CarrierName: Yup.string(),

    Departure: Yup.string(),
    EstimatedArrival: Yup.string(),
    CustomerTRN: Yup.string(),
    Arrival: Yup.string(),

    Periodicity: Yup.string(),

    Department: Yup.string(),
    Yref: Yup.string(),
    Incharge: Yup.string(),
    validFrom: Yup.string(),
    validTo: Yup.string(),
    // Add validation rules for other fields
  },
  [["CustomContainerType", "ContainerType"]]
);
const SeavalidationSchema = Yup.object().shape(
  {
    CustomerName: Yup.string(),
    CustomerAddress: Yup.string(),
    CustomerEmail: Yup.string(),
    CustomerPhoneNo: Yup.string(),
    SalesPerson: Yup.string(),
    PortOfOrigin: Yup.string(),
    PortOfDestination: Yup.string(),
    Weight: Yup.string(),
    Dimensions: Yup.string(),
    TransitTime: Yup.string(),
    ShipmentTerms: Yup.string(),
    ContainerType: Yup.string()
      .when("CustomContainerType", ([CustomContainerType], schema) => {
        return CustomContainerType
          ? schema.notRequired()
          : schema.required(
              "Either Container Type Or Custom Container Type is required"
            );
      })
      .when("type", {
        is: (type: string) =>
          !type.includes("Air") ||
          !type.includes("air") ||
          type !== "Quotation",
        then: (schema) => schema.required("Units Are required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    Departure: Yup.string(),
    EstimatedArrival: Yup.string(),
    CustomerTRN: Yup.string(),
    VesselName: Yup.string(),
    VesselDetails: Yup.string(),
    ShippingLaneDetails: Yup.string(),
    CustomContainerType: Yup.string()
      .when("ContainerType", ([ContainerType], schema) => {
        return ContainerType
          ? schema.notRequired()
          : schema.required(
              "Either Container Type Or Custom Container Type is required"
            );
      })
      .when("type", {
        is: (type: string) =>
          !type.includes("Air") ||
          !type.includes("air") ||
          type !== "Quotation",
        then: (schema) => schema.required("Units Are required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    TypeOfCargo: Yup.string(),
    CarrierName: Yup.string(),
    Arrival: Yup.string(),

    Periodicity: Yup.string(),

    Department: Yup.string(),
    Yref: Yup.string(),
    Incharge: Yup.string(),
    validFrom: Yup.string(),
    validTo: Yup.string(),
    // Add validation rules for other fields
  },
  [["CustomContainerType", "ContainerType"]]
);
const AirvalidationSchema = Yup.object().shape({
  CustomerName: Yup.string(),
  CustomerAddress: Yup.string(),
  CustomerEmail: Yup.string(),
  CustomerPhoneNo: Yup.string(),
  SalesPerson: Yup.string(),
  AirportOfOrigin: Yup.string(),
  AirportOfDestination: Yup.string(),
  Weight: Yup.string(),
  Dimensions: Yup.string(),
  TransitTime: Yup.string(),
  ShipmentTerms: Yup.string(),
  TypeOfCargo: Yup.string(),
  CarrierName: Yup.string(),
  FlightInformation: Yup.string().notRequired(),
  Departure: Yup.string(),
  EstimatedArrival: Yup.string(),
  CustomerTRN: Yup.string(),
  Arrival: Yup.string(),

  Periodicity: Yup.string(),

  Department: Yup.string(),
  Yref: Yup.string(),
  Incharge: Yup.string(),
  validFrom: Yup.string(),
  validTo: Yup.string(),
});

function Inquiry(props: InquiryAndQuotationProps) {
  const { inquiry, setItemInquiry } = useInquiryItem();
  const params = useSearchParams();
  const navigate = useNavigate();
  const rawtype = params[0].get("method");
  const Airtype = rawtype?.includes("air");
  const Roadtype = rawtype?.includes("road");
  const Seatype = rawtype?.includes("sea");
  useEffect(() => {
    if (!rawtype) {
      navigate("/");
    }
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...inquiry,
      type: Airtype ? "air" : Seatype ? "sea" : "road",
    },
    validationSchema: Airtype
      ? AirvalidationSchema
      : Roadtype
      ? RoadvalidationSchema
      : SeavalidationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      setItemInquiry({
        ...values,
        type: Airtype ? "air" : Seatype ? "sea" : "road",
      });
      props.setstepNumber((prevStep) => prevStep + 1);
    },
  });

  console.log(formik.errors);

  const Column1Items = [
    { label: "Enter Customer Name", name: "CustomerName", type: "text" },
    { label: "Enter Customer Address", name: "CustomerAddress", type: "text" },
    ...(Airtype
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

    ...(Roadtype
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
    ...(Seatype
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
    { label: "Enter Arrival", name: "Arrival", type: "text" },
    { label: "Enter Periodicity", name: "Periodicity", type: "text" },
    { label: "Enter Yref", name: "Yref", type: "text" },
  ];
  const Column2Items = [
    { label: "Enter Customer Email", name: "CustomerEmail", type: "text" },
    {
      label: "Enter Customer Phone Number",
      name: "CustomerPhoneNo",
      type: "text",
    },
    ...(!Airtype && formik.values.type !== "Quotation"
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
    {
      label: "Weight(kg)",
      name: "Weight",
      type: "number",
    },
    { label: "Enter Dimensions", name: "Dimensions", type: "text" },

    { label: "Enter Customer TRN", name: "CustomerTRN", type: "number" },
    {
      label: "Enter Transit Time",
      name: "TransitTime",
      type: "text",
    },
    { label: "Enter Incharge", name: "Incharge", type: "text" },
    { label: "Enter Department", name: "Department", type: "text" },

    // { label: "Enter VAT Amount", name: "VATAmount", type: "number" },
  ];
  const Column3 = [
    { label: "Enter Sales Person", name: "SalesPerson", type: "text" },

    {
      label: "Enter Shipment Terms",
      name: "ShipmentTerms",
      type: "select",
      options: [
        "Exworks",
        "FOB",
        "EXW",
        "FCA",
        "FAS",
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
    { label: "Enter Type of Cargo", name: "TypeOfCargo", type: "text" },
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
      label: "Valid From",
      name: "validFrom",
      type: "date",
    },
    {
      label: "Valid To",
      name: "validTo",
      type: "date",
    },
  ];
  const [searchBy, setSearchBy] = useState<string>("id"); // Default search type
  const [loading, setisloading] = useState<boolean>(false);
  const [searchValue, setsearchValue] = useState<string>(""); // Default search type

  const submitHandler = async () => {
    try {
      setisloading(true);
      console.log("Search by ", searchBy);
      console.log("Search vall ", searchValue);

      let searchResults = await getDocs(
        query(collection(db, "contacts"), where(searchBy, "==", searchValue))
      );

      const res: any = [];
      if (searchResults.empty) {
        toast.info("No Result");
        return console.log("empty");
      }
      console.log(searchResults.docs[0].data());
      setItemInquiry({
        ...inquiry,
        CustomerName: searchResults.docs[0].data().name,
        CustomerAddress: searchResults.docs[0].data().address,
        CustomerEmail: searchResults.docs[0].data().email,
        CustomerPhoneNo: searchResults.docs[0].data().phone,
        CustomerTRN: searchResults.docs[0].data().trn,
      });
    } catch (e) {
      console.log(e);
      toast.error("An Error Occured , Please Try Later");
    } finally {
      setisloading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center space-x-6 ">
        <div className="mb-4 w-full">
          <label
            htmlFor="searchBy"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Search Contact By
          </label>
          <select
            id="searchBy"
            className="border p-2 w-full rounded-md"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value={""}>Select</option>
            {/* <option value={"contactId"}>Id</option> */}
            <option value="email">Email</option>
            <option value="phone">Number</option>
            <option value={"name"}>Name</option>
            <option value={"company"}>Company</option>
          </select>
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="searchInput"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Search {searchBy}
          </label>
          <input
            type="text"
            id="searchInput"
            className="border p-2 w-full rounded-md"
            placeholder={`Enter ${searchBy}`}
            onChange={(e) => setsearchValue(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 rounded-md text-white px-3 py-2 my-4 lg:my-0"
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? (
            <CustomLoader customStyle="!h-12" height={50} />
          ) : (
            "Search"
          )}
        </button>
      </div>
      <FormikProvider value={formik}>
        <div className="w-full flex flex-col justify-center space-y-7 py-5 flex-wrap ">
          <form onSubmit={formik.handleSubmit}>
            <div className="px-5 flex flex-col lg:flex-row justify-between w-full my-5">
              <Field hidden name={"type"} />
              <div className="flex flex-col space-y-1">
                {Column1Items.map((i) => (
                  <div key={i.name} className="px-4">
                    <label className="text-xl" key={i.name}>
                      {i.label}
                    </label>
                    <Field
                      as={i.type === "textarea" ? "textarea" : "input"}
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
                {Column2Items.map((i) => (
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
                          as={i.type === "textarea" ? "textarea" : "input"}
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
    </div>
  );
}

export default Inquiry;
