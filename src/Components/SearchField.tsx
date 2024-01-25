import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";
import useItemStore from "../store/Item";
import useInquiryItem from "../store/Inquiry";
import { useNavigate } from "react-router-dom";
const SearchField = () => {
  const searchTerm = useRef<HTMLInputElement | null>(null);
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const { setitemsArray } = useItemStore();
  const { setItemInquiry } = useInquiryItem();
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const docs = await getDocs(
          query(
            collection(db, "jobs"),
            where("jobid", "==", searchTerm.current?.value!)
          )
        );
        if (docs.empty) return;
        docs.forEach((doc) => {
          setSearchResults((p) => [
            // ...(p || []),
            {
              inquiry: doc.data().inquiry,
              Items: doc.data()?.Items,
              jobid: doc.data()?.jobid,
              id: doc.id,
              status: doc.data()?.status,
            },
          ]);
        });
      } catch (e) {
        toast.error("Couldnt Complete Your Query");
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  console.log(searchResults, "search results");
  return (
    <div className="flex items-center justify-center ">
      <div className="relative">
        <input
          type="text"
          className="border-2 py-2 text-black border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          placeholder="Search Job"
          ref={searchTerm}
        />
        <button className="absolute right-0 top-0 mt-3 mr-4">
          <svg
            className="text-gray-600 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M20.85 19.39l-3.73-3.73C18.22 15.09 19 13.64 19 12s-.78-3.09-2.12-4.24S13.64 5 12 5s-3.09.78-4.24 2.12S5 10.36 5 12s.78 3.09 2.12 4.24S10.36 19 12 19c1.64 0 3.09-.78 4.24-2.12l3.73 3.73c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77zM12 17c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
          </svg>
        </button>
        {
          <ul className="relative ">
            {searchResults.map((job, index) => (
              <li
                key={index}
                className="bg-blue-800 z-100 space-y-3 p-3 cursor-pointer rounded-sm divide-y-2 absolute z-999 text-white"
                onClick={() => {
                  setItemInquiry(job.inquiry);
                  setitemsArray(job.Items);
                  navigate(`/home?editJob=${job.id}`, { state: { job: job } });
                }}
              >
                {job.id}
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
};

export default SearchField;
