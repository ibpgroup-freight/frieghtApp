import React from "react";
import SideBar from "../Components/SIdeBar";
import useJob from "../store/Jobs";
import JobCard from "../Components/JobCard";
function Dashboard() {
  const { Jobs } = useJob();
  return (
    <section>
      {Jobs.map((j) => (
        <JobCard job={j} />
      ))}
    </section>
  );
}

export default Dashboard;
