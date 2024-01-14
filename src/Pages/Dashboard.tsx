import React, { useCallback, useEffect, useState } from "react";
import SideBar from "../Components/SIdeBar";
import useJob from "../store/Jobs";
import JobCard from "../Components/JobCard";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
function Dashboard() {
  const Column1 = [
    { label: "Id", name: "Id" },
    { label: "Quote Validity", name: "QuoteValidity" },
    { label: "Charges", name: "Charges" },
    { label: "Charge Description", name: "ChargeDescription" },
    { label: "Unit Per Kg", name: "UnitPerKg" },
    { label: "Currency", name: "Currency" },
    { label: "Amount Per Unit", name: "AmountPerUnit" },
    { label: "Cost And Sell Section", name: "CostAndSellSection" },
    { label: "Show Details", name: "Details" },
  ];
  const { Jobs, populateJobs } = useJob();
  const navigate = useNavigate();
  useEffect(() => {
    getJobs();
  }, []);
  const getJobs = useCallback(async () => {
    const jobs: Job[] = [];
    const docSnapshot = await getDocs(collection(db, "jobs"));
    if (docSnapshot.empty) return populateJobs([]);
    docSnapshot.forEach((doc) => {
      jobs.push({ ...(doc.data() as Job), id: doc.id });
    });
    populateJobs(jobs);
  }, [populateJobs]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Number of items to display per page

  // Calculate the range of items to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Jobs.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <section className="w-full flex flex-col items-center space-y-10">
      <h1 className="text-center font-serif text-5xl text-blue-600 mt-5">
        Current Jobs
      </h1>
      <div className="w-3/5 lg:w-4/5 mx-auto  overflow-auto">
        <table className="border border-slate-400 border-spacing-x-10 border-spacing-y-2">
          <thead>
            <tr>
              {Column1.map((i) => (
                <th className="border border-slate-300 p-4" key={i.name}>
                  {i.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Jobs &&
              Jobs.map((j) => (
                <tr key={j.id}>
                  <JobCard job={j} />
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} </span>
        <span> Page </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastItem >= Jobs.length}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default Dashboard;
