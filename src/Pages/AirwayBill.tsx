import {
  PDFViewer,
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Image,
  pdf,
} from "@react-pdf/renderer";
import React, { useState } from "react";
import useinvoiceStore from "../store/Invoice";
import useCompanyInfo from "../store/CompanyInfo";
import logo from "../assets/images/Logo.png";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { toast } from "react-toastify";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
    paddingVertical: 10,
    position: "relative",
  },
  logo: {
    width: "30%",
    height: "100%",
    objectFit: "contain",
  },
});
function AirwayBill() {
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
      paddingVertical: 6,
      position: "relative",
    },
    logo: {
      width: 74,
      height: 66,
    },
  });
  const { AirwayInfo, AirwayItems } = useinvoiceStore();
  const { Location } = useCompanyInfo();
  console.log("loca", Location);
  const companyLocation = Location.find(
    (l) => l.key === AirwayInfo.officeAddress
  );
  console.log("loca2", AirwayItems);
  const [isSaving, setisSaving] = useState<boolean>(false);

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
              wrap={false}
              style={{
                fontFamily: "Courier-Bold",
              }}
            />
            <View
              style={{
                fontSize: 10,
                alignSelf: "flex-end",
                paddingHorizontal: 20,
              }}
            >
              <Text>
                Date:{" "}
                {new Date().getFullYear() +
                  "-" +
                  new Date().getMonth() +
                  "-" +
                  new Date().getDate()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                border: 1,
              }}
            >
              <Column1 jobInfo={AirwayInfo} companyInfo={companyLocation!} />
              <Column2 jobInfo={AirwayInfo} />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
                marginVertical: 5,
              }}
            >
              <InvoiceTableHeader />
              <InvoiceTableRow items={AirwayItems} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                position: "absolute",
                bottom: 3,
                left: 10,
                right: 0,
                border: 1,
              }}
            >
              <Column3 jobInfo={AirwayInfo} />
              <Column4 jobInfo={AirwayInfo} />
            </View>
          </Page>
        </Document>
      );
      setisSaving(true);
      const doc = pdf(myDoc);
      const blob = await doc.toBlob();
      const jref = ref(storage, `${AirwayInfo.Jobid || "Test"}/AWB.pdf`);
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
              wrap={false}
              style={{
                fontFamily: "Courier-Bold",
              }}
            />
            <View
              style={{
                fontSize: 10,
                alignSelf: "flex-end",
                paddingHorizontal: 20,
              }}
            >
              <Text>
                Date:{" "}
                {new Date().getFullYear() +
                  "-" +
                  new Date().getMonth() +
                  "-" +
                  new Date().getDate()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                border: 1,
              }}
            >
              <Column1 jobInfo={AirwayInfo} companyInfo={companyLocation!} />
              <Column2 jobInfo={AirwayInfo} />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
                marginVertical: 5,
              }}
            >
              <InvoiceTableHeader />
              <InvoiceTableRow items={AirwayItems} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                position: "absolute",
                bottom: 3,
                left: 10,
                right: 0,
                border: 1,
              }}
            >
              <Column3 jobInfo={AirwayInfo} />
              <Column4 jobInfo={AirwayInfo} />
            </View>
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

export default AirwayBill;

