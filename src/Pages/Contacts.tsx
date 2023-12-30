import React, { Suspense, useCallback, useState } from "react";
const AddContact = React.lazy(() => import("../Components/AddContact"));
const ShowContact = React.lazy(() => import("../Components/showContacts"));

function Contacts() {
  const [mode, setmode] = useState("AddContact");

  return (
    <div className="w-full space-y-6 py-4">
      <h1 className="font-serif text-blue-600 text-5xl text-center">
        Contacts
      </h1>
      <ul className="flex divide-x-6 space-x-20 justify-center items-center">
        <li className="w-32 text-center bg-blue-700 text-white p-2 py-3 rounded-md cursor-pointer" onClick={(e) => setmode("AddContact")}>
          Add Contacts
        </li>
        <li className="w-32 text-center bg-blue-700 text-white p-2 rounded-md cursor-pointer" onClick={(e) => setmode("ShowContact")}>
          Show Contacts
        </li>
      </ul>
      <section>
        {mode === "AddContact" ? <AddContact /> : <ShowContact />}
      </section>
    </div>
  );
}

export default Contacts;
