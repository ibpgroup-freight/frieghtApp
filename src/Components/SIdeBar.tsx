import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faTruck,
  faShip,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
function SideBar() {
  const Options = [
    {
      path: "/airfreight",
      name: "Air Freight",
      option: "AirFreightDropDown",
      icon: faPlaneDeparture,
    },
    {
      path: "/seafreight",
      name: "Sea Freight",
      option: "SeaFreightDropDown",
      icon: faShip,
    },
    {
      path: "/roadfreight",
      name: "Road Freight",
      option: "RoadFreightDropDown",
      icon: faTruck,
    },
  ];
  const [showDropDown, setShowDropDown] = useState("");
  console.log(showDropDown);
  return (
    <aside className="bg-blue-600 text-white flex flex-col w-1/6 items-center h-screen py-20">
      <ul className="space-y-10 w-full">
        {Options.map((o) => (
          <li
            className="text-2xl relative flex flex-row justify-between px-4 items-center"
            key={o.path}
            onMouseEnter={() => setShowDropDown(o.name)}
            onMouseLeave={() => setShowDropDown("")}
          >
            {o.name}
            <FontAwesomeIcon icon={o.icon as IconProp} />

            {showDropDown === o.name && (
              <div className="absolute top-full z-20">
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
        path: "/home?method=airfreightimportAI",
        name: "Air freight import (AI)",
      },
      {
        name: "Air freight Export (AE) ",
        path: "/home?method=airfreightexportAE",
      },
      {
        name: "Air freight Clearance (AC) ",
        path: "/home?method=airfreightclearanceAC",
      },
      {
        name: "Air freight cross trade (AX) ",
        path: "/home?method=airfreightcrosstradeAX",
      },
    ],
    SeaFreightDropDown: [
      {
        path: "/home?method=seafreightimportSI",
        name: "Sea freight import (SI)",
      },
      {
        name: "Sea freight Ex port (SE)",
        path: "/home?method=seafreightexportSE",
      },
      {
        name: "Sea freight Clearance (SC)",
        path: "/home?method=seafreightclearanceSC",
      },
      {
        name: "Sea freight cross trade (SX) ",
        path: "/home?method=seafreightcrosstradeSX",
      },
    ],
    RoadFreightDropDown: [
      {
        path: "/home?method=roadfreightimportSI",
        name: "Road freight import (SI)",
      },
      {
        name: "Road freight Ex port (SE)",
        path: "/home?method=roadfreightexportSE",
      },
    ],
  };

  return (
    <ul className="bg-blue-800 text-black z-100 space-y-3 p-3 rounded-sm divide-y-2">
      {dropdownOptions[dropdown].map((d) => (
        <li key={d.path} className="text-lg text-white">
          <Link to={d.path} reloadDocument>
            {d.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default SideBar;
