import React, { useEffect, useReducer } from "react";
import useInquiryItem from "../store/Inquiry";
import * as Yup from "yup";
import { ErrorMessage, Field, useFormik, FormikProvider } from "formik";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
const RoadvalidationSchema = Yup.object().shape(
  {
    CustomerName: Yup.string().required("Customer Name is required"),
    CustomerAddress: Yup.string().required("Customer Address is required"),
    CustomerEmail: Yup.string().required("Customer Email is required"),
    CustomerPhoneNo: Yup.string(),
    SalesPerson: Yup.string().required("Sales Person is required"),
    VehicleDetails: Yup.string().required("Vehicle Details required"),
    DriverDetails: Yup.string().required("Driver Details required"),
    RouteDetails: Yup.string().required("Route Details required"),
    PlaceOfOrigin: Yup.string().required("Place of Origin is required"),
    PlaceOfDestination: Yup.string().required(
      "Place of Destination is required"
    ),
    Weight: Yup.string().required("Weight is required"),
    TypeOfCargo: Yup.string().required("Type Of Cargo is required"),
    Dimensions: Yup.string().required("Dimensions are required"),
    TransitTime: Yup.string().required("Transit Time is required"),
    ShipmentTerms: Yup.string().required("Shipment Terms are required"),
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
    CarrierName: Yup.string().required("Carrier Name is required"),

    Departure: Yup.string(),
    EstimatedArrival: Yup.string(),
    CustomerTRN: Yup.string(),
    Arrival: Yup.string(),
    IncoTerm: Yup.string(),
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
    CustomerName: Yup.string().required("Customer Name is required"),
    CustomerAddress: Yup.string().required("Customer Address is required"),
    CustomerEmail: Yup.string().required("Customer Email is required"),
    CustomerPhoneNo: Yup.string(),
    SalesPerson: Yup.string().required("Sales Person is required"),
    PortOfOrigin: Yup.string().required("Port of Origin is required"),
    PortOfDestination: Yup.string().required("Port of Destination is required"),
    Weight: Yup.string().required("Weight is required"),
    Dimensions: Yup.string().required("Dimensions are required"),
    TransitTime: Yup.string().required("Transit Time is required"),
    ShipmentTerms: Yup.string().required("Shipment Terms are required"),
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
    VesselName: Yup.string().required("Carrier Name is required"),
    VesselDetails: Yup.string().required("Vessel Details are required"),
    ShippingLaneDetails: Yup.string().required(
      "Shipping Lane Details are required"
    ),
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
    TypeOfCargo: Yup.string().required("Type of Cargo is required"),
    CarrierName: Yup.string().required("Carrier Name is required"),
    Arrival: Yup.string(),
    IncoTerm: Yup.string(),
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
  CustomerName: Yup.string().required("Customer Name is required"),
  CustomerAddress: Yup.string().required("Customer Address is required"),
  CustomerEmail: Yup.string().required("Customer Email is required"),
  CustomerPhoneNo: Yup.string(),
  SalesPerson: Yup.string().required("Sales Person is required"),
  AirportOfOrigin: Yup.string().required("Airport of Origin is required"),
  AirportOfDestination: Yup.string().required(
    "Airport of Destination is required"
  ),
  Weight: Yup.string().required("Weight is required"),
  Dimensions: Yup.string().required("Dimensions are required"),
  TransitTime: Yup.string().required("Transit Time is required"),
  ShipmentTerms: Yup.string().required("Shipment Terms are required"),
  TypeOfCargo: Yup.string().required("Type of Cargo is required"),
  CarrierName: Yup.string().required("Carrier Name is required"),
  FlightInformation: Yup.string().notRequired(),
  Departure: Yup.string(),
  EstimatedArrival: Yup.string(),
  CustomerTRN: Yup.string(),
  Arrival: Yup.string(),
  IncoTerm: Yup.string(),
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
    { label: "Enter IncoTerm", name: "IncoTerm", type: "text" },
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
  return (
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
  );
}

export default Inquiry;
