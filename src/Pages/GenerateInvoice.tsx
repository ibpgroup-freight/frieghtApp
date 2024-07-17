import React, { useCallback, useRef } from "react";
import { useState } from "react";
import AddQuotation from "../Components/AddQuotation";
import { ModalCtx } from "../store/Modal";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik, Field, ErrorMessage, FormikProvider } from "formik";
import { toast } from "react-toastify";
import useinvoiceStore from "../store/Invoice";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";
import { LoaderIcon } from "react-hot-toast";
import useCompanyInfo from "../store/CompanyInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice";
import useUser from "../store/User";
import AddPrestation from "../Components/AddPrestation";
import AddLadingBasis from "../Components/AddLadingBasis";

// const init = {
//   CustomerName: "",
//   CustomerAddress: "",
//   SalesPerson: "",
//   PortOfOrigin: "",
//   PortOfDestination: "",
//   TransitTime: "",
//   CarrierName: "",
//   ContainerType: "",
//   TodaysDate: "",
//   CustomerPhone: "",
//   CustomerEmail: "",
//   CustomerTRN: "",
//   Jobid: "",
// };
const validationSchema = yup.object().shape(
  {
    Jobid: yup.string(),
    CustomerName: yup
      .string()
      .when("type", {
        is: (type: string) =>
          type !== "CargoManifest" && type !== "ProofOfDelivery",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Customer Name is required"),

    CustomerAddress: yup
      .string()
      .when("type", {
        is: (type: string) =>
          type !== "CargoManifest" && type !== "ProofOfDelivery",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Customer Address is required"),
    CustomerEmail: yup
      .string()
      .when("type", {
        is: (type: string) =>
          type !== "CargoManifest" && type !== "ProofOfDelivery",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Customer Email is required"),
    CustomerPhoneNo: yup
      .string()
      .when("type", {
        is: (type: string) =>
          type !== "CargoManifest" && type !== "ProofOfDelivery",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Customer Phone Number is required"),
    SalesPerson: yup
      .string()
      .when("type", {
        is: (type: string) =>
          type !== "CargoManifest" &&
          type !== "ProofOfDelivery" &&
          type !== "AirwayBill" &&
          type !== "BillOfLading",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Sales Person is required"),
    officeAddress: yup
      .string()
      .when("type", {
        is: (type: string) =>
          type !== "CargoManifest" && type !== "ProofOfDelivery",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Your Address is required"),
    termsAndConditions: yup.array().of(yup.string()),
    specialInstructions: yup.string().notRequired(),
    ConsigneeReference: yup.string().notRequired(),
    type: yup.string().required("Type of bill is Required"),
    VehicleDetails: yup.string(),
    DriverDetails: yup.string(),
    RouteDetails: yup.string(),
    PlaceOfOrigin: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Road"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Place of Origin is required"),
    PlaceOfDestination: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Road"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Place of Destination is required"),
    PortOfOrigin: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Sea"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Port of Origin is required"),
    PortOfDestination: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Sea"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Port of Destination is required"),
    AirportOfOrigin: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Air"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Airport of Origin is required"),
    AirportOfDestination: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Air"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Airport of Destination is required"),
    CarrierName: yup
      .string()
      .when("type", {
        is: (type: string) =>
          type !== "CargoManifest" &&
          type !== "ProofOfDelivery" &&
          type !== "BillOfLading" &&
          type !== "AirwayBill",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Carrier Name is required"),
    // TodaysDate: yup.string().required("Carrier Name is required"),
    TransitTime: yup.string(),
    CustomerTRN: yup.string(),
    Weight: yup.string(),
    Dimensions: yup.string(),
    ShipmentTerms: yup.string(),
    TypeOfCargo: yup.string(),
    FlightInformation: yup.string(),
    VesselName: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Sea"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Carrier Name is required"),
    VesselDetails: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Sea"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Vessel Details are required"),
    ShippingLaneDetails: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Sea"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Shipping Lane Details are required"),
    Movement: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Lading"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Movement Details are required"),
    PlaceOfDelivery: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Lading"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Place Of Delivery required"),

    PlaceOfReceipt: yup.string().when("type", {
      is: (type: string) => type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    TotalContainers: yup.string().when("type", {
      is: (type: string) => type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    NotifyAddress: yup.string().when("type", {
      is: (type: string) => type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Currency: yup.string().when("type", {
      is: (type: string) => type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    PlaceOfIssue: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Lading"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Place Of Issue required"),
    PayableAt: yup
      .string()
      .when("type", {
        is: (type: string) => type?.includes("Lading"),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Payable at required"),
    Departure: yup.string().when("type", {
      is: (type: string) =>
        type !== "CargoManifest" &&
        type !== "Quotation" &&
        type !== "ProofOfDelivery" &&
        type !== "BillOfLading" &&
        type !== "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    EstimatedArrival: yup
      .string()
      .when("type", {
        is: (type: string) =>
          type !== "CargoManifest" &&
          type !== "Quotation" &&
          type !== "ProofOfDelivery" &&
          type !== "BillOfLading" &&
          type !== "AirwayBill",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .required("Estimated Arrival Time is required"),
    ContainerType: yup.string(),
    CustomContainerType: yup.string(),
    PortOfLoading: yup.string().when("type", {
      is: (type: string) => type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    PortOfDischarge: yup.string().when("type", {
      is: (type: string) => type?.includes("Lading"),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Subtotal: yup.string(),
    SubtotalExceptTaxes: yup.string(),
    ExportReference: yup.string(),
    ForwardingAgent: yup.string(),
    JobNo: yup.string().when("type", {
      is: (type: string) => type === "ProofOfDelivery",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Description: yup.string().when("type", {
      is: (type: string) => type === "ProofOfDelivery",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Transporter: yup.string().when("type", {
      is: (type: string) => type === "ProofOfDelivery",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Shipper: yup.string().when("type", {
      is: (type: string) => type === "ProofOfDelivery",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    DeliveryTo: yup.string().when("type", {
      is: (type: string) => type === "ProofOfDelivery",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    ContactPerson: yup.string().when("type", {
      is: (type: string) => type === "ProofOfDelivery",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    DeliveryDate: yup.string().when("type", {
      is: (type: string) => type === "ProofOfDelivery",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Time: yup.string().when("type", {
      is: (type: string) => type === "ProofOfDelivery",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    ReceiverNameAndSignature: yup.string().when("type", {
      is: (type: string) => type === "ProofOfDelivery",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    MobileNumber: yup.string().when("type", {
      is: (type: string) => type === "ProofOfDelivery",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Remarks: yup.string(),
    Consolidation: yup.string().when("type", {
      is: (type: string) => type === "CargoManifest",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    MAWB: yup.string().when("type", {
      is: (type: string) => type === "CargoManifest",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Flights: yup.string().when("type", {
      is: (type: string) => type === "CargoManifest",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Date: yup.string().when("type", {
      is: (type: string) => type === "CargoManifest",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    From: yup.string().when("type", {
      is: (type: string) => type === "CargoManifest",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    To: yup.string().when("type", {
      is: (type: string) => type === "CargoManifest",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Total: yup.string().when("type", {
      is: (type: string) => type === "CargoManifest",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    HeaderAddress: yup.string().when("type", {
      is: (type: string) =>
        type === "CargoManifest" || type == "ProofOfDelivery",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    blNo: yup.string().when("type", {
      is: (type: string) =>
        type !== "CargoManifest" &&
        type !== "ProofOfDelivery" &&
        type !== "AirwayBill" &&
        type !== "BillOfLading" &&
        type !== "Quotation",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    dueDate: yup.string().when("type", {
      is: (type: string) =>
        type !== "CargoManifest" &&
        type !== "ProofOfDelivery" &&
        type !== "AirwayBill" &&
        type !== "BillOfLading" &&
        type !== "Quotation",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    PostingDate: yup.string().when("type", {
      is: (type: string) =>
        type !== "CargoManifest" &&
        type !== "ProofOfDelivery" &&
        type !== "AirwayBill" &&
        type !== "BillOfLading" &&
        type !== "Quotation",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    IssuedBy: yup.string(),
    bankDetails: yup.string().when("type", {
      is: (type: string) =>
        type === "AirFreight" ||
        type === "SeaFreight" ||
        type === "RoadFreight",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    HAWB: yup.string(),

    CarrierReference: yup.string().when("type", {
      is: (type: string) => type === "BillOfLading",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    VoyageNo: yup.string().when("type", {
      is: (type: string) => type === "BillOfLading",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    // Carrier: yup.string().when("type", {
    //   is: (type: string) => type === "BillOfLading",
    //   then: (schema) => schema.required(),
    //   otherwise: (schema) => schema.notRequired(),
    // }),
    ContainersReceived: yup.string().when("type", {
      is: (type: string) => type === "BillOfLading",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    PackagesReceived: yup.string().when("type", {
      is: (type: string) => type === "BillOfLading",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    FreightPrepaid: yup.string().when("type", {
      is: (type: string) => type === "BillOfLading",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    FreightCollected: yup.string().when("type", {
      is: (type: string) => type === "BillOfLading",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    TotalFreight: yup.string().when("type", {
      is: (type: string) => type === "BillOfLading",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    OriginalBSL: yup.string().when("type", {
      is: (type: string) => type === "BillOfLading",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    RequestedFlight: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    AgentsIATA: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),

    ChargesCode: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    WVPPD: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    WVColl: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    OtherPPD: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    OtherColl: yup.string(),
    DeclaredValCarriage: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    DeclaredValCustoms: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    AmountInsurance: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    ShipperName: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    ShipperPhone: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    ShipperAddress: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    OtherShipperInfo: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    ShippersAccount: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    ConsigneesAccount: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    SCI: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    PPDWeight: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    PPDValuation: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    PPDTax: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    PPDOther: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    CollWeight: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    CollValuation: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    CollTax: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    CollOther: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    CurrConv: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    CCChargesinDestCurr: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    ChargesAtDestination: yup.string().when("type", {
      is: (type: string) => type === "AirwayBill",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Arrival: yup.string(),
    IncoTerm: yup.string().when("type", {
      is: (type: string) => type === "Quotation",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    Periodicity: yup.string().when("type", {
      is: (type: string) => type === "Quotation",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),

    Department: yup.string(),
    Yref: yup.string().when("type", {
      is: (type: string) => type === "Quotation",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    // Incharge: yup.string().when("type", {
    //   is: (type: string) => type === "Quotation",
    //   then: (schema) => schema.required(),
    //   otherwise: (schema) => schema.notRequired(),
    // }),
    validFrom: yup.string().when("type", {
      is: (type: string) => type === "Quotation",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
    validTo: yup.string().when("type", {
      is: (type: string) => type === "Quotation",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
  },

  [["ContainerType", "CustomContainerType"]]
);

function GenerateInvoice() {
  const [showQuotation, setshowQuotation] = useState(false);
  const [toEdit, settoEdit] = useState<any>();
  const ctx = useContext(ModalCtx);
  const {
    Items: temp_Items,
    jobInfo,
    setInfo,
    setItems: setInvoiceItems,
    setladingItems,
    setladleInfo,
    setAirwayInfo,
    setAirwayBillItems,
    setManifestInfo,
    setPODInfo,
    setManifestItems,
    setPODItems,
    ladleInfo,
    AirwayInfo,
    PODInfo,
    manifestInfo,
  } = useinvoiceStore();
  const { setInformation } = useCompanyInfo();
  const {
    setItemInquiry,
    inquiry,
    resetInquiry,
    setaddress,
    setPrestationArray,
    prestation,
    ladingbasisItems,
  } = useInquiryItem();
  const { setbillType, billType } = useUser();
  const {
    setitemsArray,
    items: quotationItemsStore,
    ladingItems: quotationLadingItemsStore,
    ManifestItems: quotationManifestItems,
    PODItems: quotationPODItems,
    resetItems,
    setBillOfLadingItems,
    AirwayItems,
    setAirwayItems,
    setManifestItems: manifestItem,
    setPODItems: PodItem,
  } = useItemStore();
  const [showPrestation, setshowPrestation] = useState<boolean>(false);
  const [showladingBasis, setshowladingBasis] = useState<boolean>(false);

  const navigate = useNavigate();
  const [loadingdetails, setloadingdetails] = useState<boolean>(false);
  const jobidRef = useRef<HTMLInputElement | null>(null);
  // const [items, setitems] = useState<QuotationItem[]>(
  //   quotationItemsStore || []
  // );
  // const [state, dispatch] = React.useReducer(InquiryReducer, inq);

  // console.log("q", items);
  const ResetFields = useCallback(() => {
    resetItems();
    resetInquiry();
  }, []);
  const formikObj = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...ladleInfo,
      ...AirwayInfo,
      ...PODInfo,
      ...manifestInfo,
      Jobid: jobidRef.current?.value || "",
      ...inquiry,
      type: billType || "",
      bankDetails: "",
    },

    onSubmit(values) {
      console.log("Here", values);
      // if (quotationItemsStore.length === 0) {
      //   toast.error("Add Some Items First");
      //   return;
      // }
      if (jobidRef.current?.value === "" || !jobidRef.current?.value) {
        toast.error("Id is Required");
        return;
      }
      if (!values.type) {
        toast.error("Select Bill Type First");
        return;
      }

      if (values.type === "BillOfLading") {
        setladleInfo(values);
        setladingItems(quotationLadingItemsStore);
        setBillOfLadingItems([...quotationLadingItemsStore]);
      } else if (values.type === "AirwayBill") {
        setAirwayInfo(values);
        setAirwayItems([...AirwayItems]);

        setAirwayBillItems(AirwayItems);
      } else if (values.type === "CargoManifest") {
        manifestItem([...quotationManifestItems]);
        setManifestInfo(values);
        setManifestItems(quotationManifestItems);
      } else if (values.type === "ProofOfDelivery") {
        PodItem([...quotationPODItems]);
        setPODInfo(values);
        setPODItems(quotationPODItems);
      } else if (values.type === "Quotation") {
        setItemInquiry(values);
      } else {
        setInfo(values);
        setInvoiceItems(quotationItemsStore);
        setitemsArray([...quotationItemsStore]);
      }
      if (values.type?.includes("Lading")) {
        navigate("/billofladdle");
      } else if (values.type?.includes("Airway")) {
        navigate("/airwayBill");
      } else if (values.type === "CargoManifest") {
        navigate("/cargoManifest");
      } else if (values.type === "ProofOfDelivery") {
        navigate("/proofOfDelivery");
      } else if (values.type === "Quotation") {
        setaddress(values.officeAddress);
        navigate("/quotationDoc");
      } else {
        navigate("/Invoice");
      }
    },
    validationSchema,
  });
  console.log("qi", formikObj.values);

  const CargoManifestTable = [
    { label: "Index", name: "Sr no" },
    { label: "HAWB", name: "HAWB" },

    { label: "Parcels Weight", name: "ParcelsWeight" },
    { label: "Description", name: "Description" },
    { label: "Shipper", name: "Shipper" },
    { label: "Charges", name: "Charges" },
    { label: "Collect", name: "Collect" },
    { label: "Actions", name: "Actions" },
  ];
  const ProofOfDeliveryTable = [
    { label: "Index", name: "Sr no" },
    { label: "MAWB", name: "MAWB" },
    { label: "HAWB No", name: "HAWBNo" },
    { label: "No Of Packages", name: "NoOfPackages" },
    { label: "Weight", name: "Weight" },
    { label: "CBM", name: "CBM" },
    { label: "Actions", name: "Actions" },
  ];
  const Column1 = [
    { label: "Index", name: "Sr no" },
    { label: "Quote Validity", name: "QuoteValidity" },
    { label: "Charges", name: "Charges" },
    { label: "Charge Description", name: "ChargeDescription" },
    {
      label: "Units",
      name: "Units",
      subheadings: ["Min", "Max"],
    },
    {
      label: "Rate",
      name: "Rate",
      subheadings: ["Cost Per Unit", "Min", "Max"],
    },

    // {
    //   label: "Cost",
    //   name: "Cost",
    //   subheadings: ["Cost Per Unit", "Min", "Max"],
    // },
    { label: "Currency", name: "Currency" },
    { label: "Vat %", name: "Vat %" },
    { label: "Vat Amount", name: "Vat Amount" },
    { label: "Discount", name: "Discount" },

    { label: "Actions", name: "Actions" },

    // { label: "Amount Per Unit", name: "AmountPerUnit" },
    // { label: "Cost And Sell Section", name: "CostAndSellSection" },
  ];
  const billofLadleTable = [
    { label: "Index", name: "Sr no" },

    {
      label: "No of Packages",
      name: "NoOfPackages",
      type: "number",
      options: [],
    },
    { label: "Package Description", name: "Description", type: "number" },
    { label: "Container Number", name: "ContainerNo", type: "number" },
    { label: "Seal Number", name: "SealNo", type: "number" },
    { label: "Measurement", name: "Measurement", type: "text" },
    { label: "Weight (Optional)", name: "Weight", type: "number" },
    { label: "Actions", name: "Actions" },
  ];
  const AirwayBillTable = [
    { label: "Index", name: "Sr no" },
    {
      label: "No of Pieces",
      name: "NoPieces",
      type: "number",
      options: [],
    },
    { label: "Gross Weight", name: "GrossWeight", type: "number" },
    { label: "Unit", name: "Unit", type: "text" },
    { label: "Rate", name: "SealNo", type: "number" },
    { label: "ChargeableWeight", name: "ChargeableWeight", type: "number" },
    { label: "NatureOfGoods", name: "NatureOfGoods", type: "number" },
    { label: "Rate Per Charge", name: "RatePerCharge", type: "number" },
    { label: "Actions", name: "Actions" },
  ];
  const Column1Items = [
    ...(!formikObj.values.type.includes("Freight")
      ? [
          { name: "ShipperName", label: "Shipper Name", type: "text" },
          { name: "ShippersTRN", label: "Shipper TRN", type: "number" },
          {
            name: "ShipperAddress",
            label: "Shipper Address",
            type: "textarea",
          },
          { name: "ShippersPO", label: "Shippers PO", type: "number" },
          { name: "ShipperPhone", label: "Shippers Phone", type: "number" },
          { name: "ShipperEmail", label: "Shippers Email", type: "text" },
          {
            name: "OtherShipperInfo",
            label: "OtherShipperInfo",
            type: "textarea",
          },
        ]
      : []),
    ...(formikObj.values.type === "Quotation"
      ? [
          { label: "Enter Quotation Id", name: "quotationId", type: "text" },

          { label: "Enter Customer Name", name: "CustomerName", type: "text" },

          {
            label: "Enter Customer Email",
            name: "CustomerEmail",
            type: "email",
          },
          {
            label: "Enter Customer Phone",
            name: "CustomerPhoneNo",
            type: "number",
          },
          {
            label: "Enter Customer TRN",
            name: "CustomerTRN",
            type: "number",
          },
          {
            label: "Enter Customer Address",
            name: "CustomerAddress",
            type: "textarea",
          },
          {
            label: "Enter Departure",
            name: "Departure",
            type: "text",
          },

          {
            label: "Enter From",
            name: "From",
            type: "text",
          },
          {
            label: "Enter To",
            name: "To",
            type: "text",
          },
          {
            label: "Enter Destination",
            name: "Destination",
            type: "text",
          },
        ]
      : []),
    ...(formikObj.values.type !== "Quotation" &&
    formikObj.values.type !== "AirwayBill" &&
    formikObj.values.type !== "BillOfLading"
      ? [
          { label: "Enter Customer Name", name: "CustomerName", type: "text" },
          { label: "blNo", name: "blNo", type: "text" },
          {
            label: "Enter Customer Address",
            name: "CustomerAddress",
            type: "textarea",
          },
          {
            label: "Enter Customer TRN",
            name: "CustomerTRN",
            type: "text",
          },
        ]
      : []),
    ...(formikObj.values.type === "AirwayBill" ||
    formikObj.values.type === "BillOfLading"
      ? [
          { label: "Enter Consignee Name", name: "CustomerName", type: "text" },

          {
            label: "Enter Consignee Address",
            name: "CustomerAddress",
            type: "textarea",
          },
          { label: "Enter Consignee TRN", name: "CustomerTRN", type: "number" },
          { label: "blNo", name: "blNo", type: "text" },
        ]
      : []),
    ...(formikObj.values.type !== "BillOfLading" &&
    formikObj.values.type !== "AirwayBill"
      ? [
          { label: "HAWB", name: "HAWB", type: "text" },
          { label: "Enter Sales Person", name: "SalesPerson", type: "text" },
        ]
      : []),
    // ...(formikObj.values.type == "BillOfLading"
    //   ? [{ label: "blNo", name: "blNo", type: "text" }]
    //   : []),
    ...(formikObj.values.type?.includes("Air")
      ? [
          {
            label: "Enter Airport Of Origin",
            name: "AirportOfOrigin",
            type: "text",
          },

          {
            label: "Enter Airport Of Destination",
            name: "AirportOfDestination",
            type: "text",
          },
        ]
      : []),
    ...(formikObj.values.type?.includes("Freight")
      ? [
          {
            label: "Estimated Arrival",
            name: "EstimatedArrival",
            type: "datetime-local",
          },
          {
            label: "Departure",
            name: "Departure",
            type: "datetime-local",
          },
        ]
      : []),
    // ...(formikObj.values.type?.includes("Airway")
    //   ? [
    //       {
    //         label: "Flight Information",
    //         name: "FlightInformation",
    //         type: "textarea",
    //       },
    //     ]
    //   : []),
    ...(formikObj.values.type?.includes("Lading")
      ? [
          {
            label: "Notify Address",
            name: "NotifyAddress",
            type: "textarea",
          },
          {
            label: "Consignee Reference",
            name: "ConsigneeReference",
            type: "textarea",
          },
          {
            label: "Port Of Loading",
            name: "PortOfLoading",
            type: "text",
          },
          {
            label: "Port Of Discharge",
            name: "PortOfDischarge",
            type: "text",
          },
          {
            label: "Forwarding Agent",
            name: "ForwardingAgent",
            type: "text",
          },
          {
            label: "Export Reference",
            name: "ExportReference",
            type: "text",
          },
          {
            label: "Movement",
            name: "Movement",
            type: "text",
          },
          // {
          //   label: "Notify Address",
          //   name: "Notify Address",
          //   type: "textarea",
          // },
          {
            label: "Vessel Name",
            name: "VesselName",
            type: "text",
          },
          {
            label: "Enter Place Of Delivery",
            name: "PlaceOfDelivery",
            type: "text",
          },
          {
            label: "Enter Place Of Receipt",
            name: "PlaceOfReceipt",
            type: "text",
          },
        ]
      : []),
    ...(formikObj.values.type?.includes("Road")
      ? [
          {
            label: "Enter Place Of Origin",
            name: "PlaceOfOrigin",
            type: "text",
          },
          {
            label: "Enter Place Of Destination",
            name: "PlaceOfDestination",
            type: "text",
          },
        ]
      : []),
    ...(formikObj.values.type?.includes("Sea")
      ? [
          { label: "Enter Port Of Origin", name: "PortOfOrigin", type: "text" },
          {
            label: "Enter Port Of Destination",
            name: "PortOfDestination",
            type: "text",
          },
          {
            label: "Enter Vessel Name",
            name: "VesselName",
            type: "textarea",
          },
          {
            label: "Enter Vessel Details",
            name: "VesselDetails",
            type: "textarea",
          },
          {
            label: "Enter Shipping Lane Details",
            name: "ShippingLaneDetails",
            type: "textarea",
          },
        ]
      : []),
    ...(!formikObj.values.type?.includes("Lading") &&
    formikObj.values.type !== "AirwayBill"
      ? [
          {
            label: "Enter Any Outstanding Dues",
            name: "OutstandingDues",
            type: "number",
          },
          { label: "Enter Carrier Name", name: "CarrierName", type: "text" },
        ]
      : []),
  ];
  const AWBCol1 = [
    { name: "AgentsIATA", label: "AgentsIATA", type: "text" },
    {
      name: "IssuingCarriersName",
      label: "Issuing Carriers Name",
      type: "text",
    },
    {
      name: "IssuingCarriersCity",
      label: "Issuing Carriers City",
      type: "text",
    },
    { name: "ChargesCode", label: "ChargesCode", type: "text" },
    { name: "WVPPD", label: "WVPPD", type: "text" },
    { name: "WVColl", label: "WVColl", type: "text" },
    { name: "OtherPPD", label: "OtherPPD", type: "text" },
    { name: "OtherColl", label: "OtherColl", type: "text" },
    { name: "DeclaredValCarriage", label: "DeclaredValCarriage", type: "text" },
    { name: "DeclaredValCustoms", label: "DeclaredValCustoms", type: "text" },
    {
      name: "AmountInsurance",
      label: "Insurance Information",
      type: "textarea",
    },
  ];
  const AWBCol2 = [
    { name: "ShippersAccount", label: "ShippersAccount", type: "text" },
    { name: "ConsigneesAccount", label: "ConsigneesAccount", type: "text" },
    { name: "SCI", label: "SCI", type: "text" },
    { name: "PPDWeight", label: "PPDWeight", type: "text" },
    { name: "PPDValuation", label: "PPDValuation", type: "text" },
    { name: "PPDTax", label: "PPDTax", type: "text" },
    { name: "PPDOther", label: "PPDOther", type: "text" },
    { name: "PPDOtherDueAgent", label: "PPDOther Due Agent", type: "text" },
    { name: "PPDOtherDueCarrier", label: "PPDOther Due Carrier", type: "text" },

    { name: "CollOtherDueAgent", label: "CollOther Due Agent", type: "text" },
    { name: "CollOtherDueCarrier", label: "CollOther Due Agent", type: "text" },

    { name: "CollWeight", label: "CollWeight", type: "text" },
    { name: "CollValuation", label: "CollValuation", type: "text" },
    { name: "CollTax", label: "CollTax", type: "text" },
    { name: "CollOther", label: "CollOther", type: "text" },
    { name: "CurrConv", label: "CurrConv", type: "text" },
    { name: "CCChargesinDestCurr", label: "CCChargesinDestCurr", type: "text" },
    {
      name: "ChargesAtDestination",
      label: "ChargesAtDestination",
      type: "text",
    },
    {
      name: "othershippingDetails",
      label: "Optional Shipping Information",
      type: "textarea",
    },
    {
      label: "Payment Method",
      name: "PaymentMethod",
      type: "text",
    },
    {
      label: "Accounting Information",
      name: "AccountingInformation",
      type: "textarea",
    },
    {
      label: "Issued By (Company name)",
      name: "IssuedBy",
      type: "text",
    },
  ];
  const Column2Items = [
    ...(formikObj.values.type === "AirwayBill"
      ? [
          {
            label: "Enter Consignee Email",
            name: "CustomerEmail",
            type: "text",
          },

          {
            label: "Enter Consignee Phone Number",
            name: "CustomerPhoneNo",
            type: "text",
          },
          {
            label: "Enter Handling Information",
            name: "HandlingInformation",
            type: "text",
          },
          {
            label: "Reference Number",
            name: "ReferenceNumber",
            type: "text",
          },
          {
            label: "Currency",
            name: "Currency",
            type: "text",
          },
        ]
      : []),
    ...(formikObj.values.type !== "Quotation" &&
    formikObj.values.type !== "BillOfLading" &&
    formikObj.values.type !== "AirwayBill"
      ? [
          {
            label: "Enter Consignee Email",
            name: "CustomerEmail",
            type: "text",
          },
          { label: "Enter Due Date", name: "dueDate", type: "date" },
          { label: "Enter Posting Date", name: "PostingDate", type: "date" },

          {
            label: "Enter Consignee Phone Number",
            name: "CustomerPhoneNo",
            type: "text",
          },
          {
            label: "licenseNo",
            name: "licenseNo",
            type: "text",
          },

          {
            label: "Customer Ref",
            name: "cref",
            type: "text",
          },
          {
            label: "Currency",
            name: "currency",
            type: "text",
          },
        ]
      : []),
    ...(formikObj.values.type?.includes("Lading")
      ? [
          {
            label: "Enter Consignee Email",
            name: "CustomerEmail",
            type: "text",
          },

          {
            label: "Enter Consignee Phone Number",
            name: "CustomerPhoneNo",
            type: "text",
          },
          {
            label: "Currency",
            name: "Currency",
            type: "text",
          },
          // {
          //   label: "Weight",
          //   name: "Weight",
          //   type: "number",
          // },
          // {
          //   label: "Shipment Terms",
          //   name: "ShipmentTerms",
          //   type: "text",
          // },
          // {
          //   label: "Type Of Cargo",
          //   name: "TypeOfCargo",
          //   type: "text",
          // },
          {
            label: "Place Of Issue",
            name: "PlaceOfIssue",
            type: "text",
          },
          {
            label: "PayableAt",
            name: "PayableAt",
            type: "text",
          },
          {
            label: "Total Containers Received By Carrier",
            name: "ContainersReceived",
            type: "text",
          },

          {
            label: "Carrier Reference",
            name: "CarrierReference",
            type: "text",
          },
          {
            label: "Total Packages Received By Carrier",
            name: "PackagesReceived",
            type: "text",
          },
          {
            label: "Freight Collected",
            name: "FreightCollected",
            type: "number",
          },
          {
            label: "Freight Prepaid",
            name: "FreightPrepaid",
            type: "number",
          },
          {
            label: "Total Freight",
            name: "TotalFreight",
            type: "number",
          },
          {
            label: "Voyage Number",
            name: "VoyageNo",
            type: "text",
          },
          {
            label: "Original BSL",
            name: "OriginalBSL",
            type: "text",
          },
          {
            label: "Issued By (Company Name)",
            name: "IssuedBy",
            type: "text",
          },
        ]
      : []),
    ...(!formikObj.values.type?.includes("Lading") &&
    !formikObj.values.type?.includes("Air") &&
    formikObj.values.type !== "Quotation"
      ? [
          {
            label: "Container Type",
            name: "ContainerType",
            type: "select",
            options: [
              "20ft",
              "40ft",
              "40 HC",
              "45 HC",
              "20 OT",
              "40 OT",
              "20 FR",
              "40 FR",
              "20 RF",
              "40 RF",
              "RORO",
              "Break Bulk",
            ],
          },
          {
            label: "Custom Container Type",
            name: "CustomContainerType",
            type: "text",
          },
        ]
      : []),

    ...(!formikObj.values.type?.includes("Lading") &&
    formikObj.values.type !== "AirwayBill" &&
    !formikObj.values.type?.includes("Freight")
      ? [
          {
            label: "Enter Discount If Applicable",
            name: "Discount",
            type: "number",
          },
          { label: "Enter Consignee TRN", name: "CustomerTRN", type: "number" },
          {
            label: "Enter Transit Time",
            name: "TransitTime",
            type: "text",
          },
          { label: "Enter Todays Date", name: "TodaysDate", type: "date" },
          {
            label: "Consignee Account Number",
            name: "CustomerAccount",
            type: "text",
          },
        ]
      : []),
    ,
    // { label: "Enter VAT Amount", name: "VATAmount", type: "number" },
    ...(formikObj.values.type !== "Quotation" &&
    formikObj.values.type !== "BillOfLading" &&
    formikObj.values.type !== "AirwayBill" &&
    !formikObj.values.type?.includes("Freight")
      ? [
          {
            label: "Special Instructions",
            name: "specialInstructions",
            type: "textarea",
          },
          {
            label: "Estimated Arrival",
            name: "EstimatedArrival",
            type: "datetime-local",
          },
          {
            label: "Departure",
            name: "Departure",
            type: "datetime-local",
          },
        ]
      : []),

    {
      label: "Address",
      name: "officeAddress",
      type: "select",
      options: ["Dubai", "Bahrain"],
    },
  ];
  const AWBflightInfo = [
    {
      label: "Flight Details",
      name: "FlightDetails",
      type: "textarea",
    },

    {
      label: "Requested Flight",
      name: "RequestedFlight",
      type: "text",
    },
    {
      label: "To",
      name: "firstTo",
      type: "text",
    },
    {
      label: "By First Carrier",
      name: "Byfirstcarrier",
      type: "text",
    },
    {
      label: "To",
      name: "secondTo",
      type: "text",
    },
    {
      label: "By",
      name: "secondBy",
      type: "text",
    },
    {
      label: "To",
      name: "thirdTo",
      type: "text",
    },
    {
      label: "To",
      name: "thirdBy",
      type: "text",
    },
  ];
  const quotationNewCol = [
    {
      label: "Arrival",
      name: "Arrival",
      type: "text",
    },
    {
      label: "IncoTerm",
      name: "IncoTerm",
      type: "text",
    },
    {
      label: "Periodicity",
      name: "Periodicity",
      type: "text",
    },

    {
      label: "Yref",
      name: "Yref",
      type: "text",
    },
    // {
    //   label: "Incharge",
    //   name: "Incharge",
    //   type: "text",
    // },
    {
      label: "validFrom",
      name: "validFrom",
      type: "date",
    },
    {
      label: "Subtotal",
      name: "Subtotal",
      type: "text",
    },
    {
      label: "Enter Subtotal Except Taxes",
      name: "SubtotalExceptTaxes",
      type: "text",
    },
    {
      label: "validTo",
      name: "validTo",
      type: "date",
    },
    {
      label: "Issued By(Enter Company name)",
      name: "IssuedBy",
      type: "text",
    },
    {
      label: "other Shipping Details",
      name: "othershippingDetails",
      type: "textarea",
    },
  ];
  const PODCol1 = [
    { label: "Enter JobNumber", name: "JobNo", type: "text" },
    { label: "Description", name: "Description", type: "textarea" },
    { label: "Transporter", name: "Transporter", type: "text" },
    { label: "Shipper", name: "Shipper", type: "text" },
    { label: "Delivery To", name: "DeliveryTo", type: "text" },
    { label: "Contact Person", name: "ContactPerson", type: "text" },
  ];
  const PODCol2 = [
    { label: "Delivery Date", name: "DeliveryDate", type: "date" },
    { label: "Time", name: "Time", type: "datetime-local" },
    {
      label: "Receiver Name And Signature",
      name: "ReceiverNameAndSignature",
      type: "text",
    },
    { label: "Mobile Number", name: "MobileNumber", type: "text" },
    { label: "Company Stamp", name: "CompanyStamp", type: "text" },
    { label: "Remarks", name: "Remarks", type: "textarea" },
    { label: "Header Address", name: "HeaderAddress", type: "textarea" },

    {
      label: "Address",
      name: "officeAddress",
      type: "select",
      options: ["Dubai", "Bahrain"],
    },
  ];
  const CManifestCol1 = [
    { label: "Consolidation", name: "Consolidation", type: "text" },
    { label: "M.A.W.B", name: "MAWB", type: "text" },
    { label: "Flights", name: "Flights", type: "text" },
    { label: "Date", name: "Date", type: "date" },
  ];
  const CManifestCol2 = [
    { label: "From", name: "From", type: "text" },
    { label: "To", name: "To", type: "text" },
    { label: "Total", name: "Total", type: "text" },
    { label: "HeaderAddress", name: "HeaderAddress", type: "textarea" },
    {
      label: "Address",
      name: "officeAddress",
      type: "select",
      options: ["Dubai", "Bahrain"],
    },
  ];

  const filljobDetailsbyId = async () => {
    try {
      setloadingdetails(true);
      console.log("searchType", searchType);
      console.log(jobidRef.current?.value);
      if (jobidRef.current?.value === "" || !jobidRef.current?.value)
        return toast.error("Job Id is Required");
      let jobtype;
      let mydoc;
      if (searchType === "quotation") {
        const docs = await getDocs(
          query(
            collection(db, "quotations"),
            where("quotationId", "==", jobidRef.current?.value!)
          )
        );
        if (docs.empty) return toast.error("No Such Quotation Exists");
        mydoc = docs.docs[0];
        console.log("Data", docs.docs[0]?.data());
        jobtype = mydoc?.data()?.type;
      } else {
        const docs = await getDocs(
          query(
            collection(db, "jobs"),
            where("jobid", "==", jobidRef.current?.value!)
          )
        );
        if (docs.empty) return toast.error("No Such Job Exists");
        mydoc = docs.docs[0];
        console.log("Data", docs.docs[0]?.data());
        jobtype = mydoc?.data()?.type;
      }

      // console.log("Data", formikObj.values);
      resetInquiry();
      setItemInquiry({
        ...inquiry,
        ...(mydoc?.data()?.inquiry as Inquiry),
        method: mydoc?.data()?.method,
        quotationId: mydoc?.data()?.quotationId,
        jobInitials: mydoc?.data()?.jobInitials,
      });
      setPrestationArray(mydoc?.data().prestation as PrestationItem[]);
      setitemsArray(mydoc?.data()?.Items as QuotationItem[]);

      // setInfo(docs.docs[0]?.data()?.inquiry as Inquiry);
      // setItems(docs.docs[0]?.data()?.Items as QuotationItem[]);\
      toast.success("Filled Data");
    } catch (e) {
      toast.error("No Such Job");
    } finally {
      setloadingdetails(false);
    }
  };
  console.log(formikObj.errors, "errors");
  const [searchType, setsearchType] = useState<string>("quotation");
  const bankDetails: Accounts = {
    "IBP TRADING W.L.L (Bahrain)": [
      {
        accountName: "IBP TRADING W.L.L",
        bank: "National Bank of Bahrain",
        country: "Bahrain",
        branch: "Hidd Branch",
        accountNumber: "0073026352",
        currency: "BHD",
        iban: "BH41NBOB00000073026352",
        swift: "NBOBBHBM",
      },
      {
        accountName: "IBP TRADING W.L.L",
        bank: "National Bank of Bahrain",
        country: "Bahrain",
        branch: "Hidd Branch",
        accountNumber: "0048016926",
        currency: "USD",
        iban: "BH04NBOB00000048016926",
        swift: "NBOBBHBM",
      },
    ],
    "IBP CARGO AND CONSTRUCTION W.L.L (Bahrain)": [
      {
        accountName: "IBP CARGO AND CONSTRUCTION W.L.L",
        bank: "National Bank of Bahrain",
        country: "Bahrain",
        branch: "Palace Avenue Branch",
        accountNumber: "0075113929",
        currency: "BHD",
        iban: "BH28NBOB00000075113929",
        swift: "NBOBBHBM",
      },
    ],
    "IBP TRADE SERVICES CO.WLL (Bahrain)": [
      {
        accountName: "IBP TRADE SERVICES CO.WLL",
        bank: "Ahli United Bank",
        country: "Bahrain",
        branch: "Exhibition Avenue Branch",
        accountNumber: "0011137153001",
        currency: "BHD",
        iban: "BH32AUBB00011137153001",
        swift: "AUBBBHBM",
      },
    ],
    "IBP CARGO SERVICES LLC (UAE)": [
      {
        accountName: "IBP CARGO SERVICES LLC",
        bank: "Emirates Islamic Bank",
        country: "UAE",
        branch: "Jebel Ali Branch",
        accountNumber: "3708448510701",
        currency: "AED",
        iban: "AE840340003708448510701",
        swift: "MEBLAEADXXX",
      },
      {
        accountName: "IBP CARGO SERVICES LLC",
        bank: "Emirates Islamic Bank",
        country: "UAE",
        branch: "Jebel Ali Branch",
        accountNumber: "3708448510702",
        currency: "USD",
        iban: "AE570340003708448510702",
        swift: "MEBLAEADXXX",
      },
    ],
    "IBP TRADING LLC (UAE)": [
      {
        accountName: "IBP TRADING LLC",
        bank: "The National Bank of Ras Al Khaimah (RAK-BANK)",
        country: "UAE",
        branch: "Sharjah Branch",
        accountNumber: "0333178283001",
        currency: "AED",
        iban: "AE610400000333178283001",
        swift: "NRAKAEAK",
      },
      {
        accountName: "IBP TRADING LLC",
        bank: "The National Bank of Ras Al Khaimah (RAK-BANK)",
        country: "UAE",
        branch: "Sharjah Branch",
        accountNumber: "0333178283002",
        currency: "USD",
        iban: "AE340400000333178283002",
        swift: "NRAKAEAK",
      },
    ],
  };

  return (
    <div className="w-full ">
      <FormikProvider value={formikObj}>
        <div className="flex flex-col w-full py-4 space-y-3 items-center">
          <div
            className={`fixed ${
              showQuotation && "inset-0 bg-black bg-opacity-50"
            } flex items-center justify-center overflow-auto`}
          >
            {showQuotation && (
              <AddQuotation
                closeQuotation={setshowQuotation}
                AddItemToInvoice={(
                  item:
                    | QuotationItem
                    | LadingItems
                    | AirwayItem
                    | ProofOfDeliveryItems
                    | CargoManifestItems
                ) => {
                  if (formikObj.values.type === "BillOfLading") {
                    setBillOfLadingItems([
                      ...quotationLadingItemsStore,
                      item as LadingItems,
                    ]);
                  } else if (formikObj.values.type === "AirwayBill") {
                    setAirwayItems([...AirwayItems, item as AirwayItem]);
                  } else if (formikObj.values.type === "ProofOfDelivery") {
                    PodItem([
                      ...quotationPODItems,
                      item as ProofOfDeliveryItems,
                    ]);
                  } else if (formikObj.values.type === "CargoManifest") {
                    manifestItem([
                      ...quotationManifestItems,
                      item as CargoManifestItems,
                    ]);
                  } else {
                    setitemsArray([
                      ...quotationItemsStore,
                      item as QuotationItem,
                    ]);
                  }
                }}
                quotationType={formikObj.values.type}
                toEdit={toEdit}
              />
            )}
          </div>
          <div className="fixed z-50 w-full">
            {showPrestation && (
              <AddPrestation
                closePrestation={setshowPrestation}
                quotationType="job"
                toEdit={toEdit}
              />
            )}
          </div>
          <div className="fixed z-50 w-full">
            {showladingBasis && (
              <AddLadingBasis closeLadingBasis={setshowladingBasis} />
            )}
          </div>
          <h1 className="text-5xl text-center text-blue-600 font-serif">
            Generate Invoice
          </h1>
          <select
            className="w-3/5 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setsearchType(e.target.value);
              formikObj.setFieldValue("type", e.target.value);
            }}
            defaultValue={"quotation"}
          >
            <option>Search By</option>
            <option value={"quotation"}>Quotation</option>
            <option value={"job"}>Job</option>
          </select>
          <div className="flex items-center w-3/5 justify-between">
            <label className="text-xl" htmlFor="jobid">
              Enter {searchType === "quotation" ? "Quotation Id" : "Job Id"}
            </label>
            <input
              type={"text"}
              name={"Jobid"}
              placeholder={
                searchType === "quotation" ? "Quotation Id" : "Job Id"
              }
              className="w-3/5 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              ref={jobidRef}
            />

            <button
              className="bg-blue-500 text-white p-3 rounded-md"
              onClick={filljobDetailsbyId}
              type="button"
            >
              {loadingdetails ? (
                <LoaderIcon className="p-2 mx-auto" />
              ) : (
                "Fill Details"
              )}
            </button>
            <button
              className="bg-red-500 text-white p-3 rounded-md"
              onClick={ResetFields}
              type="button"
            >
              Reset Fields
            </button>
          </div>

          <div className="lg:w-4/5">
            <h1 className="text-xl text-center text-blue-900 font-serif">
              Invoice Details
            </h1>
            <form
              onSubmit={formikObj.handleSubmit}
              className="w-full space-y-5 flex flex-col justify-center"
            >
              <div className="mx-auto w-3/5 items-center space-x-4 flex  justify-center space-y-2">
                <label className="text-xl">{"Type of Bill"}</label>
                <Field
                  as="select"
                  name="type"
                  className="w-3/5 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  defaultValue={formikObj.values.type}
                  onChange={(e: any) => {
                    setbillType(e.target.value);
                    formikObj.setFieldValue("type", e.target.value);
                  }}
                >
                  <option value={""}>Select Type</option>
                  <option value={"Quotation"}>Quotation</option>
                  <option value={"AirFreight"}>AirFreight Invoice</option>
                  <option value={"RoadFreight"}>RoadFreight Invoice</option>
                  <option value={"SeaFreight"}>SeaFreight Invoice</option>
                  <option value={"BillOfLading"}>Bill Of Lading</option>
                  <option value={"AirwayBill"}>AirWay Bill</option>
                  <option value={"CargoManifest"}>Cargo Manifest</option>
                  <option value={"ProofOfDelivery"}>Proof Of Delivery</option>
                </Field>
                <ErrorMessage
                  name={"type"}
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex  flex-col space-y-2">
                <h1 className="text-xl text-center text-blue-900 font-serif">
                  Fill Details
                </h1>
                <div className="w-4/5 flex flex-col lg:flex-row flex-wrap justify-center items-center lg:justify-start mx-auto gap-3">
                  {formikObj.values.type === "ProofOfDelivery"
                    ? PODCol1.map((i) => (
                        <div key={i.name} className="px-4 w-2/5">
                          <label className="text-xl" key={i.name}>
                            {i.label}
                          </label>
                          <Field
                            as={i.type === "textarea" ? "textarea" : "input"}
                            type={i.type}
                            name={i.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={i.name}
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      ))
                    : formikObj.values.type === "CargoManifest"
                    ? CManifestCol1.map((i) => (
                        <div key={i.name} className="px-4 w-2/5">
                          <label className="text-xl" key={i.name}>
                            {i.label}
                          </label>
                          <Field
                            as={i.type === "textarea" ? "textarea" : "input"}
                            type={i.type}
                            name={i.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={i.name}
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      ))
                    : Column1Items.map((i) => (
                        <div key={i.name} className="px-4 w-2/5">
                          <label className="text-xl" key={i.name}>
                            {i.label}
                          </label>
                          <Field
                            as={i.type === "textarea" ? "textarea" : "input"}
                            type={i.type}
                            name={i.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={i.name}
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      ))}
                </div>
                <div className="w-4/5  flex flex-col lg:flex-row flex-wrap justify-center items-center lg:justify-start mx-auto gap-3 ">
                  {formikObj.values.type === "ProofOfDelivery"
                    ? PODCol2.map((i) =>
                        i.type === "select" ? (
                          <div key={i.name} className="px-4 w-2/5">
                            <label className="text-xl" key={i.name}>
                              {i.label}
                            </label>

                            <Field
                              as="select"
                              type={i.type}
                              name={i.name}
                              className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            >
                              <option>Select</option>
                              {i.options?.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name={i.name}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                        ) : (
                          <div key={i.name} className="px-4 w-2/5">
                            <label className="text-xl" key={i.name}>
                              {i.label}
                            </label>

                            <Field
                              as={i.type === "textarea" ? "textarea" : "input"}
                              type={i.type}
                              name={i.name}
                              className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                              name={i.name}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                        )
                      )
                    : formikObj.values.type === "CargoManifest"
                    ? CManifestCol2.map((i) =>
                        i.type === "select" ? (
                          <div key={i.name} className="px-4 w-2/5">
                            <label className="text-xl" key={i.name}>
                              {i.label}
                            </label>

                            <Field
                              as="select"
                              type={i.type}
                              name={i.name}
                              className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            >
                              <option>Select</option>
                              {i.options?.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name={i.name}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                        ) : (
                          <div key={i.name} className="px-4 w-2/5">
                            <label className="text-xl" key={i.name}>
                              {i.label}
                            </label>

                            <Field
                              as={i.type === "textarea" ? "textarea" : "input"}
                              type={i.type}
                              name={i.name}
                              className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            />
                            <ErrorMessage
                              name={i.name}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                        )
                      )
                    : Column2Items.map((i) =>
                        i && i.type === "select" ? (
                          <div key={i.name} className="px-4 w-2/5">
                            <label className="text-xl" key={i.name}>
                              {i.label}
                            </label>

                            <Field
                              as="select"
                              type={i.type}
                              name={i.name}
                              className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                            >
                              <option>Select</option>
                              {i.options?.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name={i.name}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                        ) : (
                          i && (
                            <div key={i.name} className="px-4 w-2/5">
                              <label className="text-xl" key={i.name}>
                                {i.label}
                              </label>

                              <Field
                                as={
                                  i.type === "textarea" ? "textarea" : "input"
                                }
                                type={i.type}
                                name={i.name}
                                className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                              />
                              <ErrorMessage
                                name={i.name}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                          )
                        )
                      )}
                </div>
              </div>

              <div className="flex  flex-col space-y-2">
                <div className="w-4/5 flex flex-col lg:flex-row flex-wrap justify-center items-center lg:justify-start mx-auto gap-3">
                  {formikObj.values.type === "AirwayBill" &&
                    AWBCol1.map((i) => (
                      <div key={i.name} className="px-4 w-2/5">
                        <label className="text-xl" key={i.name}>
                          {i.label}
                        </label>
                        <Field
                          as={i.type === "textarea" ? "textarea" : "input"}
                          type={i.type}
                          name={i.name}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name={i.name}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    ))}
                </div>
                <div className="w-4/5  flex flex-col lg:flex-row flex-wrap justify-center items-center lg:justify-start mx-auto gap-3 ">
                  {formikObj.values.type === "AirwayBill" &&
                    AWBCol2.map((i) => (
                      <div key={i.name} className="px-4 w-2/5">
                        <label className="text-xl" key={i.name}>
                          {i.label}
                        </label>
                        <Field
                          as={i.type === "textarea" ? "textarea" : "input"}
                          type={i.type}
                          name={i.name}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name={i.name}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex  flex-col space-y-2">
                <div className="w-4/5 flex flex-col lg:flex-row flex-wrap justify-center items-center lg:justify-start mx-auto gap-3">
                  {formikObj.values.type === "Quotation" &&
                    quotationNewCol?.map((i) => (
                      <div key={i.name} className="px-4 w-2/5">
                        <label className="text-xl" key={i.name}>
                          {i.label}
                        </label>
                        <Field
                          as={i.type === "textarea" ? "textarea" : "input"}
                          type={i.type}
                          name={i.name}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name={i.name}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    ))}
                </div>
              </div>
              {formikObj.values.type === "Quotation" && (
                <div className="w-4/5  flex flex-col lg:flex-row flex-wrap justify-center items-center lg:justify-start mx-auto gap-3 ">
                  <div className="px-4 w-4/5">
                    <label className="text-xl">Terms And Conditions</label>
                    {formikObj.values.termsAndConditions?.map((t, ind) => (
                      <div
                        className="flex flex-row w-full items-center"
                        key={ind}
                      >
                        <h1 className="text-xl">{ind + 1}</h1>

                        <div className="w-full ml-5">
                          <Field
                            as="textarea"
                            name={`termsAndConditions.${ind}`}
                            className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={`termsAndConditions.${ind}`}
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                        <h2
                          className="text-xl ml-5 text-white w-8 text-center  bg-red-500 rounded-2xl cursor-pointer"
                          onClick={() => {
                            formikObj.setFieldValue(
                              "termsAndConditions",
                              formikObj.values.termsAndConditions?.filter(
                                (t, i) => i !== ind
                              )
                            );
                          }}
                        >
                          X
                        </h2>
                      </div>
                    ))}
                    {
                      <div className="">
                        <button
                          className="text-lg rounded-full bg-green-600 text-white p-2"
                          onClick={(e) => {
                            console.log("Here");
                            if (!formikObj.values.type) {
                              return toast.error("Select Type Of Bill First");
                            }
                            formikObj.setFieldValue("termsAndConditions", [
                              ...formikObj.values.termsAndConditions!,
                              "",
                            ]);
                          }}
                          type="button"
                        >
                          Add Another Condition
                        </button>
                      </div>
                    }
                  </div>
                </div>
              )}

              <div className="w-4/5  flex flex-col lg:flex-row flex-wrap justify-center items-center lg:justify-start mx-auto gap-3 ">
                {(formikObj.values.type === "AirFreight" ||
                  formikObj.values.type === "SeaFreight" ||
                  formikObj.values.type === "RoadFreight") && (
                  <div className="px-4 w-2/5">
                    <label className="text-xl">Bank Details</label>
                    <Field
                      as="select"
                      name="bankDetails"
                      className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value={""}>Select</option>

                      {Object.keys(bankDetails).map((b) => (
                        <option value={b} key={b}>
                          {b}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name={"bankDetails"}
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                )}
              </div>
              {formikObj.values.type === "AirwayBill" && (
                <h1 className="text-xl text-center text-blue-900 font-serif">
                  Flight Information
                </h1>
              )}
              <div className="w-4/5  flex flex-col lg:flex-row flex-wrap justify-center items-center lg:justify-start mx-auto gap-3 ">
                {formikObj.values.type === "AirwayBill" &&
                  AWBflightInfo?.map((i) => (
                    <div key={i.name} className="px-4 w-2/5">
                      <label className="text-xl" key={i.name}>
                        {i.label}
                      </label>

                      <Field
                        as={i.type === "textarea" ? "textarea" : "input"}
                        type={i.type}
                        name={i.name}
                        className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                      />
                      <ErrorMessage
                        name={i.name}
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  ))}
              </div>
              <div className="w-full space-y-2 w-5/5">
                <h1 className="text-xl text-center text-blue-900 font-serif">
                  Add Services
                </h1>
                <div className="mx-auto w-[90%] overflow-auto mt-20">
                  <table className="border overflow-x-auto w-full ml-30 border-slate-400 md:border-spacing-x-10 md:border-spacing-y-2">
                    <thead>
                      <tr>
                        {formikObj.values.type === "BillOfLading"
                          ? billofLadleTable.map((column) => (
                              <React.Fragment key={column.name}>
                                <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                                  {column.label}
                                </th>
                              </React.Fragment>
                            ))
                          : formikObj.values.type === "AirwayBill"
                          ? AirwayBillTable.map((column) => (
                              <React.Fragment key={column.name}>
                                <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                                  {column.label}
                                </th>
                              </React.Fragment>
                            ))
                          : formikObj.values.type === "CargoManifest"
                          ? CargoManifestTable.map((column) => (
                              <React.Fragment key={column.name}>
                                <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                                  {column.label}
                                </th>
                              </React.Fragment>
                            ))
                          : formikObj.values.type === "ProofOfDelivery"
                          ? ProofOfDeliveryTable.map((column) => (
                              <React.Fragment key={column.name}>
                                <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                                  {column.label}
                                </th>
                              </React.Fragment>
                            ))
                          : Column1.map((column) => (
                              <React.Fragment key={column.name}>
                                <th
                                  className="border border-slate-300 p-4 bg-blue-50 w-auto"
                                  colSpan={
                                    column.subheadings
                                      ? column.subheadings.length
                                      : 1
                                  }
                                >
                                  {column.label}
                                  {column.subheadings &&
                                    column.subheadings.map(
                                      (subheading, subIndex) => (
                                        <th
                                          className="px-4 border-t-2 border-black text-center"
                                          key={`${column.name}_${subIndex}`}
                                          colSpan={1}
                                        >
                                          {subheading}
                                        </th>
                                      )
                                    )}
                                </th>
                              </React.Fragment>
                            ))}
                      </tr>
                    </thead>
                    {formikObj.values.type === "BillOfLading" ? (
                      quotationLadingItemsStore && (
                        <tbody>
                          {quotationLadingItemsStore.map((i, index) => (
                            <tr key={index}>
                              <td className="border border-slate-300 p-4">
                                {index + 1}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.NoOfPackages}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.PackageDescription}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.ContainerNo}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.SealNo}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.Dimensions}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.Weight}
                              </td>
                              <td className="border border-slate-300 p-4">
                                <h1 className="text-yellow-400">Edit</h1>
                                <h1 className="text-red-400">Remove</h1>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )
                    ) : formikObj.values.type === "AirwayBill" ? (
                      <tbody>
                        {AirwayItems.map((i, index) => (
                          <tr key={index}>
                            <td className="border border-slate-300 p-4">
                              {index + 1}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.NoPieces}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.GrossWeight}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Unit}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Rate}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.ChargeableWeight}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.NatureOfGoods}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.RatePerCharge}
                            </td>
                            <td className="border border-slate-300 p-4">
                              <h1 className="text-yellow-400">Edit</h1>
                              <h1 className="text-red-400">Remove</h1>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : formikObj.values.type === "CargoManifest" ? (
                      <tbody>
                        {quotationManifestItems.map((i, index) => (
                          <tr key={index}>
                            <td className="border border-slate-300 p-4">
                              {index + 1}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.HAWB}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.ParcelsWeight}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Description}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Shipper}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Charges}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {/* {i.UnitPerKg} */}
                              {i.Collect}
                            </td>
                            <td className="border border-slate-300 p-4">
                              <h1 className="text-yellow-400">Edit</h1>
                              <h1 className="text-red-400">Remove</h1>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : formikObj.values.type === "ProofOfDelivery" ? (
                      <tbody>
                        {quotationPODItems.map((i, index) => (
                          <tr key={index}>
                            <td className="border border-slate-300 p-4">
                              {index + 1}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.MAWB}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.HAWBNo}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.NoOfPackages}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Weight}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.CBM}
                            </td>
                            <td className="border border-slate-300 p-4">
                              <h1 className="text-yellow-400">Edit</h1>
                              <h1 className="text-red-400">Remove</h1>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        {quotationItemsStore?.map((i, index) => (
                          <tr key={index}>
                            <td className="border border-slate-300 p-4">
                              {index + 1}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.QuoteValidity}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Charges}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.ChargeDescription}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Units}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Units}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {/* {i.UnitPerKg} */}
                              {i.RateAmountPerUnit}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.MinRateAmountPerUnit}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.MinRateAmountPerUnit}
                            </td>
                            {/* <td className="border border-slate-300 p-4">
                          {i.CostAmountPerUnit}
                        </td> */}
                            {/* <td className="border border-slate-300 p-4">
                          {i.MinCostAmountPerUnit}
                        </td> */}
                            {/* <td className="border border-slate-300 p-4">
                          {i.MinCostAmountPerUnit}
                        </td> */}
                            <td className="border border-slate-300 p-4">
                              {i.Currency}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.vatpercent}
                            </td>{" "}
                            <td className="border border-slate-300 p-4">
                              {i.vatamount}
                            </td>
                            <td className="border border-slate-300 p-4">
                              {i.Discount}
                            </td>
                            <td className="border border-slate-300 p-4">
                              <h1
                                className="text-yellow-400"
                                onClick={() => {
                                  console.log(i, "the i");
                                  settoEdit({ ...i, index, isEditing: true });
                                  setshowQuotation(true);
                                  ctx.setToggle();
                                }}
                              >
                                Edit
                              </h1>
                              <h1
                                className="text-red-400"
                                onClick={() => {
                                  const newquotations =
                                    quotationItemsStore.filter(
                                      (i, ind) => ind !== index
                                    );
                                  setitemsArray(newquotations);
                                }}
                              >
                                Remove
                              </h1>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                  <div className="absolute right-20">
                    <button
                      className="text-2xl rounded-full text-green-600"
                      onClick={(e) => {
                        console.log("Here");
                        if (!formikObj.values.type) {
                          return toast.error("Select Type Of Bill First");
                        }
                        settoEdit({ isEditing: false });
                        setshowQuotation(true);
                        ctx.setToggle();
                      }}
                      type="button"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        height={70}
                        width={70}
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            opacity="0.5"
                            d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"
                            fill="#054d00"
                          ></path>{" "}
                          <path
                            d="M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                            fill="#054d00"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {formikObj.values.type === "Quotation" && (
                <div className="w-full space-y-2 w-5/5">
                  <h1 className="text-xl text-center text-blue-900 font-serif">
                    Prestations
                  </h1>
                  <div className="mx-auto w-[90%] overflow-auto mt-20">
                    <table className="border overflow-x-auto w-full ml-30 border-slate-400 md:border-spacing-x-10 md:border-spacing-y-2">
                      <thead>
                        <tr>
                          <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                            index
                          </th>
                          <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                            Description
                          </th>
                          <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                            Currency
                          </th>
                          <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                            Total
                          </th>
                        </tr>
                      </thead>
                      {
                        <tbody>
                          {prestation?.map((i, index) => (
                            <tr key={index}>
                              <td className="border border-slate-300 p-4">
                                {index + 1}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.description}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.currency}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.total}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      }
                    </table>
                    <div className="absolute right-20">
                      <button
                        className="text-2xl rounded-full text-green-600"
                        onClick={(e) => {
                          console.log("Here");
                          setshowPrestation(true);
                          ctx.setToggle();
                        }}
                        type="button"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={70}
                          width={70}
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              opacity="0.5"
                              d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"
                              fill="#054d00"
                            ></path>{" "}
                            <path
                              d="M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                              fill="#054d00"
                            ></path>{" "}
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {formikObj.values.type === "BillOfLading" && (
                <div className="w-full space-y-2 w-5/5">
                  <h1 className="text-xl text-center text-blue-900 font-serif">
                    Bill Of Lading
                  </h1>
                  <div className="mx-auto w-[90%] overflow-auto mt-20">
                    <table className="border overflow-x-auto w-full ml-30 border-slate-400 md:border-spacing-x-10 md:border-spacing-y-2">
                      <thead>
                        <tr>
                          <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                            index
                          </th>
                          <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                            Charge
                          </th>
                          <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                            Rate
                          </th>
                          <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                            Basis
                          </th>
                          <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                            Wt/Vol/Val
                          </th>
                          <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                            P/C
                          </th>
                          <th className="border border-slate-300 p-4 bg-blue-50 w-auto">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      {
                        <tbody>
                          {ladingbasisItems?.map((i, index) => (
                            <tr key={index}>
                              <td className="border border-slate-300 p-4">
                                {index + 1}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.charge}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.rate}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.basis}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.wtvolval}
                              </td>{" "}
                              <td className="border border-slate-300 p-4">
                                {i.pc}
                              </td>
                              <td className="border border-slate-300 p-4">
                                {i.amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      }
                    </table>
                    <div className="absolute right-20">
                      <button
                        className="text-2xl rounded-full text-green-600"
                        onClick={(e) => {
                          console.log("Here");
                          setshowladingBasis(true);
                          ctx.setToggle();
                        }}
                        type="button"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={70}
                          width={70}
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              opacity="0.5"
                              d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"
                              fill="#054d00"
                            ></path>{" "}
                            <path
                              d="M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                              fill="#054d00"
                            ></path>{" "}
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-700  !mx-auto   text-white rounded-lg px-5 py-3 text-2xl self-center"
              >
                Preview
              </button>
            </form>
          </div>
        </div>
      </FormikProvider>
    </div>
  );
}

export default GenerateInvoice;
