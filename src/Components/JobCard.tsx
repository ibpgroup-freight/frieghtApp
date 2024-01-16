import React from "react";
import useJob from "../store/Jobs";
import { useNavigate } from "react-router-dom";
import ButtonBlue from "./ButtonBlue";
import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";

type pageProps = {
  job: Job;
};
function JobCard({ job }: pageProps) {
  const navigate = useNavigate();
  console.log("New job", job);
  const { setJob } = useJob();
  const { setItemInquiry } = useInquiryItem();
  const { setitemsArray } = useItemStore();
  return (
    job && (
      <>
        {job.Items?.map((i) => (
          <React.Fragment key={i.id}>
            <td className="border border-slate-300 p-4 text-blue-500 font-bold">
              {job.jobid}
            </td>

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
            <td className=" flex flex-col space-y-2 px-2 justify-center self-center my-2 items-start">
              <ButtonBlue
                text="View"
                onclick={() => {
                  navigate(`/jobDetail/${job.jobid}`, { state: { job: job } });
                }}
                customStyle={"bg-yellow-500"}
              />
              <ButtonBlue
                text="Edit"
                onclick={() => {
                  setItemInquiry(job.inquiry);
                  setitemsArray(job.Items);
                  navigate(`/home?editJob=${job.id}`, { state: { job: job } });
                }}
              />
              <ButtonBlue
                text="Delete"
                onclick={() => {
                  // navigate(`/jobDetail/${job.jobid}`, { state: { job: job } });
                }}
                customStyle={"bg-red-400"}
              />
            </td>
          </React.Fragment>
        ))}
      </>
    )
  );
}

export default JobCard;
