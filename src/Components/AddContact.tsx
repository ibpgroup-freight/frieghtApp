import React from "react";

function AddContact() {
  const inputOptions = [
    { label: "Name", type: "text" },
    { label: "Email", type: "email" },
    { label: "Phone", type: "number" },
  ];
  return (
    <div className="flex flex-col mx-auto w-3/5 space-y-2">
      {inputOptions.map((i) => (
        <>
          <label>{i.label}</label>
          <input
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            name={i.label}
            type={i.type}
          />
        </>
      ))}
      <button className="w-32 text-center bg-blue-900 mx-auto text-white p-2 py-3 rounded-md cursor-pointer">
        Add Contact
      </button>
    </div>
  );
}

export default AddContact;
