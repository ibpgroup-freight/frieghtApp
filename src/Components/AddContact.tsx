import React, { useState } from "react";
import { Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import CustomLoader from "./CustomLoader";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp } from "firebase/firestore";
const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Name is Required"),
  Email: Yup.string().required("Email is Required"),
  Phone: Yup.string().required("Phone is Required"),
  Company: Yup.string().required("Company is Required"),
  Address: Yup.string().required("Address is Required"),
});
function AddContact() {
  const [loading, setisloading] = useState<boolean>(false);
  const inputOptions = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "phone", type: "number" },
    { label: "Company", name: "company", type: "text" },
    { label: "Address", name: "address", type: "text" },
    // { label: "Customer TRN", name: "trn", type: "number" },
    { label: "CustomerReferenceNumber", name: "cref", type: "number" },
  ];
  const formikObj = useFormik<Contact>({
    initialValues: {
      Name: "",
      Email: "",
      Address: "",
      Phone: "",
      Company: "",
      CustomerTrn: "",
      CustomerReferenceNumber: "",
    },
    validationSchema,
    async onSubmit(values, formikHelpers) {
      try {
        setisloading(true);
        const contactId = uuidv4();
        const contact = await addDoc(collection(db, "contacts"), {
          name: values.Name,
          email: values.Email,
          address: values.Address,
          phone: values.Phone,
          company: values.Company,
          contactId,
          createdAt: serverTimestamp(),
          cref: values.CustomerReferenceNumber,
        });
        toast.success("Contact Added Successfully");
        formikHelpers.resetForm();
      } catch (e) {
        toast.error("Couldnt Add Contact .Please Try Again Later");
      } finally {
        setisloading(false);
      }
    },
  });
  return (
    <FormikProvider value={formikObj}>
      <div className="flex flex-col mx-auto w-3/5 space-y-2">
        <form onSubmit={formikObj.handleSubmit}>
          {inputOptions.map((i) => (
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
          ))}

          <button
            className="w-32 text-center bg-blue-700 mx-auto text-white my-5 p-2 py-3 rounded-md cursor-pointer"
            type="submit"
          >
            {loading ? (
              <CustomLoader
                customColor="white"
                height={80}
                customStyle="!h-12 border-white"
              />
            ) : (
              "Add Contact"
            )}
          </button>
        </form>
      </div>
    </FormikProvider>
  );
}

export default AddContact;
