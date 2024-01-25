import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";
import ButtonBlue from "./ButtonBlue";
import CustomLoader from "./CustomLoader";
function Showusers() {
  const Column1 = [
    { name: "UserId" },
    { name: "Name" },
    { name: "Email" },
    { name: "Role" },
    { name: "Phone" },
    // { name: "Address" },
    { name: "Actions" },
  ];
  const [users, setusers] = useState<User[]>();
  const [reload, setreload] = useState<boolean>(false);
  const [loadingusers, setloadingusers] = useState<boolean>(false);
  useEffect(() => {
    getUsers();
  }, [reload]);
  const getUsers = useCallback(async () => {
    try {
      setloadingusers(true);
      const ctcts = await getDocs(collection(db, "users"));
      if (ctcts.empty) return toast.info("You dont Have Any users Yet");
      const c: User[] = [];
      ctcts.forEach((doc) =>
        c.push({ ...(doc.data() as User), userId: doc.id })
      );
      setusers(c);
    } catch (e) {
      toast.error("Couldnt Fetch users , Try Again");
    } finally {
      setloadingusers(false);
      setreload(false);
    }
  }, []);
  const deleteDocument = useCallback(async (id: string) => {
    try {
      const res = await deleteDoc(doc(db, "users", id));
      toast.success("deleted");
      setreload(true);
    } catch (e) {
      console.log(e);
      toast.error("Couldnt Delete Contact");
    }
  }, []);
  console.log("users,", users);
  return (
    <div className="w-4/6 mx-auto">
      <div className="w-full  lg:mx-auto  overflow-auto">
        {loadingusers ? (
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
              {users?.map((c) => (
                <tr key={c.userId}>
                  <td className="border border-slate-300 p-4 text-orange-500 font-bold">
                    {c.userId}
                  </td>
                  <td className="border border-slate-300 p-4">{c.username}</td>
                  <td className="border border-slate-300 p-4">{c.email}</td>
                  <td className="border border-slate-300 p-4">{c.role}</td>
                  <td className="border border-slate-300 p-4">{c.phone}</td>

                  <td className="border border-slate-300 p-4 space-y-2">
                    <ButtonBlue onclick={() => {}} text="View" />
                    <ButtonBlue
                      onclick={deleteDocument.bind(null, c.userId!)}
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

export default Showusers;
