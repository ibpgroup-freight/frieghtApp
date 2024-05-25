import React, { useState, useCallback } from "react";
import * as Yup from "yup";
import { useFormik, FormikProvider, Field, ErrorMessage } from "formik";
import ButtonBlue from "../Components/ButtonBlue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import CustomLoader from "../Components/CustomLoader";
import {
  doc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
const validationSchema = Yup.object().shape({
  Username: Yup.string().required("Username is Required"),
  Email: Yup.string().required("Email is Required"),
  Password: Yup.string().required("Password is Required"),
  Phone: Yup.number().required("Phone Number is Required"),
  Role: Yup.string()
    .oneOf(["User", "Admin", "SuperAdmin", "Editor"])
    .required("Enter a Role"),
});
function AddUser() {
  const [addingUser, setaddingUser] = useState<boolean>(false);
  const inputOptions = [
    { label: "Username", type: "text" },
    { label: "Email", type: "email" },
    { label: "Password", type: "password" },
    { label: "Phone", type: "number" },

    { label: "Role", type: "select", options: ["User", "Admin"] },
  ];
  const formikObj = useFormik({
    initialValues: {
      Username: "",
      Email: "",
      Password: "",
      Phone: "",
      Role: "",
    },
    async onSubmit(values, formikHelpers) {
      try {
        await AddUser(
          values.Email,
          values.Password,
          values.Username,
          values.Role,
          values.Phone
        );
        formikHelpers.resetForm();
      } catch (e) {
        console.log(e);
      }
    },
    validationSchema,
  });
  const AddUser = useCallback(
    async (
      Email: string,
      Password: string,
      Username: string,
      Role: string,
      Phone: string
    ) => {
      try {
        setaddingUser(true);
        const c = await createUserWithEmailAndPassword(auth, Email, Password);
        await setDoc(doc(db, "users", c.user.uid), {
          email: Email,
          username: Username,
          role: Role,
          createdAt: serverTimestamp(),
          phone: Phone,
        });
        toast.success("Successfully created And Signed Is As New User");
      } catch (e) {
        console.log(e);
        toast.error("Couldnt Create User.Try Again Later ." + e);
        throw e;
      } finally {
        setaddingUser(false);
      }
    },
    []
  );
  return (
    <FormikProvider value={formikObj}>
      <div className="flex flex-col mx-auto w-3/5 space-y-2">
        <h1 className="font-serif text-4xl text-blue-400">Add User</h1>
        <form onSubmit={formikObj.handleSubmit}>
          {inputOptions.map((i) =>
            i.type !== "select" ? (
              <React.Fragment key={i.label}>
                <label htmlFor={i.label}>{i.label}</label>
                <Field
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  name={i.label}
                  type={i.type}
                />
                <ErrorMessage
                  name={i.label}
                  component="div"
                  className="text-red-500"
                />
              </React.Fragment>
            ) : (
              <React.Fragment key={i.label}>
                <label htmlFor={i.label}>{i.label}</label>
                <Field
                  as={i.type}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  name={i.label}
                  type={i.type}
                >
                  {i.options?.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </Field>
                <ErrorMessage
                  name={i.label}
                  component="div"
                  className="text-red-500"
                />
              </React.Fragment>
            )
          )}
          <button
            type="submit"
            className="bg-blue-600 mx-auto my-4 px-7 py-3 text-white rounded-md"
          >
            {addingUser ? (
              <CustomLoader
                customStyle="!h-12"
                height={40}
                customColor="white"
              />
            ) : (
              "Add User"
            )}
          </button>
        </form>
      </div>
    </FormikProvider>
  );
}

export default AddUser;
