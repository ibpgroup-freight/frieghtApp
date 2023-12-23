import React, { useState } from "react";
import Inquiry from "../Components/Inquiry";
import Quotation from "./Quotation";
import GenerateJob from "./GenerateJob";
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
    2: "Generate Job",
  };
  return (
    <div className="w-full flex flex-col items-center space-y-10">
      {step !== 0 && (
        <button
          className="bg-blue-700 text-white rounded-md px-3 py-2 text-2xl my-5"
          onClick={() => {
            setstep((p) => p - 1);
          }}
        >
          Back
        </button>
      )}
      {stepNumber[step]({
        step,
        setstepNumber: setstep,
        actionName: stepNextText[step + 1],
      })}
    </div>
  );
}

export default Transaction;