function Column1({
  jobInfo,
  companyInfo,
}: {
  jobInfo: cargoInfo & AirwayBillInquiry;
  companyInfo: CompanyLocationInfo;
}) {
  return (
    <View
      style={{
        width: "50%",
        borderLeftColor: "black",
        borderRight: 1,
      }}
    >
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          borderBottom: 1,
          borderBottomColor: "black",
          paddingBottom: 5,
          borderTop: 1,
          borderTopColor: "black",
          minHeight: 20,
          maxHeight: 55,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              width: "40%",
              fontSize: 6,
            }}
          >
            Shipper Details
          </Text>
          <View
            style={{
              padding: 1,
              width: "60%",
              borderLeftWidth: 1,
              borderBottomWidth: 1,
              minHeight: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Courier-Bold",
                width: "100%",
                fontSize: 6,
              }}
            >
              Shippers Account Number
            </Text>
            <Text
              style={{
                fontFamily: "Courier-Bold",
                fontSize: 9,
              }}
            >
              {companyInfo?.BankInfo?.IBAN}
            </Text>
          </View>
        </View>
        <View style={{ height: "100%" }}>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 8 }}>
            {jobInfo?.ShipperName} {"\n"}
            {jobInfo?.ShipperAddress} {"\n"}
            {jobInfo?.ShipperPhone} {"\n"}
            {jobInfo?.ShippersAccount}
            {"\n"}
            {jobInfo?.OtherShipperInfo}
            {"\n"}
            TRN {jobInfo?.ShippersTRN}
            {"\n"}
            {jobInfo?.ShipperPhone}
            {"\n"}
            PO Box {jobInfo?.ShippersPO}
            {"\n"}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 18,
          borderBottom: 1,
          borderBottomColor: "black",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            minHeight: 18,
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
              width: "40%",
            }}
          >
            Consignee
          </Text>
          <View
            style={{
              padding: 1,
              width: "60%",
              borderLeftWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "Courier-Bold",
                fontSize: 6,
              }}
            >
              Consignees Account Number
            </Text>
            <Text
              style={{
                fontFamily: "Courier-Bold",
                fontSize: 9,
              }}
            >
              {jobInfo.ConsigneesAccount || ""}
            </Text>
          </View>
        </View>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 9 }}>
          {jobInfo.CustomerName}
          {"\n"}
          {jobInfo.CustomerEmail}
          {"\n"}
          {jobInfo.CustomerAddress} {"\n"}
          {jobInfo.CustomerPhoneNo}
          {"\n"}
          Customer TRN {jobInfo.CustomerTRN}
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 15,
          borderBottom: 1,
          borderBottomColor: "black",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",

            width: "100%",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
              width: "100%",
            }}
          >
            Issuing Carrier's Agent Name and City
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 9,
            }}
          >
            {jobInfo.IssuingCarriersName} {jobInfo.IssuingCarriersCity}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 30,
          borderBottom: 1,
          borderBottomColor: "black",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{}}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Agents IATA Code
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 9,
            }}
          >
            {jobInfo.AgentsIATA}
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Account No
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
            }}
          >
            {jobInfo.AccountingInformation}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 40,
          borderBottom: 1,
          borderBottomColor: "black",

          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Accounting Information
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 9,
            }}
          >
            {jobInfo.AccountingInformation}
          </Text>
        </View>
      </View>

      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 35,
          borderBottom: 1,
          borderBottomColor: "black",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <View style={{ width: "50%", paddingRight: 2, borderRight: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Airport Of Departure
            <Text style={{ fontSize: 5 }}>
              (Addr. of first Carrier) and requested Routing
            </Text>
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 10 }}>
            {jobInfo.AirportOfOrigin}
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Airport Of Destination
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 10 }}>
            {jobInfo.AirportOfDestination}
          </Text>
        </View>
      </View>

      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 38,
          borderBottom: 1,
          borderBottomColor: "black",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <View style={{ width: "50%" }}>
          <View
            style={{
              borderRightColor: "black",
              width: "100%",

              borderBottomColor: "black",
            }}
          >
            <Text
              style={{
                fontFamily: "Courier-Bold",
                fontSize: 6,
              }}
            >
              Flight Details
            </Text>
            <Text style={{ fontFamily: "Courier-Bold", fontSize: 9 }}>
              {jobInfo.FlightDetails}
            </Text>
          </View>
        </View>
        <View style={{ width: "50%", paddingLeft: 2, borderLeft: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Mode Of Payment
          </Text>
          <Text
            style={{
              textDecoration: "none",

              fontFamily: "Courier-Bold",
              fontSize: 9,
            }}
          >
            {jobInfo.PaymentMethod}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 35,
          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 6,
          }}
        >
          Handling Information
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 9 }}>
          {jobInfo.HandlingInformation}
        </Text>
      </View>
    </View>
  );
}

