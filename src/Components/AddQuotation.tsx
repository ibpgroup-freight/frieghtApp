import React from "react";
import { useContext } from "react";
import { ModalCtx } from "../store/Modal";
import useItemStore from "../store/Item";
import { useFormik, FormikProvider, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
type qprops = {
  closeQuotation: React.Dispatch<React.SetStateAction<boolean>>;
  AddItemToInvoice?: (item: QuotationItem) => void;
  quotationType?: string;
  toEdit?: any;
};
const validationSchema = Yup.object().shape({
  QuoteValidity: Yup.string().when("type", {
    is: (type: string) =>
      !type?.includes("BillOfLading") &&
      !type.includes("AirwayBill") &&
      !type.includes("CargoManifest") &&
      !type.includes("ProofOfDelivery"),
    then: (schema) => schema.required("Quote Validity is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  Charges: Yup.string().when("type", {
    is: (type: string) =>
      (!type?.includes("BillOfLading") &&
        !type.includes("AirwayBill") &&
        !type.includes("CargoManifest") &&
        !type.includes("ProofOfDelivery")) ||
      type === "CargoManifest",
    then: (schema) => schema.required("Charges required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  ChargeDescription: Yup.string().when("type", {
    is: (type: string) =>
      !type?.includes("BillOfLading") &&
      !type.includes("AirwayBill") &&
      !type.includes("CargoManifest") &&
      !type.includes("ProofOfDelivery"),
    then: (schema) => schema.required("Charge Description is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // UnitPerKg: Yup.number().required("Unit Per Kg is required"),
  type: Yup.string(),
  Currency: Yup.string().when("type", {
    is: (type: string) =>
      !type?.includes("BillOfLading") &&
      !type.includes("AirwayBill") &&
      !type.includes("CargoManifest") &&
      !type.includes("ProofOfDelivery"),
    then: (schema) => schema.required("Currency is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  RateAmountPerUnit: Yup.string(),
  MinRateAmountPerUnit: Yup.string(),
  MaxRateAmountPerUnit: Yup.string(),
  NoOfPackages: Yup.string().when("type", {
    is: (type: string) =>
      type?.includes("BillOfLading") || type === "ProofOfDelivery",
    then: (schema) => schema.required("No Of Packages are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  PackageDescription: Yup.string().when("type", {
    is: (type: string) => type?.includes("BillOfLading"),
    then: (schema) => schema.required("Package Description is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  SealNo: Yup.string().when("type", {
    is: (type: string) => type?.includes("BillOfLading"),
    then: (schema) => schema.required("SealNo is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  ContainerNo: Yup.string().when("type", {
    is: (type: string) => type?.includes("BillOfLading"),
    then: (schema) => schema.required("ContainerNo is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // MinCostAmountPerUnit: Yup.string().required(
  //   "Cost Amount Per Unit is required"
  // ),
  // CostAmountPerUnit: Yup.string().required(
  //   "Min Cost Amount Per Unit is required"
  // ),
  // minUnits: Yup.string().required("min Units are required"),
  // maxUnits: Yup.string().required("max Units are required"),
  Units: Yup.string().when("type", {
    is: (type: string) =>
      !type?.includes("BillOfLading") &&
      !type.includes("AirwayBill") &&
      !type.includes("CargoManifest") &&
      !type.includes("ProofOfDelivery"),
    then: (schema) => schema.required("Units Are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  Weight: Yup.string(),
  Dimensions: Yup.string(),
  NoPieces: Yup.string().when("type", {
    is: (type: string) => type?.includes("AirwayBill"),
    then: (schema) => schema.required("NoPieces Are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  GrossWeight: Yup.string().when("type", {
    is: (type: string) => type?.includes("AirwayBill"),
    then: (schema) => schema.required("GrossWeight Are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  Unit: Yup.string().when("type", {
    is: (type: string) => type?.includes("AirwayBill"),
    then: (schema) => schema.required("Units Are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  Rate: Yup.string().when("type", {
    is: (type: string) => type?.includes("AirwayBill"),
    then: (schema) => schema.required("Rate is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  ChargeableWeight: Yup.string().when("type", {
    is: (type: string) => type?.includes("AirwayBill"),
    then: (schema) => schema.required("ChargeableWeight is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  NatureOfGoods: Yup.string().when("type", {
    is: (type: string) => type?.includes("AirwayBill"),
    then: (schema) => schema.required("NatureOfGoods Are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  RatePerCharge: Yup.string().when("type", {
    is: (type: string) => type?.includes("AirwayBill"),
    then: (schema) => schema.required("RatePerCharge is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  MAWB: Yup.string(),
  HAWBNo: Yup.string(),
  CBM: Yup.string().when("type", {
    is: (type: string) => type === "ProofOfDelivery",
    then: (schema) => schema.required("CBM is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  ParcelsWeight: Yup.string().when("type", {
    is: (type: string) => type === "CargoManifest",
    then: (schema) => schema.required("CBM is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  Description: Yup.string().when("type", {
    is: (type: string) => type === "CargoManifest",
    then: (schema) => schema.required("CBM is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  Shipper: Yup.string().when("type", {
    is: (type: string) => type === "CargoManifest",
    then: (schema) => schema.required("CBM is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  Collect: Yup.string().when("type", {
    is: (type: string) => type === "CargoManifest",
    then: (schema) => schema.required("CBM is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

// const AddQuotationReducer = (state: QuotationItem, action: QuotationAction) => {
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
function AddQuotation({
  closeQuotation,
  AddItemToInvoice,
  quotationType,
  toEdit,
}: qprops) {
  // const [val, setval] = React.useState("");
  const {
    AddItem,
    items,
    AddLadingItem,
    AddAirwayItem,
    addPODItem,
    addManifestItem,
    editAirwayItem,
    editItem,
    editLadingItem,
    editManifestItem,
    editPodItem,
  } = useItemStore();
  // const [state, dispatch] = React.useReducer(AddQuotationReducer, InitialState);
  console.log("toEdit", toEdit);
  const formikobj = useFormik({
    initialValues: {
      id: "",
      QuoteValidity: "",
      Charges: "",
      ChargeDescription: "",
      // UnitPerKg: "",
      Currency: "",
      RateAmountPerUnit: "",
      MinRateAmountPerUnit: "",
      // MinCostAmountPerUnit: "",
      // CostAmountPerUnit: "",
      Units: "",
      Dimensions: "",
      Weight: "",
      ContainerNo: "",
      SealNo: "",
      NoOfPackages: "",
      PackageDescription: "",
      NoPieces: 0,
      GrossWeight: 0,
      Unit: "",
      Rate: "",
      ChargeableWeight: "",
      RatePerCharge: "",
      NatureOfGoods: "",
      HAWB: "",
      ParcelsWeight: "",
      Description: "",
      Shipper: "",
      Collect: "",
      Consolidation: "",
      MAWB: "",
      Flights: "",
      Date: "",
      From: "",
      To: "",
      Total: "",
      HeaderAddress: "",
      HAWBNo: "",
      CBM: "",
      isEditingJob: false,
      type: quotationType,
      ...(toEdit ?? {}),
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        console.log(values);

        if (values.type === "BillOfLading") {
          console.log("bol err 2");

          if (values.isEditingJob) {
            editLadingItem(
              {
                ContainerNo: values.ContainerNo,
                Dimensions: values.Dimensions,
                NoOfPackages: values.NoOfPackages,
                PackageDescription: values.PackageDescription,
                SealNo: values.SealNo,
                Weight: values.Weight,
              },
              values.index
            );
          } else {
            AddLadingItem({
              ContainerNo: values.ContainerNo,
              Dimensions: values.Dimensions,
              NoOfPackages: values.NoOfPackages,
              PackageDescription: values.PackageDescription,
              SealNo: values.SealNo,
              Weight: values.Weight,
            });
          }
        } else if (values.type === "AirwayBill") {
          console.log("awb edit err 2");

          if (values.isEditingJob) {
            editAirwayItem(values, values.index);
          } else {
            AddAirwayItem(values);
          }
        } else if (values.type === "CargoManifest") {
          console.log("cam edit err 2");

          if (values.isEditingJob) {
            editManifestItem(values, values.index);
          } else {
            addManifestItem(values);
          }
        } else if (values.type === "ProofOfDelivery") {
          console.log("pod edit err 2");

          if (values.isEditingJob) {
            editPodItem(values, values.index);
          } else {
            addPODItem(values);
          }
        } else if (values.isEditingJob) {
          console.log("editing err");
          editItem(values, values.index);
        } else {
          console.log("editing err 2");

          AddItem(values);
        }
        // if (AddItemToInvoice) AddItemToInvoice(values);
        closeQuotation((p) => !p);
        ctx.setToggle();
      } catch (error) {
        // Handle the error as needed
        console.error(error);
      }
    },
  });
  const ctx = useContext(ModalCtx);
  const Column1 = [
    { label: "Charge", name: "Charges", type: "text" },
    { label: "Charge Description", name: "ChargeDescription" },
    { label: "Quote Validity", name: "QuoteValidity", type: "text" },
    // { label: "Max Units", name: "maxUnits", type: "number" },
    // { label: "Min Units", name: "minUnits", type: "number" },
    { label: "Units", name: "Units", type: "text" },
    { label: "Weight (Optional)", name: "Weight", type: "number" },
    { label: "Dimensions (L X W X H)", name: "Dimensions", type: "text" },
  ];
  const Column2 = [
    {
      label: "Currency",
      name: "Currency",
      type: "text",
      options: ["USD", "Euro"],
    },
    { label: "Amount Per Unit", name: "RateAmountPerUnit" },
    { label: "Min Amount Per Unit", name: "MinRateAmountPerUnit" },
    { label: "Max Amount Per Unit", name: "MaxRateAmountPerUnit" },
  ];
  const Column3 = [
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
      options: [],
    },
    { label: "VAT %", name: "vatpercent", type: "number" },

    { label: "Vat Amount", name: "vatamount", type: "number" },
    { label: "Discount", name: "Discount", type: "number" },
  ];
  const laddingBillColumns = [
    {
      label: "No of Packages",
      name: "NoOfPackages",
      type: "number",
      options: [],
    },
    {
      label: "Package Description",
      name: "PackageDescription",
      type: "text",
    },
    { label: "Container Number", name: "ContainerNo", type: "text" },
    { label: "Seal Number", name: "SealNo", type: "text" },
    { label: "Dimensions", name: "Dimensions", type: "text" },
    { label: "Weight", name: "Weight", type: "number" },
  ];
  const AirwayBillTable = [
    {
      label: "No of Pieces",
      name: "NoPieces",
      type: "number",
      options: [],
    },
    { label: "Gross Weight", name: "GrossWeight", type: "number" },
    { label: "Unit", name: "Unit", type: "text" },
    { label: "Rate", name: "Rate", type: "number" },
    { label: "Chargeable Weight", name: "ChargeableWeight", type: "number" },
    { label: "Nature Of Goods", name: "NatureOfGoods", type: "text" },
    { label: "Rate Per Charge", name: "RatePerCharge", type: "number" },
  ];
  const CargoManifestTable = [
    { label: "HAWB", name: "HAWB", type: "text", options: [] },
    { label: "Parcels Weight", name: "ParcelsWeight", type: "text" },
    { label: "Description", name: "Description", type: "textarea" },
    { label: "Shipper", name: "Shipper", type: "text" },
    { label: "Charges", name: "Charges", type: "number" },
    { label: "Collect", name: "Collect", type: "number" },
  ];
  const ProofOfDeliveryTable = [
    { label: "MAWB", name: "MAWB", type: "number", options: [] },
    { label: "HAWB No", name: "HAWBNo", type: "number" },
    { label: "No Of Packages", name: "NoOfPackages", type: "number" },
    { label: "Weight", name: "Weight", type: "number" },
    { label: "CBM", name: "CBM", type: "text" },
  ];
  // const Column3 = [
  //   {
  //     label: "Currency",
  //     name: "Currency",
  //     type: "text",
  //     options: ["USD", "Euro"],
  //   },
  //   { label: "Amount Per Unit", name: "CostAmountPerUnit" },
  //   { label: "Min Amount Per Unit", name: "MinCostAmountPerUnit" },
  // ];
  console.log(quotationType, "Qtype");
  return (
    <FormikProvider value={formikobj}>
      <div className="relative mx-auto md:w-4/5 max-h-screen px-10 bg-white border border-black z-1000 py-10 rounded-md overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.nativeEvent.preventDefault();
            e.nativeEvent.stopImmediatePropagation();
            formikobj.handleSubmit(e);
          }}
        >
          <Field hidden name="type" />
          <div
            className="text-white  bg-red-600  p-1 px-3 cursor-pointer rounded-full text-xl relative w-9 right-9"
            onClick={(e) => {
              ctx.setToggle();
              closeQuotation((p) => !p);
            }}
          >
            X
          </div>
          <h2 className=" text-4xl text-black-800 w-full font-serif text-center  uppercase ">
            Add Item
          </h2>
          <hr className="mb-10 mt-5"></hr>
          <div className="flex flex-col sm:flex-row justify-evenly">
            {quotationType !== "BillOfLading" &&
              quotationType !== "AirwayBill" &&
              quotationType !== "CargoManifest" &&
              quotationType !== "ProofOfDelivery" && (
                <div className="flex flex-col space-y-3 items-center">
                  <h1 className="text-2xl text-black-800 w-full font-serif text-center">
                    Info Section
                  </h1>
                  {Column1.map((i) => (
                    <div
                      className="flex flex-col items-center justify-start"
                      key={i.name}
                    >
                      <label className="text-xl">{i.label}</label>
                      <Field
                        type={i.type}
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
              )}
            {quotationType !== "BillOfLading" &&
              quotationType !== "AirwayBill" &&
              quotationType !== "CargoManifest" &&
              quotationType !== "ProofOfDelivery" && (
                <div className="flex flex-col space-y-2 items-center">
                  <h2 className="text-2xl text-black-800 w-full font-serif text-center">
                    Rate Section
                  </h2>
                  {Column2.map((i) => (
                    <div
                      className="flex flex-col items-center justify-start"
                      key={i.name}
                    >
                      <label className="text-xl">{i.label}</label>
                      {i.type === "select" ? (
                        <>
                          <Field
                            as="select"
                            name={i.name}
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                          >
                            <option value="">Select Value </option>
                            {i.options?.map((o) => (
                              <option value={o} key={o}>
                                {o}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name={i.name}
                            component="div"
                            className="text-red-500"
                          />
                        </>
                      ) : (
                        <>
                          <Field
                            type={i.type}
                            name={i.name}
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={i.name}
                            component="div"
                            className="text-red-500"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            {quotationType !== "BillOfLading" &&
              quotationType !== "AirwayBill" &&
              quotationType !== "CargoManifest" &&
              quotationType !== "ProofOfDelivery" && (
                <div className="flex flex-col space-y-2 items-center">
                  <h2 className="text-2xl text-black-800 w-full font-serif text-center">
                    Other Info
                  </h2>
                  {Column3.map((i) => (
                    <div
                      className="flex flex-col items-center justify-start"
                      key={i.name}
                    >
                      <label className="text-xl">{i.label}</label>
                      {i.type === "select" ? (
                        <>
                          <Field
                            as="select"
                            name={i.name}
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                          >
                            <option value="">Select Value </option>
                            {i.options?.map((o) => (
                              <option value={o} key={o}>
                                {o}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name={i.name}
                            component="div"
                            className="text-red-500"
                          />
                        </>
                      ) : (
                        <>
                          <Field
                            type={i.type}
                            name={i.name}
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={i.name}
                            component="div"
                            className="text-red-500"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            {quotationType === "BillOfLading" && (
              <div className="flex flex-col space-y-2 items-center">
                <h2 className="text-2xl text-black-800 w-full font-serif text-center">
                  Information
                </h2>
                {laddingBillColumns.map((i) => (
                  <div
                    className="flex flex-col items-center justify-start"
                    key={i.name}
                  >
                    <label className="text-xl">{i.label}</label>
                    {i.type === "select" ? (
                      <>
                        <Field
                          as="select"
                          name={i.name}
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select Value </option>
                          {i.options?.map((o) => (
                            <option value={o} key={o}>
                              {o}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name={i.name}
                          component="div"
                          className="text-red-500"
                        />
                      </>
                    ) : (
                      <>
                        <Field
                          type={i.type}
                          name={i.name}
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name={i.name}
                          component="div"
                          className="text-red-500"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
            {quotationType === "AirwayBill" && (
              <div className="flex flex-col space-y-2 items-center">
                <h2 className="text-2xl text-black-800 w-full font-serif text-center">
                  Airway Bill Info
                </h2>
                {AirwayBillTable.map((i) => (
                  <div
                    className="flex flex-col items-center justify-start"
                    key={i.name}
                  >
                    <label className="text-xl">{i.label}</label>
                    {i.type === "select" ? (
                      <>
                        <Field
                          as="select"
                          name={i.name}
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select Value </option>
                          {i.options?.map((o) => (
                            <option value={o} key={o}>
                              {o}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name={i.name}
                          component="div"
                          className="text-red-500"
                        />
                      </>
                    ) : (
                      <>
                        <Field
                          type={i.type}
                          name={i.name}
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name={i.name}
                          component="div"
                          className="text-red-500"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
            {quotationType === "CargoManifest" && (
              <div className="flex flex-col space-y-2 items-center">
                <h2 className="text-2xl text-black-800 w-full font-serif text-center">
                  CargoManifest Info
                </h2>
                {CargoManifestTable.map((i) => (
                  <div
                    className="flex flex-col items-center justify-start"
                    key={i.name}
                  >
                    <label className="text-xl">{i.label}</label>
                    {i.type === "select" ? (
                      <>
                        <Field
                          as="select"
                          name={i.name}
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select Value </option>
                          {i.options?.map((o) => (
                            <option value={o} key={o}>
                              {o}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name={i.name}
                          component="div"
                          className="text-red-500"
                        />
                      </>
                    ) : (
                      <>
                        <Field
                          type={i.type}
                          name={i.name}
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name={i.name}
                          component="div"
                          className="text-red-500"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
            {quotationType === "ProofOfDelivery" && (
              <div className="flex flex-col space-y-2 items-center">
                <h2 className="text-2xl text-black-800 w-full font-serif text-center">
                  Proof Of Delivery
                </h2>
                {ProofOfDeliveryTable.map((i) => (
                  <div
                    className="flex flex-col items-center justify-start"
                    key={i.name}
                  >
                    <label className="text-xl">{i.label}</label>
                    {i.type === "select" ? (
                      <>
                        <Field
                          as="select"
                          name={i.name}
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select Value </option>
                          {i.options?.map((o) => (
                            <option value={o} key={o}>
                              {o}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name={i.name}
                          component="div"
                          className="text-red-500"
                        />
                      </>
                    ) : (
                      <>
                        <Field
                          type={i.type}
                          name={i.name}
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name={i.name}
                          component="div"
                          className="text-red-500"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* <div className="flex flex-col space-y-2 items-center">
              <h2 className="text-2xl text-black-800 w-full font-serif text-center">
                Cost Section
              </h2>
              {Column3.map((i) => (
                <div
                  className="flex flex-col items-center justify-start"
                  key={i.name}
                >
                  <label className="text-xl">{i.label}</label>
                  {i.type === "select" ? (
                    <>
                      <Field
                        as="select"
                        name={i.name}
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select Value </option>
                        {i.options?.map((o) => (
                          <option value={o} key={o}>
                            {o}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name={i.name}
                        component="div"
                        className="text-red-500"
                      />
                    </>
                  ) : (
                    <>
                      <Field
                        type={i.type}
                        name={i.name}
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      />
                      <ErrorMessage
                        name={i.name}
                        component="div"
                        className="text-red-500"
                      />
                    </>
                  )}
                </div>
              ))}
            </div> */}
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

export default AddQuotation;
