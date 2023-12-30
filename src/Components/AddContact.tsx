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
            className="border-2 border-slate-300 px-2 py-1 rounded-md w-full focus:outline-none "
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
