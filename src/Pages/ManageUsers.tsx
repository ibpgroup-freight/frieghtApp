import React, { useCallback, useState } from "react";
const AddUser = React.lazy(() => import("../Components/AddUser"));
const ShowUsers = React.lazy(() => import("../Components/ShowUsers"));

function ManageUsers() {
  const [mode, setmode] = useState("AddUser");

  return (
    <div className="w-full space-y-6 py-4">
      <h1 className="font-serif text-blue-600 text-5xl text-center">Users</h1>
      <ul className="flex divide-x-6 space-x-20 justify-center items-center">
        <li
          className="w-32 text-center bg-blue-700 text-white p-2 py-3 rounded-md cursor-pointer"
          onClick={(e) => setmode("AddUser")}
        >
          Add User
        </li>
        <li
          className="w-32 text-center bg-blue-700 text-white p-2 rounded-md cursor-pointer"
          onClick={(e) => setmode("ShowUser")}
        >
          Show Users
        </li>
      </ul>
      <section>{mode === "AddUser" ? <AddUser /> : <ShowUsers />}</section>
    </div>
  );
}

export default ManageUsers;
