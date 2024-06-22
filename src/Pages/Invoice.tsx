import {
  PDFViewer,
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Image,
  pdf,
  usePDF,
} from "@react-pdf/renderer";
import React, { useRef, useState } from "react";
import useinvoiceStore from "../store/Invoice";
import useCompanyInfo from "../store/CompanyInfo";
import logo from "../assets/images/Logo.png";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import { ref, uploadBytes } from "firebase/storage";
import { LoaderIcon } from "react-hot-toast";
function Invoice() {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 11,
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: 10,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "black",
      width: "100%",
      height: "100%",
    },
    logo: {
      width: 74,
      height: 66,
    },
  });
  const { jobInfo, Items } = useinvoiceStore();
  const { Location } = useCompanyInfo();
  const [isSaving, setisSaving] = useState<boolean>(false);
  const companyLocation = Location.find(
    (l) => l.key === jobInfo?.officeAddress
  );
  console.log("jobinfo", jobInfo);
  const handleSavePdf = async () => {
    try {
      const myDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text
              render={({ pageNumber, totalPages }) => (
                <Text>
                  Page. {pageNumber} / {totalPages}
                </Text>
              )}
              fixed
            />
            <InvoiceHeader />
            <CompanyInfo jobInfo={jobInfo} location={companyLocation!} />
            <BillToInfo jobInfo={jobInfo} />
            <ItemsTableHeader jobInfo={jobInfo} />
            <TableRows items={Items} />
            <TableFooter items={Items} jobInfo={jobInfo} />
            <PageFooter companyInfo={companyLocation!} jobInfo={jobInfo} />
          </Page>
        </Document>
      );
      setisSaving(true);

      const doc = pdf(myDoc);
      const blob = await doc.toBlob();
      const jref = ref(
        storage,
        `${jobInfo.quotationId || jobInfo.Jobid || "Test"}/invoice.pdf`
      );
      await uploadBytes(jref, blob!);
      toast.success("Successfully Uploaded");
    } catch (e) {
      console.log(e);
      toast.error("Couldnt Upload Document");
    } finally {
      setisSaving(false);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row lg:items-start">
      <PDFViewer className="w-full h-screen">
        <Document>
          <Page size="A4" style={styles.page}>
            <Text
              render={({ pageNumber, totalPages }) => (
                <Text>
                  Page. {pageNumber} / {totalPages}
                </Text>
              )}
              fixed
            />
            <InvoiceHeader />
            <CompanyInfo jobInfo={jobInfo} location={companyLocation!} />
            <BillToInfo jobInfo={jobInfo} />
            <ItemsTableHeader jobInfo={jobInfo} />
            <TableRows items={Items} />
            <TableFooter items={Items} jobInfo={jobInfo} />
            <PageFooter companyInfo={companyLocation!} jobInfo={jobInfo} />
          </Page>
        </Document>
      </PDFViewer>
      <button
        className="bg-blue-700 w-40 !mx-auto   text-white rounded-lg px-5 py-3 text-2xl self-start my-4 gap-4"
        onClick={handleSavePdf}
      >
        {isSaving ? "..." : "Save"}
      </button>
    </div>
  );
}

function InvoiceHeader() {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        borderBottomColor: "red",
        borderBottomWidth: 2,
        padding: 10,
      }}
    >
      <View
        fixed
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "25%",
        }}
      >
        <Image
          style={{ objectFit: "contain", height: 60, width: "100%" }}
          src={logo}
          fixed
        />
      </View>
      <View style={{ width: "70%", alignItems: "flex-start" }}>
        <Text style={{ fontFamily: "Courier", fontSize: 15 }}>
          IBP Cargo Services L.L.C
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    border: 1,
    borderWidth: 1,
    borderColor: "blue",
    width: "100%",
    marginVertical: 5,
  },
  billTo: {
    marginTop: 10,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  singleContainer: {
    width: "50%",
    padding: 3,
  },
  singleText: {
    paddingVertical: 1,
    paddingHorizontal: 4,
    fontSize: 8,
    flexWrap: "wrap",
  },
});

