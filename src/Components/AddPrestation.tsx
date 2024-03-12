import React from "react";
import { useContext } from "react";
import { ModalCtx } from "../store/Modal";
import useItemStore from "../store/Item";
import { useFormik, FormikProvider, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useInquiryItem from "../store/Inquiry";
type qprops = {
  closePrestation: React.Dispatch<React.SetStateAction<boolean>>;
  AddItemToInvoice?: (item: QuotationItem) => void;
  quotationType?: string;
  toEdit: any;
};
const validationSchema = Yup.object().shape({
  description: Yup.string().required("Field is Required"),
  currency: Yup.string().required("Field is Required"),
  total: Yup.string().required("Field is Required"),
});

// const AReducer = (state: QuotationItem, action: QuotationAction) => {
//   switch (action.type) {
//     case "AmountPerUnit":
//     case "ChargeDescription":
//     case "Charges":
//     case "CostAndSellSection":
//     case "Currency":
//     case "QuoteValidity":
//     case "UnitPerKg":
//       return { ...state, [action.type]: action.payload.value };
//     default:
//       return { ...state };
//   }
// };
function AddPrestation({
  closePrestation,
  AddItemToInvoice,
  quotationType,
  toEdit,
}: qprops) {
  // const [val, setval] = React.useState("");
  const { prestation, setPrestation, editPrestation } = useInquiryItem();
  // const [state, dispatch] = React.useReducer(AddQuotationReducer, InitialState);
  const formikobj = useFormik({
    initialValues: {
      currency: "",
      description: "",
      total: 0,
      isEditing: false,
      ...(toEdit ?? {}),
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      values.isEditing
        ? editPrestation(values, values.index)
        : setPrestation({
            currency: values.currency,
            description: values.description,
            total: values.total,
          });
      closePrestation((p) => !p);
      ctx.setToggle();
      try {
      } catch (e) {
        console.log(e);
      }
    },
  });
  const ctx = useContext(ModalCtx);
  const PrestationColumn = [
    { label: "Description", name: "description", type: "textarea" },
    { label: "Currency", name: "currency", type: "text" },
    { label: "Total", name: "total", type: "number" },
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
              closePrestation((p) => !p);
            }}
          >
            X
          </div>
          <div
            className="text-white  bg-red-600  p-1 px-3 cursor-pointer rounded-full text-xl absolute right-9"
            onClick={(e) => {
              ctx.setToggle();
              closePrestation((p) => !p);
            }}
          >
            X
          </div>
          <h2 className=" text-4xl text-black-800 w-full font-serif text-center  uppercase ">
            Add Prestation Details
          </h2>
          <hr className="mb-10 mt-5"></hr>
          <div className="flex flex-col sm:flex-row justify-evenly">
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

export default AddPrestation;
