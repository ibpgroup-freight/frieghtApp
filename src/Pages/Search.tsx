import React, { useState } from "react";

function Search() {
  const [searchType, setSearchType] = useState("user"); // Default search type

  const handleSearch = (searchValue: string) => {
    // Implement your search logic based on searchType and searchValue
    console.log(`Searching for ${searchType} with ID: ${searchValue}`);
    // Add your actual search logic here
  };
  return (
    <div className="w-full bg-white p-6 rounded-md shadow-md">
      <div className=" w-3/6 items-center px-5 flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Search</h2>
        <div className="mb-4">
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
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="contact">Contact</option>
            <option value="job">Job</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="searchType"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Search by
          </label>
          <select
            id="searchType"
            className="border p-2 w-full rounded-md"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="id">Id</option>
            <option value="email">Email</option>
            <option value="phone">Number</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="searchInput"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Search ID
          </label>
          <input
            type="text"
            id="searchInput"
            className="border p-2 w-full rounded-md"
            placeholder={`Enter ${searchType} ID`}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button className="bg-blue-500 rounded-md text-white px-3 py-2">
          Search
        </button>
      </div>
      <h1>Results</h1>
    </div>
  );
}

export default Search;
