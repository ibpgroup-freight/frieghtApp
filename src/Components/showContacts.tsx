import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";
import ButtonBlue from "./ButtonBlue";
import CustomLoader from "./CustomLoader";
function ShowContacts() {
  const Column1 = [
    { name: "ContactId" },
    { name: "Name" },
    { name: "Email" },
    { name: "Phone" },
    { name: "Address" },
    { name: "Customer TRN" },
    { name: "Company" },

    { name: "Actions" },
  ];
  const [contacts, setcontacts] = useState<FetchContact[]>();
  const [reload, setreload] = useState<boolean>(false);
  const [loadingContacts, setloadingContacts] = useState<boolean>(false);
  useEffect(() => {
    getContacts();
  }, [reload]);
  const getContacts = useCallback(async () => {
    try {
      setloadingContacts(true);
      const ctcts = await getDocs(collection(db, "contacts"));
      if (ctcts.empty) return toast.info("You dont Have Any Contacts Yet");
      const c: FetchContact[] = [];
      ctcts.forEach((doc) =>
        c.push({
          contacts: {
            Address: doc.data().address,
            Company: doc.data().company,
            Email: doc.data().email,
            Name: doc.data().name,
            Phone: doc.data().phone,
            CustomerTrn: doc.data().trn,
            contactId: doc.data().contactId,
          } as Contact,
          id: doc.id,
        })
      );
      setcontacts(c);
    } catch (e) {
      toast.error("Couldnt Fetch Contacts , Try Again");
    } finally {
      setloadingContacts(false);
      setreload(false);
    }
  }, []);
  const deleteDocument = useCallback(async (id: string) => {
    try {
      const res = await deleteDoc(doc(db, "contacts", id));
      toast.success("deleted");
      setreload(true);
    } catch (e) {
      console.log(e);
      toast.error("Couldnt Delete Contact");
    }
  }, []);
  console.log("contacts,", contacts);
  return (
    <div className="w-4/6 mx-auto">
      <div className="w-full  lg:mx-auto  overflow-auto">
        {loadingContacts ? (
          <CustomLoader />
        ) : (
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
              {contacts?.map((c) => (
                <tr>
                  <td className="border border-slate-300 p-4 text-orange-500 font-bold">
                    {c.id}
                  </td>
                  <td className="border border-slate-300 p-4">
                    {c.contacts.Name}
                  </td>
                  <td className="border border-slate-300 p-4">
                    {c.contacts.Email}
                  </td>

                  <td className="border border-slate-300 p-4">
                    {c.contacts.Phone}
                  </td>
                  <td className="border border-slate-300 p-4">
                    {c.contacts.Address}
                  </td>
                  <td className="border border-slate-300 p-4">
                    {c.contacts.CustomerTrn}
                  </td>
                  <td className="border border-slate-300 p-4">
                    {c.contacts.Company}
                  </td>
                  <td className="border border-slate-300 p-4 space-y-2">
                    {/* <ButtonBlue onclick={() => {}} text="View" /> */}
                    <ButtonBlue
                      onclick={deleteDocument.bind(null, c.id)}
                      text="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ShowContacts;
