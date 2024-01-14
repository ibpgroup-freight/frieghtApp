import React from "react";

const SearchField = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="relative">
        <input
          type="text"
          className="border-2 py-2 text-black border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          placeholder="Search Job"
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
      </div>
    </div>
  );
};

export default SearchField;
