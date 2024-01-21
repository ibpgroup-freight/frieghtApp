import React from "react";
import { useLocation } from "react-router-dom";
import JobPDF from "../Components/JobPDF";
function JobDetail() {
  const stateProps = useLocation();
  return (
    <div className="w-full h-full">
      Job detail
      <div className="w-full h-screen">
        <JobPDF job={stateProps.state.job} />
      </div>
    </div>
  );
}

export default JobDetail;
