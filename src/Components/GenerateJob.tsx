import React, { useCallback, useState } from "react";
import JobPDF from "./JobPDF";
import useJob from "../store/Jobs";
import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
type InquiryAndQuotationProps = {
  step: number;
  setstepNumber: React.Dispatch<React.SetStateAction<number>>;
  actionName: string;
};
function GenerateJob(props: InquiryAndQuotationProps) {
  const { setJob, Jobs } = useJob();
  const { inquiry, resetInquiry, prestation } = useInquiryItem();
  const { items, resetItems } = useItemStore();
  const [searchparams, setsearchparams] = useSearchParams();
  const JobMode = searchparams.get("method");
  const isEditingJob = searchparams.get("editJob");
  const isEditingQuotation = searchparams.get("editQuotation");

  const JobInitials = JobMode?.slice(-2);
  const [isloading, setisloading] = useState<boolean>(false);

  console.log("reset", inquiry);
  console.log("reset item", items);
  const navigate = useNavigate();
  const createJob = useCallback(async () => {
    try {
      setisloading((p) => true);
      if (isEditingQuotation) {
        await updateDoc(doc(db, "quotations", isEditingQuotation), {
          Items: items,
          inquiry,
          prestation,
          updatedAt: serverTimestamp(),
        });
      } else if (isEditingJob) {
        await updateDoc(doc(db, "jobs", isEditingJob), {
          inquiry,
          Items: items,
          prestation,
          updatedAt: serverTimestamp(),
        });
      } else {
        await setJob({
          status: "pending",
          inquiry,
          Items: items,
          prestation,
          jobid:
            JobInitials + `-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          method: inquiry.method,
        });
      }

      resetInquiry();
      resetItems();
      navigate("/");
    } catch (e) {
      console.log(e);
      toast.error("An Error Occured");
    } finally {
      setisloading((p) => false);
    }
  }, [items, JobInitials, inquiry, isEditingJob]);
  return (
    <div className="w-full h-5/6 relative -top-10 flex justify-evenly py-2">
      <JobPDF />
      <div className="w-30">
        <button
          disabled={isloading}
          className="p-2 bg-blue-700 rounded mx-auto text-white mt-10"
          onClick={createJob}
        >
          {!isloading ? (
            "Click to Create Job"
          ) : (
            <div className="w-full px-5 py-2 flex justify-center items-center">
              <Oval
                visible={true}
                height="26"
                width="26"
                color="#FFFFFF"
                secondaryColor="#000000"
                ariaLabel="oval-loading"
              />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default GenerateJob;
