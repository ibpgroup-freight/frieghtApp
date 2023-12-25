import React from "react";
import useJob from "../store/Jobs";
import { useNavigate } from "react-router-dom";

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
  id: string;
  inquiry: Inquiry;
  Items: Item[];
};
type pageProps = {
  job: Job;
};
function JobCard({ job }: pageProps) {
  const navigate = useNavigate();
  return (
    <>
      {job && (
        <>
          {job.Items.map((i) => (
            <>
              <td className="border border-slate-300 p-4">{job.id}</td>

              <td className="border border-slate-300 p-4">{i.QuoteValidity}</td>
              <td className="border border-slate-300 p-4">{i.Charges}</td>
              <td className="border border-slate-300 p-4">
                {i.ChargeDescription}
              </td>
              <td className="border border-slate-300 p-4">{i.UnitPerKg}</td>
              <td className="border border-slate-300 p-4">{i.Currency}</td>
              <td className="border border-slate-300 p-4">{i.AmountPerUnit}</td>
              <td className="border border-slate-300 p-4">
                {i.CostAndSellSection}
              </td>
              <td
                className="border border-slate-300 p-4 cursor-pointer"
                onClick={() => {
                  navigate(`/jobDetail/${job.id}`, { state: { job:job } });
                }}
              >
                Edit
              </td>
            </>
          ))}
        </>
      )}
    </>
  );
}

export default JobCard;
