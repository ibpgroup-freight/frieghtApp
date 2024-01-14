import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faTruck,
  faShip,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
function SideBar({ showSideBar }: { showSideBar: boolean }) {
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
    {
      path: "/generateInvoice",
      name: "Invoice",
      icon: faFileInvoiceDollar,
    },
    {
      path: "/manageContacts",
      name: "Contacts",
      icon: faAddressBook,
    },
  ];
  const [showDropDown, setShowDropDown] = useState("");
  const navigate = useNavigate();
  return (
    <aside
      className={`bg-blue-600 z-9999  fixed w-3/5 md:relative lg:block text-white md:flex flex-col md:min-w-64 sm:min-w-44 md:w-1/6 items-center h-screen py-20 ${
        showSideBar ? "block" : "hidden"
      }`}
    >
      <ul className="space-y-10 w-full">
        {Options.map((o) => (
          <li
            className="text-2xl relative flex flex-row justify-between px-4 items-center cursor-pointer"
            key={o.path}
            onMouseEnter={() => (o.option ? setShowDropDown(o.name) : () => {})}
            onMouseLeave={() => setShowDropDown("")}
            onClick={() => (!o.option ? navigate(`${o.path}`) : () => {})}
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
