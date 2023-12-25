import React from "react";
import SideBar from "../Components/SIdeBar";
import useJob from "../store/Jobs";
import JobCard from "../Components/JobCard";
import { useNavigate } from "react-router-dom";
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
  const { Jobs } = useJob();
  const navigate = useNavigate();
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5; // Number of items to display per page

  // // Calculate the range of items to display for the current page
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = itemList.slice(indexOfFirstItem, indexOfLastItem);

  // // Function to handle page change
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };
  return (
    <section className="w-full flex flex-col items-center space-y-10">
      <h1 className="text-center font-serif text-5xl text-blue-600 mt-5">
        Current Jobs
      </h1>
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
          {Jobs.map((j) => (
            <tr>
              <JobCard job={j} />
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
        // onClick={() => handlePageChange(currentPage - 1)}
        // disabled={currentPage === 1}
        >
          Previous
        </button>
        {/* <span> Page {currentPage} </span> */}
        <span> Page </span>

        <button
        // onClick={() => handlePageChange(currentPage + 1)}
        // disabled={indexOfLastItem >= itemList.length}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default Dashboard;
