import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useCallback, useRef, useState } from "react";
import { db, storage } from "../firebase";
import { v4 } from "uuid";
import CustomLoader from "../Components/CustomLoader";
import { useNavigate } from "react-router-dom";
import useItemStore from "../store/Item";
import useInquiryItem from "../store/Inquiry";
import { deleteObject, getDownloadURL, list, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { LoaderIcon } from "react-hot-toast";
import AddDocument from "../Components/AddDocument";
type searchType = "jobs" | "quotations";

function Documents() {
  const [searchValue, setsearchValue] = useState<string>(""); // Default search type
  const [mode, setmode] = useState<boolean>(false);
  const [loading, setisloading] = useState<boolean>(false);
  const [SearchResults, setSearchResults] = useState<
    { name: string; downloadUrl: string; location: string }[]
  >([]);

  const submitHandler = async () => {
    try {
      setisloading(true);
      const storageRef = ref(storage, searchValue);
      const listResult = await list(storageRef);
      if (listResult.items.length == 0) {
        toast.info("No Documents For This Id Exists.");
        return;
      }
      const files = await Promise.all(
        listResult.items.map(async (item: any) => {
          console.log(item);

          const url = await getDownloadURL(ref(storage, item._location.path_));
          return {
            name: item.name,
            downloadUrl: url,
            location: item._location.path_,
          };
        })
      );

      // Filter files based on search query
      console.log("files", files);
      // const filteredFiles = files.filter((file) =>
      //   file.name.includes(searchValue)
      // );

      setSearchResults(files);
    } catch (error) {
      console.error("Error searching files:", error);
      toast.error("Couldnt Fetch Your Documents.Please Try Again.");
    } finally {
      setisloading(false);
    }
  };

  const deleteFileFromdb = async (location: string, name: string) => {
    try {
      const docref = ref(storage, location);
      await toast.promise(
        new Promise(async (res, rej) => {
          try {
            await deleteObject(docref);
            res("Success");
          } catch (e) {
            rej("An Error Occured");
          }
        }),
        {
          error: "Couldnt Delete Document",
          pending: "Deleting",
          success: "Deleted Successfully",
        }
      );
      await submitHandler();
    } catch (e) {
      toast.error("Couldnt Delete Document " + e);
    } finally {
    }
  };
  return (
    <div className="w-full bg-white p-6 rounded-md shadow-md">
      <div>
        <button
          onClick={() => {
            setmode((p) => !p);
          }}
          className="bg-blue-700  !mx-auto   text-white rounded-lg px-5 py-3 text-lg self-start my-4 gap-4"
        >
          Switch To {!mode ? "Add Document" : "Download Document"}
        </button>
      </div>
      {mode ? (
        <AddDocument />
      ) : (
        <>
          <div className="w-full flex flex-col lg:flex-row space-x-0 lg:space-x-8 items-center px-5  justify-start gap-5">
            <div className="mb-4 w-3/5">
              <label
                htmlFor="searchInput"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Enter Id
              </label>
              <input
                type="text"
                id="searchInput"
                className="border p-2 w-full rounded-md"
                placeholder={`Enter Id`}
                onChange={(e) => setsearchValue(e.target.value)}
              />
            </div>
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
                    <th>Name</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {SearchResults.length > 0 &&
                    SearchResults.map((ans: any, index: number) => (
                      <tr key={index} className="bg-white">
                        <td className="border border-slate-300 p-4 text-left">
                          {ans.name}
                        </td>
                        <td className="border border-slate-300 p-4 text-left">
                          <a className="pointer-cursor " href={ans.downloadUrl}>
                            Download
                          </a>
                          <a
                            className="pointer-cursor ml-12 text-red-700 cursor-pointer"
                            onClick={deleteFileFromdb.bind(
                              null,
                              ans.location,
                              ans.name
                            )}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Documents;