const CompanyInfo = ({
  jobInfo,
  location,
}: {
  jobInfo: Inquiry & cargoInfo;
  location: CompanyLocationInfo;
}) => {
  return (
    <View style={styles.headerContainer}>
      <About companyLocation={location} jobInfo={jobInfo} />
    </View>
  );
};

function About({
  companyLocation,
  jobInfo,
}: {
  companyLocation: CompanyLocationInfo;
  jobInfo: Inquiry & cargoInfo;
}) {
  return (
    <>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          width: "50%",
          justifyContent: "flex-start",
          borderRight: 1,
        }}
      >
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {companyLocation?.name}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            {companyLocation?.location}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            {companyLocation?.office}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            Phone {"   "} {companyLocation?.telephone}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            P.O Box {"   "} {companyLocation?.pobox}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            TRN {"   "} {companyLocation?.TRN}
          </Text>
        </View>
        <View style={{ width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            {companyLocation?.country}
          </Text>
        </View>
      </View>

      <AuxiliaryInfo jobInfo={jobInfo} />
    </>
  );
}

function AuxiliaryInfo({ jobInfo }: { jobInfo: Inquiry & cargoInfo }) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: "30%",
        justifyContent: "flex-start",

        borderLeft: 1,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Posting Date
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo.PostingDate}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Due Date
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo.dueDate}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Origin
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo.type.includes("road") || jobInfo.type.includes("Road")
              ? jobInfo.PlaceOfOrigin
              : jobInfo.type.includes("sea") || jobInfo.type.includes("Sea")
              ? jobInfo.PortOfOrigin
              : jobInfo.AirportOfOrigin}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Destination
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo.type.includes("road") || jobInfo.type.includes("Road")
              ? jobInfo.PlaceOfDestination
              : jobInfo.type.includes("sea") || jobInfo.type.includes("Sea")
              ? jobInfo.PortOfDestination
              : jobInfo.AirportOfDestination}
          </Text>
        </View>
      </View>
    </View>
  );
}

function BillToInfo({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
  return (
    <View>
      <View
        style={{
          borderBottomWidth: 2,
          borderTopWidth: 1,
          width: "100%",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 20, textAlign: "center" }}>Tax Invoice</Text>
      </View>
      <ReceiverInfo jobInfo={jobInfo} />
    </View>
  );
}
function ReceiverInfo({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        border: 1,
      }}
    >
      <ReceiverCol1 jobInfo={jobInfo} />
      <View style={{ borderLeft: 1, width: "30%" }}>
        <Text></Text>
      </View>
      <ReceiverCol2 jobInfo={jobInfo} />
    </View>
  );
}
function ReceiverCol1({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: "35%",
        justifyContent: "flex-start",
        flex: 1,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Bill To {"   "}
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo.CustomerName}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            TRN Number {"  "}
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.CustomerTRN}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Address {"  "}
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.CustomerAddress}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Phone
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.CustomerPhoneNo}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Email
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.CustomerEmail}
          </Text>
        </View>
      </View>
    </View>
  );
}
function ReceiverCol2({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: "35%",
        justifyContent: "flex-start",
        flex: 1,
        borderLeft: 1,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Invoice No
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.quotationId +
              "-" +
              new Date().getMilliseconds().toString()}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            bl # {"  "}
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.blNo}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Served By {"   "}
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.SalesPerson}
          </Text>{" "}
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Job #
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          {" "}
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {" "}
            {jobInfo?.Jobid}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            H.A.W.B
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.HAWB}
          </Text>
        </View>
      </View>
    </View>
  );
}

