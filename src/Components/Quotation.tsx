import React, { useState, useReducer, useCallback } from "react";
import AddQuotation from "./AddQuotation";
import { useContext } from "react";
import { ModalCtx } from "../store/Modal";
import useItemStore from "../store/Item";
import useInquiryItem from "../store/Inquiry";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { LoaderIcon } from "react-hot-toast";
import AddPrestation from "./AddPrestation";

function Quotation(props: InquiryAndQuotationProps) {
  const ctx = useContext(ModalCtx);
  // const [state, dispatch] = useReducer(QuotationReducer, quotation);
  const { inquiry, resetInquiry, prestation, setPrestationArray } =
    useInquiryItem();
  const { items, resetItems, setitemsArray } = useItemStore();
  const [searchparams, setsearchparams] = useSearchParams();
  const JobMode = searchparams.get("method");
  const isEditingJob = searchparams.get("editJob");
  const isEditingQuotation = searchparams.get("editQuotation");

  const JobInitials = JobMode?.slice(-2);
  const [toEdit, settoEdit] = useState<any>();
  const [isloading, setisloading] = useState<boolean>(false);
  const jobType =
    JobMode?.includes("Air") || JobMode?.includes("air")
      ? "air"
      : JobMode?.includes("Sea") || JobMode?.includes("sea")
      ? "sea"
      : "road";
  console.log("reset", inquiry);
  console.log("reset item", items);
  const navigate = useNavigate();
  const createQuotation = useCallback(async () => {
    try {
      if (items.length <= 0) return toast.info("Add Some Items First");
      setisloading((p) => true);
      if (isEditingJob) {
        await updateDoc(doc(db, "jobs", isEditingJob), {
          inquiry,
          Items: items,
          prestation,
          updatedAt: serverTimestamp(),
        });
      } else if (isEditingQuotation) {
        await updateDoc(doc(db, "quotations", isEditingQuotation), {
          inquiry,
          Items: items,
          prestation,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "quotations"), {
          status: "pending",
          inquiry,
          Items: items,
          quotationId:
            JobInitials +
            `-${new Date().toLocaleDateString()}-${Math.floor(
              Math.random() * 10000
            )}`,
          type: jobType,
          jobInitials: JobInitials,
          method: JobMode,
          prestation,
          createdAt: serverTimestamp(),
        });
        // setJob({
        //   status: "pending",
        //   inquiry,
        //   Items: items,
        //   jobid:
        //     JobInitials + `-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        // });
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
  }, [items, JobInitials, inquiry, isEditingJob, prestation]);
  const [showQuotation, setshowQuotation] = useState<boolean>(false);
  const [showPrestation, setshowPrestation] = useState<boolean>(false);

  const Column1 = [
    { label: "Index", name: "Sr no" },
    { label: "Quote Validity", name: "QuoteValidity" },
    { label: "Charges", name: "Charges" },
    { label: "Charge Description", name: "ChargeDescription" },
    {
      label: "Units",
      name: "Units",
      // subheadings: ["Min", "Max"],
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
    { label: "Vat %", name: "Vat %" },
    { label: "Vat Amount", name: "Vat Amount" },
    { label: "Discount", name: "Discount" },
    { label: "Total (exclusive of VAT)", name: "total" },

    { label: "Actions", name: "Actions" },
    // { label: "Amount Per Unit", name: "AmountPerUnit" },
    // { label: "Cost And Sell Section", name: "CostAndSellSection" },
  ];
  const PrestationColumn = [
    { label: "Index", name: "Sr no" },
    { label: "Description", name: "description" },
    { label: "currency", name: "currency" },
    { label: "total", name: "total" },
    { label: "Actions", name: "Actions" },
  ];
  console.log("items", items);
  return (
    <div className="w-full">
      <div className={`md:px-5 flex justify-evenly  w-full `}>
        <div
          className={`fixed ${
            showQuotation && "inset-0"
          } flex items-center justify-center overflow-auto`}
        >
          {showQuotation && (
            <AddQuotation
              closeQuotation={setshowQuotation}
              quotationType="job"
              toEdit={toEdit}
            />
          )}
        </div>
        <div className="fixed z-50 w-full">
          {showPrestation && (
            <AddPrestation
              closePrestation={setshowPrestation}
              quotationType="job"
              toEdit={toEdit}
            />
          )}
        </div>
        <div className=" w-full overflow-auto mt-20">
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
            {items && (
              <tbody>
                {items.map((i, index) => (
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
                    <td className="border border-slate-300 p-4">
                      {/* {i.UnitPerKg} */}
                      {i.RateAmountPerUnit}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.MinRateAmountPerUnit}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.MaxRateAmountPerUnit}
                    </td>
                    {/* <td className="border border-slate-300 p-4"> */}
                    {/* {i.CostAmountPerUnit}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.MinCostAmountPerUnit}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.MinCostAmountPerUnit}
                    </td> */}
                    <td className="border border-slate-300 p-4">
                      {i.Currency}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.vatpercent}
                    </td>{" "}
                    <td className="border border-slate-300 p-4">
                      {i.vatamount}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i.Discount}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {parseInt(i.Units) * parseInt(i.Charges)}
                    </td>
                    <td className="border border-slate-300 p-4">
                      <button
                        className="text-yellow-400 cursor-pointer w-full"
                        onClick={() => {
                          console.log(i, "the i");
                          settoEdit({ ...i, index, isEditingJob: true });
                          setshowQuotation(true);
                          ctx.setToggle();
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-400 cursor-pointer w-full"
                        onClick={() => {
                          const newquotations = items.filter(
                            (i, ind) => ind !== index
                          );
                          console.log("Clicked", newquotations);

                          setitemsArray(newquotations);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        <div className="relative right-20 h-24">
          <button
            className="text-2xl rounded-full text-green-600"
            onClick={(e) => {
              console.log("Here");
              setshowQuotation(true);
              settoEdit({ isEditingJob: false });

              ctx.setToggle();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height={70}
              width={70}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  opacity="0.5"
                  d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"
                  fill="#054d00"
                ></path>{" "}
                <path
                  d="M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                  fill="#054d00"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div>
        <div className=" w-full overflow-auto mt-20">
          <h1 className="text-center text-3xl text-blue-700 text-underline my-4">
            Prestation Details
          </h1>
          <table className="border overflow-x-auto w-full ml-30 border-slate-400 md:border-spacing-x-10 md:border-spacing-y-2">
            <thead>
              <tr>
                {PrestationColumn?.map((column) => (
                  <React.Fragment key={column.name}>
                    <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                      {column.label}
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            {items && (
              <tbody>
                {prestation?.map((i, index) => (
                  <tr key={index}>
                    <td className="border border-slate-300 p-4">{index + 1}</td>
                    <td className="border border-slate-300 p-4">
                      {i?.description}
                    </td>
                    <td className="border border-slate-300 p-4">
                      {i?.currency}
                    </td>
                    <td className="border border-slate-300 p-4">{i?.total}</td>
                    <td className="border border-slate-300 p-4">
                      <button
                        className="w-full text-yellow-400"
                        onClick={() => {
                          console.log(i, "the i");
                          settoEdit({ ...i, index, isEditingJob: true });
                          setshowPrestation(true);
                          ctx.setToggle();
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full text-red-400"
                        onClick={() => {
                          const newprestations = prestation?.filter(
                            (i, ind) => ind !== index
                          );
                          setPrestationArray(newprestations);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <div className="relative right-20 text-right">
          <button
            className="text-2xl rounded-full text-green-600"
            onClick={(e) => {
              console.log("Here");
              setshowPrestation(true);
              settoEdit({ isEditingJob: false });
              ctx.setToggle();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height={70}
              width={70}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  opacity="0.5"
                  d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"
                  fill="#054d00"
                ></path>{" "}
                <path
                  d="M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                  fill="#054d00"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex w-full justify-center my-10">
        <button
          className="bg-blue-700 text-white rounded-md px-5 py-3 text-2xl text-center"
          onClick={createQuotation}
        >
          {isloading ? (
            <LoaderIcon className="mx-auto p-4" />
          ) : isEditingJob || isEditingQuotation ? (
            isEditingQuotation ? (
              "Update Quotation"
            ) : (
              "Update Job"
            )
          ) : (
            "Create Quotation"
          )}
        </button>
      </div>
    </div>
  );
}

export default Quotation;
