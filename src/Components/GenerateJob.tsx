import React from "react";
type InquiryAndQuotationProps = {
  step: number;
  setstepNumber: React.Dispatch<React.SetStateAction<number>>;
  actionName: string;
};
function GenerateJob(props: InquiryAndQuotationProps) {
  return <div>Generate Job</div>;
}

export default GenerateJob;