function ItemsTableHeader({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 10,
        border: 1,
      }}
    >
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          S No
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "30%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Description
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          QTY
        </Text>
      </View>{" "}
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Unit Price
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Discount
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          VAT % Rate
        </Text>
      </View>{" "}
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          VAT Amount
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "10%",
          backgroundColor: "gainsboro",
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Total Amount AED
        </Text>
      </View>
    </View>
  );
}
function TableRows({ items }: { items: QuotationItem[] }) {
  const rows = items?.map((i, index) => {
    const Total =
      parseInt(i.RateAmountPerUnit) * (i.quantity ?? 1) +
      (i.Discount ?? 0) +
      (i.vatamount ?? 0);

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          border: 1,
        }}
      >
        <View
          style={{
            width: "10%",

            borderRight: 1,
          }}
        >
          <Text
            style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
          >
            {index}{" "}
          </Text>
        </View>
        <View
          style={{
            width: "30%",

            borderRight: 1,
          }}
        >
          <Text
            style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
          >
            {i.ChargeDescription}
          </Text>
        </View>
        <View
          style={{
            width: "10%",

            borderRight: 1,
          }}
        >
          <Text
            style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
          >
            {i.quantity}
          </Text>
        </View>{" "}
        <View
          style={{
            width: "10%",

            borderRight: 1,
          }}
        >
          <Text
            style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
          >
            {i.RateAmountPerUnit}
          </Text>
        </View>
        <View
          style={{
            width: "10%",

            borderRight: 1,
          }}
        >
          <Text
            style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
          >
            {i.Discount}
          </Text>
        </View>
        <View
          style={{
            width: "10%",

            borderRight: 1,
          }}
        >
          <Text
            style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
          >
            {i.vatpercent}
          </Text>
        </View>{" "}
        <View
          style={{
            width: "10%",

            borderRight: 1,
          }}
        >
          <Text
            style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
          >
            {i.vatamount}
          </Text>
        </View>
        <View
          style={{
            width: "10%",
          }}
        >
          <Text
            style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
          >
            {Total}
          </Text>
        </View>
      </View>
    );
  });
  return <>{rows}</>;
}
function TableFooter({
  items,
  jobInfo,
}: {
  items: QuotationItem[];
  jobInfo: cargoInfo & Inquiry;
}) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TableFooterCol1 />
      <TableFooterCol2 items={items} jobInfo={jobInfo} />
    </View>
  );
}
function TableFooterCol1() {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        width: "35%",
        justifyContent: "flex-start",
        flex: 1,
        backgroundColor: "gainsboro",
        height: "100%",
        border: 1,
      }}
    ></View>
  );
}
function TableFooterCol2({
  items,
  jobInfo,
}: {
  items: QuotationItem[];
  jobInfo: cargoInfo & Inquiry;
}) {
  const Total = items.reduce((acc, i, index) => {
    const t =
      parseInt(i.RateAmountPerUnit) * (i.quantity ?? 1) +
      (i.Discount ?? 0) +
      (i.vatamount ?? 0);

    return acc + t;
  }, 0);
  const tafterVat = Total + (jobInfo.VATAmount ?? 1);
  const TWO = tafterVat + jobInfo.OutstandingDues;
  console.log("Titems", items);
  console.log("Total", Total);
  console.log("TWo", TWO);
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: "35%",
        justifyContent: "flex-start",
        flex: 1,
        border: 1,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Total Before VAT
          </Text>
        </View>
        <View style={{ width: "40%" }}>
          {" "}
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {Total}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            VAT Amount
          </Text>
        </View>
        <View style={{ width: "40%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo.VATAmount}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            After VAT
          </Text>
        </View>
        <View style={{ width: "40%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {tafterVat}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Outstanding Dues
          </Text>
        </View>
        <View style={{ width: "40%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo.OutstandingDues}
          </Text>
        </View>
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Grand Total
          </Text>
        </View>
        <View style={{ width: "40%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {TWO}
          </Text>
        </View>
      </View>
    </View>
  );
}

function PageFooter({
  companyInfo,
  jobInfo,
}: {
  companyInfo: CompanyLocationInfo;

  jobInfo: Inquiry & cargoInfo;
}) {
  const bankDetails: BankDetails = {
    "IBP TRADING WLL-BHD": {
      bank: "NATIONAL BANK OF BAHRAIN",
      branch: "HIDD BRANCH",
      accountName: "IBP TRADING W.L.L",
      accountNumber: "0073026352",
      currency: "BAHRAIN DINAR CURRENT ACCOUNT",
      foreignPayments: "",
      IBAN: "BH41NBOB00000073026352",
      SWIFT: "NBOBBHBM",
    },
    "IBP TRADING WLL-USD": {
      bank: "NATIONAL BANK OF BAHRAIN",
      branch: "HIDD BRANCH",
      accountName: "IBP TRADING W.L.L",
      accountNumber: "0048016926",
      currency: "USD CURRENT ACCOUNT",
      foreignPayments: "",
      IBAN: "BH04NBOB00000048016926",
      SWIFT: "NBOBBHBM",
    },
    "IBP CARGO AND CONSTRUCTION WLL-BHD": {
      bank: "NATIONAL BANK OF BAHRAIN",
      branch: "PALACE AVENUE BRANCH",
      accountName: "IBP CARGO AND CONSTRUCTION W.L.L",
      accountNumber: "0075113929",
      currency: "BAHRAIN DINAR CURRENT ACCOUNT",
      foreignPayments: "",
      IBAN: "BH28NBOB00000075113929",
      SWIFT: "NBOBBHBM",
    },
    "IBP TRADE SERVICE WLL.-BHD": {
      bank: "AHLI UNITED BANK",
      branch: "EXHIBITION AVENUE BRANCH",
      accountName: "IBP TRADE SERVICES CO.WLL",
      accountNumber: "0011137153001",
      currency: "BAHRAIN DINAR CURRENT ACCOUNT",
      foreignPayments: "",
      IBAN: "BH32AUBB00011137153001",
      SWIFT: "AUBBBHBM",
    },
    "IBP CARGO SERVICES LLC.-AED": {
      bank: "EMIRATES ISLAMIC BANK",
      branch: "JEBEL ALI BRANCH",
      accountName: "IBP CARGO SERVICES LLC.",
      accountNumber: "3708448510701",
      currency: "ARAB EMIRATES DIRHAM ACCOUNT",
      foreignPayments: "",
      IBAN: "AE840340003708448510701",
      SWIFT: "MEBLAEADXXX",
    },
    "IBP CARGO SERVICES LLC.-USD": {
      bank: "EMIRATES ISLAMIC BANK",
      branch: "JEBEL ALI BRANCH",
      accountName: "IBP CARGO SERVICES LLC.",
      accountNumber: "3708448510702",
      currency: "USD CURRENT ACCOUNT",
      foreignPayments: "",
      IBAN: "AE570340003708448510702",
      SWIFT: "MEBLAEADXXX",
    },
    "IBP TRADING LLC.-AED": {
      bank: "THE NATIONAL BANK OF RAS AL KHAIMAH (RAK-BANK)",
      branch: "SHARJAH BRANCH",
      accountName: "IBP TRADING LLC",
      accountNumber: "0333178283001",
      currency: "ARAB EMIRATES DIRHAM ACCOUNT",
      foreignPayments: "",
      IBAN: "AE610400000333178283001",
      SWIFT: "NRAKAEAK",
    },
    "IBP TRADING LLC.-USD": {
      bank: "THE NATIONAL BANK OF RAS AL KHAIMAH (RAK-BANK)",
      branch: "SHARJAH BRANCH",
      accountName: "IBP TRADING LLC",
      accountNumber: "0333178283002",
      currency: "USD CURRENT ACCOUNT",
      foreignPayments: "",
      IBAN: "AE340400000333178283002",
      SWIFT: "NRAKAEAK",
    },
  };
  const selectedBank = bankDetails[jobInfo.bankDetails!];
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <View style={{ width: "30%" }}>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 12 }}>
          License No#
        </Text>
        <Text style={{ fontFamily: "Courier", fontSize: 12 }}>
          {jobInfo.licenseNo}
        </Text>
      </View>
      <View style={{ width: "35%" }}>
        <Text
          style={{
            textDecoration: "underline",
            fontFamily: "Courier",
            fontSize: 12,
          }}
        >
          BANK Details AED Account
        </Text>
        <View>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Account Name: {"   "} {selectedBank?.accountName}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Account No: {"   "} {selectedBank?.accountNumber}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Bank Name: {"   "} {selectedBank?.bank}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            IBAN: {"   "} {selectedBank?.IBAN}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Branch Name: {"   "} {selectedBank?.branch}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Swift Code: {"   "} {selectedBank?.SWIFT}
          </Text>
        </View>
      </View>
    </View>
  );
}
export default Invoice;
