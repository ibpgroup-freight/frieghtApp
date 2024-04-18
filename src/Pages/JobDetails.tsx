import React from "react";
import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";
import { useSearchParams } from "react-router-dom";

const JobDetails = () => {
  const { inquiry } = useInquiryItem();
  const { items } = useItemStore();
  console.log(inquiry);
  const jobId = useSearchParams()[0].get("jobId");
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
  return (
    <div className="w-full px-8 lg:px-0  container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6">Job Details</h1>

      <div className="bg-gray-100 p-6 rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2">
              <strong>Customer Name:</strong> {inquiry.CustomerName}
            </p>
            <p className="mb-2">
              <strong>Customer Address:</strong> {inquiry.CustomerAddress}
            </p>
            <p className="mb-2">
              <strong>Sales Person:</strong> {inquiry.SalesPerson}
            </p>
            <p className="mb-2">
              <strong>Customer Email:</strong> {inquiry.CustomerEmail}
            </p>
            <p className="mb-2">
              <strong>Customer Phone No:</strong> {inquiry.CustomerPhoneNo}
            </p>
            <p className="mb-2">
              <strong>Customer TRN: </strong> {inquiry.CustomerTRN}
            </p>
          </div>
          <div>{/* Add other customer information fields as needed */}</div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipment Details</h2>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
          <div>
            <p className="mb-2">
              <strong>Type:</strong> {inquiry.type}
            </p>
            <p className="mb-2">
              <strong>Weight:</strong> {inquiry.Weight}
            </p>
            <p className="mb-2">
              <strong>Dimensions:</strong> {inquiry.Dimensions}
            </p>
            <p className="mb-2">
              <strong>Transit Time:</strong> {inquiry.TransitTime}
            </p>
          </div>
          <div>
            <p className="mb-2">
              <strong>Shipment Terms:</strong> {inquiry.ShipmentTerms}
            </p>
            <p className="mb-2">
              <strong>Carrier Name:</strong> {inquiry.CarrierName}
            </p>
            <p className="mb-2">
              <strong>Origin:</strong>{" "}
              {inquiry.type.includes("sea") || inquiry.type.includes("Sea")
                ? inquiry.PortOfOrigin
                : inquiry.type.includes("road") || inquiry.type.includes("Road")
                ? inquiry.PlaceOfOrigin
                : inquiry.type.includes("air") || inquiry.type.includes("Air")
                ? inquiry.AirportOfOrigin
                : ""}
            </p>{" "}
            <p className="mb-2">
              <strong>Destination:</strong>{" "}
              {inquiry.type.includes("sea") || inquiry.type.includes("Sea")
                ? inquiry.PortOfDestination
                : inquiry.type.includes("road") || inquiry.type.includes("Road")
                ? inquiry.PlaceOfDestination
                : inquiry.type.includes("air") || inquiry.type.includes("Air")
                ? inquiry.AirportOfDestination
                : ""}
            </p>
            <p className="mb-2">
              <strong>Departure:</strong> {inquiry.Departure}
            </p>
            {/* Add other shipment details fields as needed */}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2">
              <strong>Quotation ID:</strong> {inquiry.quotationId}
            </p>
            <p className="mb-2">
              <strong>Job ID:</strong> {jobId}
            </p>
            <p className="mb-2">
              <strong>Estimated Arrival:</strong> {inquiry.EstimatedArrival}
            </p>
            <p className="mb-2">
              <strong>Container Type:</strong> {inquiry.ContainerType}
            </p>
            <p className="mb-2">
              <strong>Custom Container Type:</strong>{" "}
              {inquiry.CustomContainerType}
            </p>
          </div>
          <div>{/* Add other additional information fields as needed */}</div>
        </div>
        <div>
          <p className="mb-2">
            <strong>
              {" "}
              {inquiry.type.includes("sea") || inquiry.type.includes("Sea")
                ? "Vessal And Shipping Details"
                : inquiry.type.includes("road") || inquiry.type.includes("Road")
                ? "Vehicle Details"
                : inquiry.type.includes("air") || inquiry.type.includes("Air")
                ? "Flight Information"
                : ""}
            </strong>{" "}
            {inquiry.type.includes("sea") || inquiry.type.includes("Sea")
              ? inquiry.othershippingDetails
                  ?.concat(". " + inquiry.VesselDetails)
                  .concat("\n, Vessel Name " + inquiry.VesselName)
              : inquiry.type.includes("road") || inquiry.type.includes("Road")
              ? inquiry.VehicleDetails?.concat(
                  "\n, Route Details: " + inquiry.RouteDetails
                ).concat("\n, Driver Details:  " + inquiry.DriverDetails)
              : inquiry.type.includes("air") || inquiry.type.includes("Air")
              ? inquiry.FlightInformation
              : ""}
          </p>

          {/* Add other shipment details fields as needed */}
        </div>
      </div>

      <div className="w-full space-y-2 w-5/5">
        <h1 className="text-xl text-center text-blue-900 font-serif">Items</h1>
        <div className="mx-auto w-[90%] overflow-auto mt-20">
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

            <tbody>
              {items?.map((i, index) => (
                <tr key={index}>
                  <td className="border border-slate-300 p-4">{index + 1}</td>
                  <td className="border border-slate-300 p-4">
                    {i.QuoteValidity}
                  </td>
                  <td className="border border-slate-300 p-4">{i.Charges}</td>
                  <td className="border border-slate-300 p-4">
                    {i.ChargeDescription}
                  </td>
                  <td className="border border-slate-300 p-4">{i.Units}</td>
                  <td className="border border-slate-300 p-4">{i.Units}</td>
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
                  <td className="border border-slate-300 p-4">{i.Currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
