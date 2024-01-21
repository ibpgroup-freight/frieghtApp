import React, { useCallback, useState } from "react";
import useJob from "../store/Jobs";
import { useNavigate } from "react-router-dom";
import ButtonBlue from "./ButtonBlue";
import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
type pageProps = {
  job: Job;
  ondelete: () => void;
};
function JobCard({ job, ondelete }: pageProps) {
  const navigate = useNavigate();
  console.log("New job", job);
  const { setJob } = useJob();
  const { setItemInquiry } = useInquiryItem();
  const { setitemsArray } = useItemStore();
  const [isdeleting, setisdeleting] = useState<boolean>(false);
  const deleteJob = useCallback(async (id: string) => {
    try {
      setisdeleting(true);
      await deleteDoc(doc(db, "jobs", id!));
      toast.success("Deletion Successfull");
      ondelete();
    } catch (e) {
      toast.error("Couldnt Delete Job.Please Try Again");
    } finally {
      setisdeleting(false);
    }
  }, []);
  const editJob = useCallback(() => {
    setItemInquiry(job.inquiry);
    setitemsArray(job.Items);
    navigate(`/home?editJob=${job.id}`, { state: { job: job } });
  }, []);
  const ViewJob = useCallback(() => {
    navigate(`/jobDetail/${job.jobid}`, { state: { job: job } });
  }, []);
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
                onclick={ViewJob}
                customStyle={"bg-yellow-500"}
              />
              <ButtonBlue text="Edit" onclick={editJob} />
              <ButtonBlue
                text="Delete"
                onclick={deleteJob.bind(null, job.id!)}
                customStyle={"bg-red-400 "}
                isloading={isdeleting}
                disabled={isdeleting}
              />
            </td>
          </React.Fragment>
        ))}
      </>
    )
  );
}

export default JobCard;
