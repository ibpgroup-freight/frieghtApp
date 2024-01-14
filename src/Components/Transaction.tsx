import React, { useEffect, useState } from "react";
import Inquiry from "../Components/Inquiry";
import Quotation from "./Quotation";
import GenerateJob from "./GenerateJob";
import { useLocation, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
type InquiryAndQuotationProps = {
  step: number;
  setstepNumber: React.Dispatch<React.SetStateAction<number>>;
  actionName: string;
};
type StepVal = {
  [key: number]: (props: InquiryAndQuotationProps) => React.ReactNode;
};
type stepNextText = {
  [key: number]: string;
};
function Transaction() {
  const [step, setstep] = useState(0);
  const stepNumber: StepVal = {
    0: (props) => <Inquiry {...props} />,
    1: (props) => <Quotation {...props} />,
    2: (props) => <GenerateJob {...props} />,
  };
  const stepNextText: stepNextText = {
    0: "Inquiry",
    1: "Quotation",
    2: "View Job",
  };
  const [searchparams, setsearchparams] = useSearchParams();
  const state = useLocation();
  useEffect(() => {}, []);
  console.log("searchparams", searchparams.get("method"));
  console.log("State", state);
  return (
    <div className="w-full flex flex-col items-center p-1 md:space-y-10 md:px-5">
      <div className="w-full space-y-5 mt-5 flex flex-col ">
        <div className="flex flex-col lg:flex-row items-start md:items-center justify-start">
          {step !== 0 && (
            <button
              className="bg-blue-700 flex items-center text-white rounded-md px-6 py-2 text-2xl lg:my-5"
              onClick={() => {
                setstep((p) => p - 1);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
              <h1 className="mx-3">Back</h1>
            </button>
          )}
          <div className="w-1/2 flex flex-row justify-start ml-10">
            <h1 className="text-5xl font-serif uppercase text-center text-blue-600">
              {stepNextText[step]}
            </h1>
          </div>
        </div>
        <div className="w-full underline bg-blue-800 h-1 p-0 m-0"></div>
      </div>

      {stepNumber[step]({
        step,
        setstepNumber: setstep,
        actionName: stepNextText[step + 1],
      })}
    </div>
  );
}

export default Transaction;
