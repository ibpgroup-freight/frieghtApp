import React from "react";
import JobPDF from "./JobPDF";
import useJob from "../store/Jobs";
import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";
import { useNavigate } from "react-router-dom";
type InquiryAndQuotationProps = {
  step: number;
  setstepNumber: React.Dispatch<React.SetStateAction<number>>;
  actionName: string;
};
function GenerateJob(props: InquiryAndQuotationProps) {
  const { setJob, Jobs } = useJob();
  const { inquiry, resetInquiry } = useInquiryItem();
  const { items, resetItems } = useItemStore();
  console.log(Jobs);
  console.log("reset", inquiry);
  console.log("reset item", items);
  const navigate = useNavigate();
  return (
    <div className="w-full h-5/6 relative -top-10 flex justify-evenly">
      <JobPDF />
      <div className="w-30">
        <button
          className="p-2 bg-blue-700 rounded mx-auto text-white"
          onClick={() => {
            setJob({ inquiry, Items: items });
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
