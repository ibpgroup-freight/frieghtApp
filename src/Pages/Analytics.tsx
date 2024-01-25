import React, { useCallback, useEffect, useState } from "react";
import SideBar from "../Components/SIdeBar";
import useJob from "../store/Jobs";
import JobCard from "../Components/JobCard";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import CustomLoader from "../Components/CustomLoader";
import { toast } from "react-toastify";
function Analytics() {
  const Column1 = [
    { label: "Id", name: "Id" },
    // { label: "Quote Validity", name: "QuoteValidity" },
    { label: "Charges", name: "Charges" },
    { label: "Charge Description", name: "ChargeDescription" },
    { label: "Unit Per Kg", name: "UnitPerKg" },
    { label: "Currency", name: "Currency" },
    { label: "Amount Per Unit", name: "AmountPerUnit" },
    // { label: "Cost And Sell Section", name: "CostAndSellSection" },
    { label: "Actions", name: "Actions" },
    { label: "Status", name: "Status" },
    { label: "Change Status", name: "ChangeStatus" },
  ];
  const { Jobs, populateJobs } = useJob();
  const [loading, setisloading] = useState<boolean>(false);
  const [refresh, setrefresh] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    getJobs();
  }, [refresh]);
  const handleDelete = useCallback(() => {
    setrefresh(true);
  }, []);
  const getJobs = useCallback(async () => {
    try {
      setisloading(true);
      const jobs: Job[] = [];
      const docSnapshot = await getDocs(collection(db, "jobs"));
      if (docSnapshot.empty) return populateJobs([]);
      docSnapshot.forEach((doc) => {
        jobs.push({ ...(doc.data() as Job), id: doc.id });
      });
      populateJobs(jobs);
    } catch (e) {
      toast.error("Couldnt Fetch Jobs ,Try Again");
    } finally {
      setisloading(false);
      setrefresh(false);
    }
  }, [populateJobs]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2; // Number of items to display per page

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
        {loading ? (
          <CustomLoader />
        ) : (
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
                currentItems.map((j) => (
                  <tr key={j.id}>
                    <JobCard
                      job={j}
                      key={j.jobid}
                      ondelete={handleDelete}
                      status={j.status}
                      refresh={handleDelete}
                    />
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex space-x-2 items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          <span>Back</span>
        </button>

        {/* <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button> */}
        <span> Page {currentPage} </span>

        {/* <button>Next</button> */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastItem >= Jobs.length}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:hover:bg-blue-500
           focus:outline-none focus:ring focus:border-blue-300"
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Analytics;