function Column2({ jobInfo }: { jobInfo: cargoInfo & AirwayBillInquiry }) {
  console.log("Jobinfo in awb", jobInfo);
  return (
    <View
      style={{
        width: "50%",
      }}
    >
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          height: 40,
          borderBottom: 1,
          borderBottomColor: "black",
          borderTop: 1,
          borderTopColor: "black",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Image style={styles.logo} src={logo} />
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 7 }}>
          Not Negotiable .{`\n`}
          Issued By {jobInfo.IssuedBy}.{"\n"} Copies1,2 and 3 of this AirWaybill
          {`\n`} are originals and have the same{"\n"} validity
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          paddingHorizontal: 4,
          height: 90,
          borderBottom: 1,
          borderBottomColor: "black",
        }}
      >
        <Text style={{ fontSize: 7, fontFamily: "Courier-Bold" }}>
          It is agreed that the goods described herein are accepted in apparent
          good order and condition (except as noted) for carriage SUBJECT TO THE
          CONDITIONS OF CONTRACT ON THE REVERSE HEREOF. ALL GOODS MAY BE CARRIED
          BY ANY OTHER MEANS INCLUDING ROAD OR ANY OTHER CARRIER UNLESS SPECIFIC
          CONTRARY INSTRUCTIONS ARE GIVEN HEREON BY THE SHIPPER, AND SHIPPER
          AGREES THAT THE SHIPMENT MAY BE CARRIED VIA INTERMEDIATE STOPPING
          PLACES WHICH THE CARRIER DEEMS APPROPRIATE. THE SHIPPERS ATTENTION IS
          DRAWN TO THE NOTICE CONCERNING CARRIERS LIMITATION OF LIABILITY.
          <Text style={{ fontSize: 7 }}>
            Shipper may increase such limitation of liability by declaring a
            higher value for carriage and paying a supplemental charge if
            required.
          </Text>
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          height: 40,

          borderBottom: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "black",
        }}
      >
        <View
          style={{
            width: "15%",
            height: 40,
            borderRight: 1,
          }}
        >
          <Text
            style={{
              fontSize: 7,
              fontFamily: "Courier-Bold",
              borderBottom: 1,
              textAlign: "center",
            }}
          >
            Currency
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 9,
              textAlign: "center",
            }}
          >
            {jobInfo.Currency}
          </Text>
        </View>
        <View style={{ width: "15%", height: 40, borderRight: 1 }}>
          <Text
            style={{
              fontSize: 9,
              fontFamily: "Courier-Bold",
              borderBottom: 1,
              textAlign: "center",
            }}
          >
            Chgs Code
          </Text>
          <Text
            style={{
              fontSize: 9,
              fontFamily: "Courier-Bold",
              textAlign: "center",
            }}
          >
            {jobInfo.ChargesCode}
          </Text>
        </View>
        <View style={{ width: "20%", height: 40, borderRight: 1 }}>
          <View>
            <Text
              style={{
                fontSize: 9,
                fontFamily: "Courier-Bold",
                textAlign: "center",
              }}
            >
              Wt/Val
            </Text>
            <View
              style={{
                flexDirection: "row",
                borderBottom: 1,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 7,
                  borderRightColor: "black",
                  borderRightWidth: 1,
                  paddingRight: 2,
                  fontFamily: "Courier-Bold",
                  textAlign: "center",
                }}
              >
                PPD
              </Text>{" "}
              <Text
                style={{
                  fontSize: 7,
                  paddingLeft: 1,
                  fontFamily: "Courier-Bold",
                  textAlign: "center",
                }}
              >
                COLL
              </Text>
            </View>
          </View>
          <View style={{ height: "40%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 7,
                  textAlign: "left",
                  fontFamily: "Courier-Bold",
                  borderRightWidth: 1,
                  height: "100%",
                  paddingRight: 1,
                }}
              >
                {jobInfo.WVPPD}
              </Text>{" "}
              <Text
                style={{
                  fontSize: 7,
                  fontFamily: "Courier-Bold",
                  paddingLeft: 1,
                  height: "100%",
                }}
              >
                {jobInfo.WVColl}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "20%", height: 40, borderRight: 1 }}>
          <View>
            <Text
              style={{
                fontSize: 9,
                fontFamily: "Courier-Bold",
                textAlign: "center",
              }}
            >
              Other
            </Text>
            <View
              style={{
                flexDirection: "row",
                borderBottom: 1,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 7,
                  borderRightColor: "black",
                  borderRightWidth: 1,
                  fontFamily: "Courier-Bold",
                  paddingRight: 2,
                }}
              >
                PPD
              </Text>{" "}
              <Text
                style={{
                  fontSize: 7,
                  fontFamily: "Courier-Bold",
                  paddingLeft: 1,
                }}
              >
                COLL
              </Text>
            </View>
          </View>
          <View style={{ height: "40%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 7,
                  borderRightColor: "black",
                  fontFamily: "Courier-Bold",
                  paddingRight: 1,
                }}
              >
                {jobInfo.OtherPPD}
              </Text>
              <Text
                style={{
                  fontSize: 7,
                  fontFamily: "Courier-Bold",
                  borderLeft: 1,
                  height: "100%",
                  paddingLeft: 2,
                }}
              >
                {jobInfo.OtherColl}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "15%", borderRight: 1 }}>
          <Text
            style={{
              fontSize: 7,
              fontFamily: "Courier-Bold",
              borderBottom: 1,
              textAlign: "center",
            }}
          >
            Declared Value for Carriage
          </Text>{" "}
          <Text
            style={{
              fontSize: 8,
              marginTop: 3,
              fontFamily: "Courier-Bold",
              textAlign: "center",
            }}
          >
            {jobInfo.DeclaredValCarriage}
          </Text>
        </View>
        <View style={{ width: "15%" }}>
          <Text
            style={{
              fontSize: 7,
              fontFamily: "Courier-Bold",
              borderBottom: 1,
              textAlign: "center",
            }}
          >
            Declared Value for Customs
          </Text>
          <Text
            style={{
              fontSize: 8,
              marginTop: 3,
              fontFamily: "Courier-Bold",
              textAlign: "center",
            }}
          >
            {jobInfo.DeclaredValCustoms}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 28,
          borderBottom: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "black",
        }}
      >
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Reference Number
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 9 }}>
            {jobInfo.ReferenceNumber}
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 6,
            }}
          >
            Optional Shipping Information
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 9 }}>
            {jobInfo.othershippingDetails}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          height: 60,
          borderBottom: 1,
          justifyContent: "space-between",
          borderBottomColor: "black",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 6,

              fontFamily: "Courier-Bold",
            }}
          >
            Insurance Information
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 8,
            }}
          >
            {jobInfo.AmountInsurance}
          </Text>
        </View>

        <Text style={{ fontSize: 6, fontFamily: "Courier-Bold" }}>
          INSURANCE - If Carrier offers insurance, and such insurance is
          requested in accordance with the conditions thereof, indicate amount
          to be insured in figures in box marked 'Amount of Insurance'
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          height: 28,
          borderBottom: 1,
          justifyContent: "space-between",
          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 6,
          }}
        >
          Requested Flight / Date
        </Text>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 9,
          }}
        >
          {jobInfo.RequestedFlight}
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          paddingHorizontal: 1,
          height: 35,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "black",
        }}
      >
        <View
          style={{ borderRight: 1, width: "15%", height: "100%", padding: 0 }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            To
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 9,
            }}
          >
            {jobInfo.firstTo}
          </Text>
        </View>
        <View style={{ borderRight: 1, width: "15%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            By First Carrier
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 9,
            }}
          >
            {jobInfo.Byfirstcarrier}
          </Text>
        </View>
        <View style={{ borderRight: 1, width: "15%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            To
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 9,
            }}
          >
            {jobInfo.secondTo}
          </Text>
        </View>
        <View style={{ borderRight: 1, width: "15%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            By
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 9,
            }}
          >
            {jobInfo.secondBy}
          </Text>
        </View>
        <View style={{ borderRight: 1, width: "15%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            To
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 9,
            }}
          >
            {jobInfo.thirdTo}
          </Text>
        </View>{" "}
        <View style={{ width: "15%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            By
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 9,
            }}
          >
            {jobInfo.thirdBy}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles2 = StyleSheet.create({
  container: {
    marginVertical: 1,
    flexDirection: "row",
    borderColor: "navy",
    color: "black",
    borderWidth: 1,
    alignItems: "center",
    textAlign: "center",
    flexGrow: 1,
    flexWrap: "nowrap",
    fontWeight: "heavy",
    height: 20,
    width: "100%",
    fontFamily: "Courier-Bold",
    fontSize: 9,
  },
  description: {
    width: "20%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 8,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
  },
  qty: {
    width: "15%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 6,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
  },
  rate: {
    width: "20%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 8,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
  },
  amount: {
    width: "15%",
    fontSize: 8,
    fontWeight: "heavy",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontFamily: "Courier-Bold",
  },
});

