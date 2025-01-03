import React, { useCallback, useState } from "react";
import useJob from "../store/Jobs";
import { useNavigate } from "react-router-dom";
import ButtonBlue from "./ButtonBlue";
import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";
import {
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import useQuotation from "../store/Quotations";
import useUser from "../store/User";
type pageProps = {
  quotation: Quotation;
  ondelete: () => void;
  status: QuotationStatus;
  refresh: () => void;
  inquiry: Inquiry;
};
function QuotationCard({
  quotation,
  ondelete,
  status,
  refresh,
  inquiry,
}: pageProps) {
  const navigate = useNavigate();
  //   const { setJob } = useJob();
  const { setQuotation } = useQuotation();
  const { setItemInquiry, setPrestationArray } = useInquiryItem();
  const { setitemsArray } = useItemStore();
  const { role } = useUser();
  const [isdeleting, setisdeleting] = useState<{
    status: boolean;
    id: string;
  }>();
  const deleteJob = useCallback(async (id: string) => {
    try {
      setisdeleting((p) => ({ status: true, id }));
      await deleteDoc(doc(db, "quotations", id!));
      toast.success("Deletion Successfull");
      ondelete();
    } catch (e) {
      toast.error("Couldnt Delete Job.Please Try Again");
    } finally {
      setisdeleting((p) => ({ status: true, id: "" }));
    }
  }, []);
  const editJob = useCallback(() => {
    setItemInquiry(quotation.inquiry);
    setitemsArray(quotation.Items);
    setPrestationArray(quotation.prestation);
    navigate(`/home?method=${quotation.method}&editQuotation=${quotation.id}`, {
      state: { job: quotation },
    });
  }, []);
  const ViewJob = useCallback(() => {
    setItemInquiry({
      ...quotation.inquiry,
      quotationId: quotation.quotationId,
    });
    setitemsArray(quotation.Items);
    setPrestationArray(quotation.prestation);
    navigate(`/quotationDetails`);
  }, []);

  const changeQuotation = async (id: string, status: QuotationStatus) => {
    try {
      setisdeleting({ id, status: true });
      await updateDoc(doc(db, "quotations", id), {
        status,
      });
      toast.success(`Changed Quotation Status to ${status}`);
      refresh();
    } catch (e) {
      console.log(e);
      toast.error("Failed to Change Quotation status.Try Again.");
    } finally {
      setisdeleting({ id: "", status: false });
    }
  };
  console.log("User role", role);
  return (
    quotation && (
      <>
        <td className="border border-slate-300 p-4  text-blue-500 font-bold">
          {quotation.quotationId}
        </td>
        <td className="border border-slate-300 p-4 text-blue-500 font-bold">
          {`${new Timestamp(
            (quotation as any).createdAt.seconds,
            (quotation as any).createdAt.nanoseconds
          )
            .toDate()
            .toLocaleDateString()} `}
          {/*@ts-ignore */}
          {`${new Timestamp(
            (quotation as any).createdAt.seconds,
            (quotation as any).createdAt.nanoseconds
          )
            .toDate()
            .toLocaleTimeString()} `}
        </td>
        {/* <td className="border border-slate-300 p-4 ">{i.QuoteValidity}</td> */}
        <td className="border border-slate-300 p-4 ">{inquiry.CustomerName}</td>
        {/* <td className="border border-slate-300 p-4 ">{i.UnitPerKg}</td> */}
        <td className="border border-slate-300 p-4 ">
          {inquiry.CustomerEmail}
        </td>
        {/* <td className="border border-slate-300 p-4 ">{i.AmountPerUnit}</td> */}

        {/* <td className="border border-slate-300 p-4 ">
              {i.CostAndSellSection}
            </td> */}
        <td className=" flex flex-col  space-y-2 px-2 justify-center self-center my-2 items-start">
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
              onclick={deleteJob.bind(null, quotation.id!)}
              customStyle={"text-red-900 hover:text-red-500 "}
              isloading={isdeleting?.status}
              disabled={isdeleting?.status}
            />
          )}
        </td>
        <td className="border border-slate-300 p-4 ">{status}</td>
        <td className="border-0 border-slate-300 px-1 flex justify-center flex-col space-y-4">
          <ButtonBlue
            text="Disapprove Quotation"
            customStyle=" hover:text-black"
            onclick={() => changeQuotation(quotation.id!, "disapproved")}
            isloading={quotation?.id === isdeleting?.id}
            disabled={quotation?.id === isdeleting?.id}
          />
          <ButtonBlue
            text="Approve Quotation"
            onclick={() => changeQuotation(quotation.id!, "approved")}
            isloading={quotation?.id === isdeleting?.id}
            disabled={quotation?.id === isdeleting?.id}
          />
        </td>
      </>
    )
  );
}

export default QuotationCard;
