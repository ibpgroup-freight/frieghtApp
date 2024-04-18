import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

function AddDocument() {
  const [searchby, setsearchby] = useState<string>("quotation");
  const [searchValue, setsearchValue] = useState<string>(""); // Default search type
  const [file, setfile] = useState<any>();
  const UploadDOcument = useCallback(() => {
    if (!searchValue || !searchby)
      return toast.error("Please Fill The Required Fields");
  }, []);
  return (
    <div className="flex flex-col">
      <div className="mb-4 w-3/5">
        <label>Upload For Job Or Quotation?</label>
        <select
          className="w-3/5 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          onChange={(e) => {
            setsearchby(e.target.value!);
          }}
          defaultValue={searchby}
        >
          <option>Select</option>
          <option value={"quotation"}>Quotation</option>
          <option value={"job"}>Job</option>
        </select>
        <label
          htmlFor="searchInput"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Enter {searchby === "quotation" ? "Quotation Id" : "Job Id"}
        </label>
        <input
          type="text"
          id="searchInput"
          className="border p-2 w-full rounded-md"
          placeholder={`Enter Id`}
          onChange={(e) => setsearchValue(e.target.value)}
        />
      </div>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) setfile(e.target.files[0]);
        }}
      />
      <button onClick={UploadDOcument}>Upload document</button>
    </div>
  );
}

export default AddDocument;
