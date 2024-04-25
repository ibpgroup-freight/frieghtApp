import React from "react";
import { useContext } from "react";
import { ModalCtx } from "../store/Modal";
import useItemStore from "../store/Item";
import { useFormik, FormikProvider, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useInquiryItem from "../store/Inquiry";
type qprops = {
  closeLadingBasis: React.Dispatch<React.SetStateAction<boolean>>;
};
const validationSchema = Yup.object().shape({
  charge: Yup.string(),
  rate: Yup.string(),
  basis: Yup.string(),
  wtvolval: Yup.string(),
  pc: Yup.string(),
  amount: Yup.number(),
});

function AddLadingBasis({ closeLadingBasis }: qprops) {
  const { setladingbasisItems } = useInquiryItem();
  const formikobj = useFormik({
    initialValues: {
      charge: "",
      rate: "",
      basis: "",
      wtvolval: "",
      pc: "",
      amount: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        console.log(values);
        setladingbasisItems(values);
        //   values.isEditing
        //     ? editPrestation(values, values.index)
        //     : setPrestation({
        //         currency: values.currency,
        //         description: values.description,
        //         total: values.total,
        //       });
        closeLadingBasis((p) => !p);
        ctx.setToggle();
      } catch (e) {
        console.log(e);
      }
    },
  });
  const ctx = useContext(ModalCtx);
  const PrestationColumn = [
    { label: "Charge", name: "charge", type: "text" },
    { label: "Rate", name: "rate", type: "text" },
    { label: "Basis", name: "basis", type: "text" },
    { label: "Wt/Vol/Val", name: "wtvolval", type: "text" },
    { label: "P/C", name: "pc", type: "text" },
    { label: "Amount", name: "amount", type: "text" },
  ];

  console.log(formikobj.errors);
  return (
    <FormikProvider value={formikobj}>
      <div className=" mx-auto md:w-3/5 px-10 bg-white border border-black z-1000 py-10 rounded-md">
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.nativeEvent.preventDefault();
            e.nativeEvent.stopImmediatePropagation();
            formikobj.handleSubmit(e);
          }}
        >
          <div
            className="text-white  bg-red-600  p-1 px-3 cursor-pointer rounded-full text-xl relative w-9 right-9"
            onClick={(e) => {
              ctx.setToggle();
              closeLadingBasis((p) => !p);
            }}
          >
            X
          </div>

          <h2 className=" text-4xl text-black-800 w-full font-serif text-center  uppercase ">
            Add Details
          </h2>
          <hr className="mb-10 mt-5"></hr>
          <div className="flex flex-col justify-center items-center">
            {PrestationColumn.map((i) => (
              <div
                className="flex flex-col items-center justify-start"
                key={i.name}
              >
                <label className="text-xl">{i.label}</label>

                <Field
                  as={i.type === "textarea" ? "textarea" : "input"}
                  type={i.type === "textarea" ? "textarea" : "input"}
                  name={i.name}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name={i.name}
                  component="div"
                  className="text-red-500"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-5">
            <button className="p-4 bg-blue-600 text-white rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </FormikProvider>
  );
}

export default AddLadingBasis;
