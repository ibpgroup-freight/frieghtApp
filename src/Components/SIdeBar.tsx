import React, { useState } from "react";
import { Link } from "react-router-dom";
function SideBar() {
  const Options = [
    { path: "/airfreight", name: "Air Freight", option: "AirFreightDropDown" },
    { path: "/seafreight", name: "Sea Freight", option: "SeaFreightDropDown" },
    {
      path: "/roadfreight",
      name: "Road Freight",
      option: "RoadFreightDropDown",
    },
  ];
  const [showDropDown, setShowDropDown] = useState("");
  console.log(showDropDown);
  return (
    <aside className="bg-blue-600 text-white flex flex-col w-1/6 items-center h-screen py-20">
      <ul className="space-y-10">
        {Options.map((o) => (
          <li
            className="text-2xl relative"
            key={o.path}
            onMouseEnter={() => setShowDropDown(o.name)}
            onMouseLeave={() => setShowDropDown("")}
          >
            <Link to={o.path} className="capitalize">
              {o.name}
            </Link>
            {showDropDown === o.name && (
              <div className="absolute z-10">
                <DropDown dropdown={o.option as keyof DropdownType} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
type DropdownOptionType = {
  path: string;
  name: string;
};
type DropdownType = {
  AirFreightDropDown: DropdownOptionType[];
  SeaFreightDropDown: DropdownOptionType[];
  RoadFreightDropDown: DropdownOptionType[];
};
function DropDown({ dropdown }: { dropdown: keyof DropdownType }) {
  const dropdownOptions = {
    AirFreightDropDown: [
      {
        path: "/airfreightimport",
        name: "Air freight import (AI)",
      },
      {
        name: "Air freight Export (AE) ",
        path: "/airfreightexport",
      },
      { name: "Air freight Clearance (AC) ", path: "/airfreightclearance" },
      { name: "Air freight cross trade (AX) ", path: "/airfreightcrosstrade" },
    ],
    SeaFreightDropDown: [
      {
        path: "/seafreightimport",
        name: "Sea freight import (SI)",
      },
      {
        name: "Sea freight Ex port (SE)",
        path: "/seafreightexport",
      },
      { name: "Sea freight Clearance (SC)", path: "/seafreightclearance" },
      { name: "Sea freight cross trade (SX) ", path: "/seafreightcrosstrade" },
    ],
    RoadFreightDropDown: [
      {
        path: "/roadfreightimport",
        name: "Road freight import (SI)",
      },
      {
        name: "Road freight Ex port (SE)",
        path: "/roadfreightexport",
      },
    ],
  };

  return (
    <ul className="bg-white text-black z-100 space-y-3 p-1 rounded-sm divide-y">
      {dropdownOptions[dropdown].map((d) => (
        <li key={d.path} className="text-sm">
          <Link to={d.path}> {d.name}</Link>
        </li>
      ))}
    </ul>
  );
}
export default SideBar;
