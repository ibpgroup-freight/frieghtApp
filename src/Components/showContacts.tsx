import React from "react";

function showContacts() {
  const Column1 = [{ name: "Name" }, { name: "Email" }, { name: "Phone" }];

  return (
    <div className="w-4/6 mx-auto">
      <table className="mx-auto border border-slate-400 border-spacing-x-10 border-spacing-y-2">
        <thead>
          <tr>
            {Column1.map((i) => (
              <th className="border border-slate-300 p-4" key={i.name}>
                {i.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td className="border border-slate-300 p-4"></td>
            <td className="border border-slate-300 p-4">{i.Charges}</td>
            <td className="border border-slate-300 p-4">
              {i.ChargeDescription}
            </td>
            <td className="border border-slate-300 p-4">{i.UnitPerKg}</td>
            <td className="border border-slate-300 p-4">{i.Currency}</td>
            <td className="border border-slate-300 p-4">{i.AmountPerUnit}</td>
            <td className="border border-slate-300 p-4">
              {i.CostAndSellSection}
            </td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default showContacts;
