import React, { useCallback, useState } from "react";
import useJob from "../store/Jobs";
import { useNavigate } from "react-router-dom";
import ButtonBlue from "./ButtonBlue";
import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";
import {
  Timestamp,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import useUser from "../store/User";
type pageProps = {
  job: Job;
  ondelete: () => void;
  status: JobStatus;
  refresh: () => void;
  inquiry: Inquiry;
};
function JobCard({ job, ondelete, status, refresh, inquiry }: pageProps) {
  const navigate = useNavigate();

  const { setJob } = useJob();
  const { setItemInquiry } = useInquiryItem();
  const { setitemsArray } = useItemStore();
  const [isdeleting, setisdeleting] = useState<{
    status: boolean;
    id: string;
  }>();
  const deleteJob = useCallback(async (id: string) => {
    try {
      setisdeleting((p) => ({ status: true, id }));
      await deleteDoc(doc(db, "jobs", id!));
      toast.success("Deletion Successfull");
      ondelete();
    } catch (e) {
      toast.error("Couldnt Delete Job.Please Try Again");
    } finally {
      setisdeleting((p) => ({ status: true, id: "" }));
    }
  }, []);
  const editJob = useCallback(() => {
    setItemInquiry(job.inquiry);
    setitemsArray(job.Items);
    navigate(`/home?method=${job.method}&editJob=${job.id}`, {
      state: { job: job },
    });
  }, [job]);
  const ViewJob = useCallback(() => {
    setItemInquiry(job.inquiry);
    setitemsArray(job.Items);
    navigate(`/jobDetails?jobId=${job.jobid}`);
  }, [job]);

  const changeJob = async (id: string, status: JobStatus) => {
    try {
      setisdeleting({ id, status: true });
      await updateDoc(doc(db, "jobs", id), {
        status,
      });
      toast.success(`Changed Job Status to ${status}`);
      refresh();
    } catch (e) {
      console.log(e);
      toast.error("Failed to Change Job status.Try Again.");
    } finally {
      setisdeleting({ id: "", status: false });
    }
  };
  const { role } = useUser();
  return (
    job && (
      <>
        <td className="border border-slate-300 p-4 text-blue-500 font-bold">
          {job.jobid}
        </td>
        <td className="border border-slate-300 p-4 text-blue-500 font-bold">
          {/*@ts-ignore */}
          {`${new Timestamp(job?.createdAt?.seconds, job?.createdAt?.nanoseconds)
            .toDate()
            .toLocaleDateString()} `}
          {/*@ts-ignore */}
          {`${new Timestamp(job?.createdAt?.seconds, job?.createdAt?.nanoseconds)
            .toDate()
            .toLocaleTimeString()} `}
        </td>
        {/* <td className="border border-slate-300 p-4">{i.QuoteValidity}</td> */}
        <td className="border border-slate-300 p-4">{inquiry.CustomerName}</td>
        {/* <td className="border border-slate-300 p-4">{i.UnitPerKg}</td> */}
        <td className="border border-slate-300 p-4">{inquiry.CustomerEmail}</td>
        {/* <td className="border border-slate-300 p-4">{i.AmountPerUnit}</td> */}

        {/* <td className="border border-slate-300 p-4">
              {i.CostAndSellSection}
            </td> */}
        <td className=" flex flex-col   px-2 justify-center self-center my-1 items-start">
          <ButtonBlue text="View" onclick={ViewJob} customStyle={""} />
          {role === "Admin" && (
            <ButtonBlue
              text="Edit"
              onclick={editJob}
              customStyle={"text-green-900 hover:text-green-500 "}
            />
          )}
          {role === "Admin" && (
            <ButtonBlue
              text="Delete"
              onclick={deleteJob.bind(null, job.id!)}
              customStyle={"text-red-400 hover:text-red-800 "}
              isloading={isdeleting?.status}
              disabled={isdeleting?.status}
            />
          )}
        </td>
        <td className="border border-slate-300 p-4">{status}</td>
        <td className="border-0 border-slate-300 px-1 flex justify-center flex-col space-y-4">
          <ButtonBlue
            text="Cancel Job"
            customStyle="!px-0 hover:text-black"
            onclick={() => changeJob(job.id!, "cancelled")}
            isloading={job?.id === isdeleting?.id}
            disabled={job?.id === isdeleting?.id}
          />
          <ButtonBlue
            text="Mark Completed"
            onclick={() => changeJob(job.id!, "completed")}
            isloading={job?.id === isdeleting?.id}
            disabled={job?.id === isdeleting?.id}
          />
        </td>
      </>
    )
  );
}

export default JobCard;
