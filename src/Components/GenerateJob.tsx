import React from "react";
import JobPDF from "./JobPDF";
import useJob from "../store/Jobs";
import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";
import { useNavigate, useSearchParams } from "react-router-dom";
type InquiryAndQuotationProps = {
  step: number;
  setstepNumber: React.Dispatch<React.SetStateAction<number>>;
  actionName: string;
};
function GenerateJob(props: InquiryAndQuotationProps) {
  const { setJob, Jobs } = useJob();
  const { inquiry, resetInquiry } = useInquiryItem();
  const { items, resetItems } = useItemStore();
  const [searchparams, setsearchparams] = useSearchParams();
  const JobMode = searchparams.get("method");
  const JobInitials = JobMode?.slice(-2);
  console.log("reset", inquiry);
  console.log("reset item", items);
  const navigate = useNavigate();
  return (
    <div className="w-full h-5/6 relative -top-10 flex justify-evenly py-2">
      <JobPDF />
      <div className="w-30">
        <button
          className="p-2 bg-blue-700 rounded mx-auto text-white mt-10"
          onClick={() => {
            setJob({
              inquiry,
              Items: items,
              id: JobInitials + (Math.random() * 10000).toString(),
            });
            resetInquiry();
            resetItems();
            navigate("/dashboard");
          }}
        >
          Click to Create Job
        </button>
      </div>
    </div>
  );
}

export default GenerateJob;
