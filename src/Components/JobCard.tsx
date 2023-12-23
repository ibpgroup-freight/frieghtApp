import React from "react";
import useJob from "../store/Jobs";

type Inquiry = {
  CustomerName: string;
  CustomerAddress: string;
  SalesPerson: string;
  PortOfOrigin: string;
  PortOfDestination: string;
  Weight: string;
  Dimensions: string;
  TransitTime: string;
  ShipmentTerms: string;
  CarrierName: string;
};
type Item = {
  id: string;
  QuoteValidity: string;
  Charges: string;
  ChargeDescription: string;
  UnitPerKg: string;
  Currency: string;
  AmountPerUnit: string;
  CostAndSellSection: string;
};
type Job = {
  inquiry: Inquiry;
  Items: Item[];
};
type pageProps = {
  job: Job;
};
function JobCard({ job }: pageProps) {
  const Column1 = [
    { label: "Quote Validity", name: "QuoteValidity" },
    { label: "Charges", name: "Charges" },
    { label: "Charge Description", name: "ChargeDescription" },
    { label: "Unit Per Kg", name: "UnitPerKg" },
    { label: "Currency", name: "Currency" },
    { label: "Amount Per Unit", name: "AmountPerUnit" },
    { label: "Cost And Sell Section", name: "CostAndSellSection" },
  ];
  return (
    <div>
      <table className="border border-slate-400 border-spacing-x-10 border-spacing-y-2">
        <thead>
          <tr>
            {Column1.map((i) => (
              <th className="border border-slate-300 p-4" key={i.name}>
                {i.label}
              </th>
            ))}
          </tr>
        </thead>
        {job && (
          <tbody>
            {job.Items.map((i) => (
              <tr>
                <td className="border border-slate-300 p-4">{i.QuoteValidity}</td>
                <td className="border border-slate-300 p-4">{i.Charges}</td>
                <td className="border border-slate-300 p-4">
                  {i.ChargeDescription}
                </td>
                <td className="border border-slate-300 p-4">{i.UnitPerKg}</td>
                <td className="border border-slate-300 p-4">{i.Currency}</td>
                <td className="border border-slate-300 p-4">
                  {i.AmountPerUnit}
                </td>
                <td className="border border-slate-300 p-4">
                  {i.CostAndSellSection}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default JobCard;
