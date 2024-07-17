import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import React, { useCallback, useState } from "react";
import { db } from "../firebase";
import { v4 } from "uuid";
import CustomLoader from "../Components/CustomLoader";
import { useNavigate } from "react-router-dom";
import useItemStore from "../store/Item";
import useInquiryItem from "../store/Inquiry";
import { toast } from "react-toastify";
type searchType = "users" | "contacts" | "jobs" | "quotations";
type searchBy = "id" | "email" | "phone" | "status";
function Search() {
  const [searchType, setSearchType] = useState<searchType>("users"); // Default search type
  const [searchBy, setSearchBy] = useState<searchBy>("id"); // Default search type
  const [searchValue, setsearchValue] = useState<string>(""); // Default search type
  const [jobStatus, setjobStatus] = useState<JobStatus>(); // Default search type

  const navigate = useNavigate();
  const [searchAns, setsearchAns] = useState<any>([]);
  const [loading, setisloading] = useState<boolean>(false);
  const { setitemsArray } = useItemStore();
  const { inquiry, setPrestationArray, setItemInquiry } = useInquiryItem();
  const submitHandler = async () => {
    try {
      let searchResults: any = [];
      setisloading(true);
      console.log(jobStatus, searchBy, searchType);
      if (jobStatus && searchType == "jobs" && searchBy == "status") {
        searchResults = await getDocs(
          query(collection(db, searchType), where(searchBy, "==", jobStatus))
        );
      } else if (
        jobStatus &&
        searchType == "quotations" &&
        searchBy == "status"
      ) {
        searchResults = await getDocs(
          query(collection(db, searchType), where(searchBy, "==", jobStatus))
        );
      } else {
        console.log("in here", searchType, searchBy, searchValue);
        searchResults = await getDocs(
          query(
            collection(db, searchType),
            where(
              searchBy,
              "==",
              searchBy == "phone" ? parseInt(searchValue) : searchValue
            )
          )
        );
      }

      const res: any = [];
      if (searchResults.empty) {
        setsearchAns([]);
        toast.info("No Result");
        return console.log("empty");
      }
      searchResults.forEach((s: any) => res.push(s.data()));
      setsearchAns(res);
    } catch (e) {
      console.log(e);
      toast.error("An Error Occured , Please Try Later");
    } finally {
      setisloading(false);
    }
  };
  const ViewJob = useCallback(() => {
    navigate(`/jobDetails`);
  }, []);
  console.log(searchAns);
  return (
    <div className="w-full bg-white p-6 rounded-md shadow-md">
      <div className="w-full flex flex-col lg:flex-row space-x-0 lg:space-x-8 items-center px-5  justify-between">
        <h2 className="text-2xl font-semibold mb-4">Search</h2>
        <div className="mb-4 w-full ">
          <label
            htmlFor="searchType"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Search Type
          </label>
          <select
            id="searchType"
            className="border p-2 w-full rounded-md"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as searchType)}
          >
            <option value="users">User</option>
            <option value="contacts">Contact</option>
            <option value="jobs">Job</option>
            <option value="quotations">Quotation</option>
          </select>
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="searchBy"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Search by
          </label>
          <select
            id="searchBy"
            className="border p-2 w-full rounded-md"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value as searchBy)}
          >
            <option value={""}>Select</option>
            <option
              value={
                searchType == "users"
                  ? "userId"
                  : searchType == "contacts"
                  ? "contactId"
                  : searchType == "jobs"
                  ? "jobid"
                  : "quotationId"
              }
            >
              Id
            </option>
            {searchType !== "quotations" && searchType !== "jobs" && (
              <>
                <option value="email">Email</option>
                <option value="phone">Number</option>
              </>
            )}
            {(searchType == "users" || searchType == "contacts") && (
              <option value={searchType === "users" ? "username" : "name"}>
                Name
              </option>
            )}
            {(searchType == "jobs" || searchType == "quotations") && (
              <>
                <option value="status">Status</option>
              </>
            )}
          </select>
        </div>

        {(searchType == "jobs" && searchBy == "status") ||
        (searchType == "quotations" && searchBy == "status") ? (
          <div className="mb-4 w-full ">
            <label
              htmlFor="searchType"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Search Type
            </label>
            <select
              id="searchType"
              className="border p-2 w-full rounded-md"
              value={jobStatus}
              onChange={(e) => setjobStatus(e.target.value as JobStatus)}
            >
              {searchType == "jobs" && searchBy == "status" && (
                <>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="In transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="under Customs Clearance">
                    Under Customs Clearance
                  </option>
                </>
              )}
              {searchType == "quotations" && searchBy == "status" && (
                <>
                  <option value="approved">Approved</option>
                  <option value="disapproved">Disapproved</option>
                </>
              )}
              <option value="pending">Pending</option>
            </select>
          </div>
        ) : (
          <div className="mb-4 w-full">
            <label
              htmlFor="searchInput"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Search {searchBy}
            </label>
            <input
              type="text"
              id="searchInput"
              className="border p-2 w-full rounded-md"
              placeholder={`Enter ${searchType} information`}
              onChange={(e) => setsearchValue(e.target.value)}
            />
          </div>
        )}
        <button
          className="bg-blue-500 rounded-md text-white px-3 py-2 my-4 lg:my-0"
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? (
            <CustomLoader customStyle="!h-12" height={50} />
          ) : (
            "Search"
          )}
        </button>
      </div>
      <div className="w-full  lg:mx-auto overflow-auto ">
        {loading ? (
          <CustomLoader customStyle="!h-32 sm:h-auto" />
        ) : (
          <table className="w-full mx-auto border border-collapse border-slate-400">
            <thead className="bg-slate-200">
              <tr className="border border-slate-300 p-4">
                {searchAns.length > 0 &&
                  Object.keys(searchAns[0]).map((e) => (
                    <th
                      key={v4()}
                      className="border border-slate-300 p-4 text-left"
                    >
                      {e.toLocaleUpperCase()}
                    </th>
                  ))}
                {(searchType === "quotations" || searchType === "jobs") && (
                  <th>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {searchAns.length > 0 &&
                searchAns.map((ans: any, index: number) => (
                  <tr key={index} className="bg-white">
                    {Object.values(ans).map((e: any, innerIndex: number) => (
                      <td
                        key={innerIndex}
                        className="border border-slate-300 p-4 text-left"
                      >
                        {typeof e === "number" || typeof e === "string"
                          ? e
                          : e instanceof Timestamp && e.toDate().toDateString()}
                      </td>
                    ))}
                    {(searchType === "quotations" || searchType === "jobs") && (
                      <td>
                        <h5
                          onClick={() => {
                            console.log(searchAns);
                            if (searchType === "jobs") {
                              setItemInquiry({
                                ...searchAns[0].inquiry,
                                quotationId: searchAns[0]?.jobid,
                              });
                              setitemsArray(searchAns[0]?.Items || []);
                              setPrestationArray(
                                searchAns[0]?.prestation || []
                              );
                              ViewJob();
                            } else if (searchType === "quotations") {
                              setItemInquiry({
                                ...searchAns[0].inquiry,
                                quotationId: searchAns[0]?.quotationid,
                              });
                              setitemsArray(searchAns[0]?.Items || []);
                              setPrestationArray(
                                searchAns[0]?.prestation || []
                              );
                              navigate("/quotationDetails");
                            }
                          }}
                        >
                          View{" "}
                        </h5>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Search;