const InvoiceTableHeader = () => (
  <View style={styles2.container} wrap={false}>
    <Text style={styles2.description}>No Of Pieces RCP</Text>
    <Text style={styles2.amount}>Gross Weight</Text>
    <Text style={styles2.amount}>Unit</Text>
    <Text style={styles2.amount}>Rate Class</Text>
    <Text style={styles2.qty}>Chargeable Weight</Text>
    <Text style={styles2.qty}>Rate/Charge</Text>
    <Text style={[styles2.qty, { borderRight: 0, padding: 0, width: "20%" }]}>
      Nature Of Goods
      <Text style={{ fontSize: 6 }}>(Including Dimensions Or Volume)</Text>
    </Text>
  </View>
);

function Column3({ jobInfo }: { jobInfo: cargoInfo & AirwayBillInquiry }) {
  const TotalPPd =
    parseInt(jobInfo.PPDWeight ?? "0") +
    parseInt(jobInfo.PPDValuation ?? "0") +
    parseInt(jobInfo.PPDTax ?? "0") +
    parseInt(jobInfo.PPDOtherDueAgent ?? "0") +
    parseInt(jobInfo.PPDOtherDueCarrier ?? "0");
  const TotalColl =
    parseInt(jobInfo.CollWeight ?? "0") +
    parseInt(jobInfo.CollValuation ?? "0") +
    parseInt(jobInfo.CollTax ?? "0") +
    parseInt(jobInfo.CollOtherDueAgent ?? "0") +
    parseInt(jobInfo.CollOtherDueCarrier ?? "0");
  return (
    <View
      style={{
        width: "50%",
        fontFamily: "Courier-Bold",
      }}
      wrap={false}
    >
      <View
        style={{
          borderRight: 1,
          borderColor: "black",
          width: "100%",
          minHeight: 30,
          borderBottomColor: "black",

          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "100%" }}>
          <View style={{ flexDirection: "column" }}>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={{ width: "50%", borderRight: 1 }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    borderBottom: 1,
                    textAlign: "center",
                    fontSize: 7,
                  }}
                >
                  Prepaid
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    borderBottom: 1,
                    textAlign: "center",
                    fontSize: 7,
                  }}
                >
                  Collect
                </Text>
              </View>
            </View>
            <View style={{ height: 20, borderBottom: 1 }}>
              <Text
                style={{
                  fontFamily: "Courier-Bold",
                  textAlign: "center",
                  width: "50%",
                  alignSelf: "center",
                  fontSize: 7,
                }}
              >
                Weight Charges
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  height: "100%",
                }}
              >
                <View style={{ width: "50%", borderRight: 1 }}>
                  <Text
                    style={{
                      fontSize: 8,
                      textAlign: "center",
                      fontFamily: "Courier-Bold",
                    }}
                  >
                    {jobInfo.PPDWeight}
                  </Text>
                </View>

                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      fontSize: 8,
                      textAlign: "center",
                      fontFamily: "Courier-Bold",
                    }}
                  >
                    {jobInfo.CollWeight}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: 20, borderBottom: 1 }}>
              <Text
                style={{
                  fontFamily: "Courier-Bold",
                  textAlign: "center",

                  width: "50%",
                  alignSelf: "center",
                  fontSize: 8,
                }}
              >
                Valuation Charges
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  height: "100%",
                }}
              >
                <View style={{ width: "50%", borderRight: 1 }}>
                  <Text
                    style={{
                      fontSize: 8,
                      textAlign: "center",
                      fontFamily: "Courier-Bold",
                    }}
                  >
                    {jobInfo.PPDValuation}
                  </Text>
                </View>

                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      fontSize: 8,
                      textAlign: "center",
                      fontFamily: "Courier-Bold",
                    }}
                  >
                    {jobInfo.CollValuation}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: 20, borderBottom: 1 }}>
              <Text
                style={{
                  fontFamily: "Courier-Bold",
                  textAlign: "center",

                  width: "50%",
                  alignSelf: "center",
                  fontSize: 8,
                }}
              >
                Tax
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  height: "100%",
                }}
              >
                <View style={{ width: "50%", borderRight: 1 }}>
                  <Text
                    style={{
                      fontSize: 8,

                      textAlign: "center",
                      fontFamily: "Courier-Bold",
                    }}
                  >
                    {jobInfo.PPDTax}
                  </Text>
                </View>

                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      fontSize: 8,

                      fontFamily: "Courier-Bold",
                      textAlign: "center",
                    }}
                  >
                    {jobInfo.CollTax}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: 20, borderBottom: 1 }}>
              <Text
                style={{
                  fontFamily: "Courier-Bold",
                  textAlign: "center",
                  fontSize: 7,

                  width: "50%",
                  alignSelf: "center",
                }}
              >
                Total Other Charges Due Agent
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  height: "100%",
                }}
              >
                <View style={{ width: "50%", borderRight: 1 }}>
                  <Text
                    style={{
                      fontSize: 8,

                      textAlign: "center",
                      fontFamily: "Courier-Bold",
                    }}
                  >
                    {jobInfo.PPDOtherDueAgent}
                  </Text>
                </View>

                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      fontSize: 8,

                      textAlign: "center",
                      fontFamily: "Courier-Bold",
                    }}
                  >
                    {jobInfo.CollOtherDueAgent}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: 26, borderBottom: 1 }}>
              <Text
                style={{
                  fontFamily: "Courier-Bold",
                  textAlign: "center",
                  fontSize: 7,

                  width: "50%",
                  alignSelf: "center",
                }}
              >
                Total Other Charges Due Carrier
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",

                  height: "100%",
                }}
              >
                <View style={{ width: "50%", borderRight: 1 }}>
                  <Text
                    style={{
                      fontSize: 8,
                      textAlign: "center",
                      fontFamily: "Courier-Bold",
                    }}
                  >
                    {jobInfo.PPDOtherDueCarrier}
                  </Text>
                </View>

                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      fontSize: 8,
                      textAlign: "center",
                      fontFamily: "Courier-Bold",
                    }}
                  >
                    {jobInfo.CollOtherDueCarrier}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: 20, borderBottom: 1, flexDirection: "row" }}>
              <View style={{ width: "50%", borderRight: 1 }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",

                    fontSize: 8,
                  }}
                >
                  Total Prepaid
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    textAlign: "center",
                    fontFamily: "Courier-Bold",
                  }}
                >
                  {TotalPPd}
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",

                    fontSize: 8,
                  }}
                >
                  Total Collect
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    textAlign: "center",
                    fontFamily: "Courier-Bold",
                  }}
                >
                  {TotalColl}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 20,
                borderBottom: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ width: "50%", borderRight: 1 }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",
                    fontSize: 8,
                  }}
                >
                  Currency Conversion Rate
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: "Courier-Bold",
                    textAlign: "center",
                  }}
                >
                  {jobInfo.CurrConv}
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",

                    fontSize: 7,
                  }}
                >
                  CC charges in Dest. Currency
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    fontFamily: "Courier-Bold",
                    textAlign: "center",
                  }}
                >
                  {jobInfo.CCChargesinDestCurr}
                </Text>
              </View>
            </View>

            <View style={{ height: 20, borderBottom: 1, flexDirection: "row" }}>
              <View style={{ width: "50%", borderRight: 1 }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",

                    fontSize: 7,
                  }}
                >
                  For Carriers Use Only At Destination
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",

                    fontSize: 7,
                  }}
                >
                  Charges at Destination
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          borderRight: 1,
          width: "100%",

          height: 25,
          //   flexDirection: "row",
          //   justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 5,
            }}
          >
            (For Carriers Use Only) *
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: "50%",
              borderRight: 1,
              height: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Courier-Bold",
                fontSize: 6,
              }}
            >
              Charges At Destination
            </Text>
          </View>
          <View style={{ width: "50%", height: "100%" }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",
                fontSize: 6,
                paddingLeft: 4,
              }}
            >
              Total Collect Charges
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function Column4({ jobInfo }: { jobInfo: cargoInfo & AirwayBillInquiry }) {
  return (
    <View
      style={{
        width: "50%",
      }}
    >
      <View
        style={{
          width: "100%",
          minHeight: 80,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          fontSize: 8,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 8 }}>
          Shipper certifies that the particulars on the face hereof are correct
          and that insofar as any part of the consignment contains dangerous
          goods, such part is properly described by name and is in proper
          condition for carriage by air according to the applicable Dangerous
          Goods Regulations.
        </Text>
        <Text
          style={{
            borderTopWidth: 1,
            borderStyle: "dashed",
            paddingVertical: 1,
          }}
        >
          Signature Of Shipper Or Agent
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 40,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          fontSize: 8,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            borderTopWidth: 1,
            borderStyle: "dashed",
            paddingVertical: 1,
          }}
        >
          Executed On Date
        </Text>
        <Text
          style={{
            borderTopWidth: 1,
            borderStyle: "dashed",
            paddingVertical: 1,
          }}
        >
          at Place
        </Text>
        <Text
          style={{
            borderTopWidth: 1,
            borderStyle: "dashed",
            paddingVertical: 1,
          }}
        >
          Signature Of Issuing Carrier or its Agent
        </Text>
      </View>
    </View>
  );
}

