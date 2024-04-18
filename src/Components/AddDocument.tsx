import { ref } from "firebase/storage";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { storage } from "../firebase";
import { uploadBytes } from "firebase/storage";
import { LoaderIcon } from "react-hot-toast";
function AddDocument() {
  const [searchby, setsearchby] = useState<string>("quotation");
  const [searchValue, setsearchValue] = useState<string>(""); // Default search type
  const [file, setfile] = useState<File>();
  const [downloading, setisdownloading] = useState<boolean>(false);
  const UploadDOcument = useCallback(async () => {
    try {
      if (!searchValue || !searchby)
        return toast.error("Please Fill The Required Fields");
      setisdownloading(true);
      const docRef = ref(storage, `/${searchValue}/${file?.name}`);
      await uploadBytes(docRef, file as File);
      toast.success("Document Uploaded Successfully");
    } catch (e) {
      console.log(e);
      toast.error("Couldnt Upload File");
    } finally {
      setisdownloading(false);
    }
  }, [file, searchValue]);
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
      <button
        className="bg-blue-700 w-40 !mx-auto   text-white rounded-lg px-5 py-3 text-2xl self-start my-4 gap-4"
        onClick={UploadDOcument}
      >
        {downloading ? <LoaderIcon /> : "Upload document"}
      </button>
    </div>
  );
}

export default AddDocument;