const styles3 = StyleSheet.create({
  container: {
    flexDirection: "row",
    color: "black",
    alignItems: "center",
    textAlign: "center",
    flexGrow: 1,
    flexWrap: "nowrap",
    fontWeight: "heavy",
    minHeight: 20,
    width: "100%",
    border: 1,
  },
  description: {
    width: "20%",
    borderRightColor: "navy",

    fontSize: 8,
    fontWeight: "heavy",
    textAlign: "left",
  },
  qty: {
    width: "15%",
    borderRightColor: "navy",

    fontSize: 8,
    fontWeight: "heavy",
    textAlign: "left",
  },
  rate: {
    width: "20%",
    borderRightColor: "navy",

    fontSize: 8,
    textAlign: "left",
    fontWeight: "heavy",
  },
  amount: {
    width: "15%",
    fontSize: 8,
    fontWeight: "heavy",
    borderRightColor: "navy",

    textAlign: "left",
  },
});
const InvoiceTableRow = ({ items }: { items: AirwayItem[] }) => {
  const rows = items.map((item: AirwayItem, index) => (
    <View
      style={[styles3.container, { borderTop: 0 }]}
      key={index}
      wrap={false}
    >
      <Text style={styles3.description}>{item.NoPieces}</Text>
      <Text style={styles3.amount}>{item.GrossWeight}</Text>
      <Text style={styles3.amount}>{item.Unit}</Text>
      <Text style={styles3.amount}>{item.Rate}</Text>
      <Text style={styles3.qty}>{item.ChargeableWeight}</Text>
      <Text style={styles3.qty}>{item.RatePerCharge}</Text>
      <Text style={styles3.qty}>{item.NatureOfGoods}</Text>
    </View>
  ));
  return <>{rows}</>;
};
