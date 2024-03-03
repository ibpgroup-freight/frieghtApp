import {
  PDFViewer,
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import React from "react";
import useinvoiceStore from "../store/Invoice";
import useCompanyInfo from "../store/CompanyInfo";
import logo from "../assets/images/Logo.png";

function ProofOfDelivery() {
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
      paddingVertical: 20,
    },
    logo: {
      width: 74,
      height: 66,
    },
  });
  const { PODInfo, PODItems } = useinvoiceStore();
  const { Location } = useCompanyInfo();
  const companyLocation = Location.find((l) => l.key === PODInfo.officeAddress);

  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <PageHeader />
          <PresentationHeader />
          <Table />
          <TableRows podItems={PODItems} />

          <TableHeader podInfo={PODInfo} />
          <PageFooter companyInfo={companyLocation!} />
        </Page>
      </Document>
    </PDFViewer>
  );
}

function PageHeader() {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "center",
        borderBottom: 1,
        borderBottomWidth: 2,
      }}
    >
      <View style={{ width: "20%" }}>
        <Image
          source={logo}
          style={{ width: "50%", height: 50, objectFit: "contain" }}
        />
      </View>
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 20,
            textAlign: "left",
          }}
        >
          IBP Cargo Services LLC
        </Text>
      </View>
    </View>
  );
}

function PresentationHeader() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        height: 70,
        marginVertical: 5,
      }}
    >
      <View style={{ width: "25%", alignItems: "center" }}>
        <Text
          render={({ totalPages, pageNumber }) => (
            <Text style={{ fontFamily: "Courier-Bold" }}>
              Page : {pageNumber}/{totalPages}
            </Text>
          )}
        />
      </View>
      <View
        style={{
          width: "50%",
          border: 1,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "flex-start",
          height: "100%",
          borderWidth: 2,
          padding: 4,
        }}
      >
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 19 }}>
          Proof Of Delivery
        </Text>
      </View>
      <View style={{ width: "25%", alignItems: "center" }}>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          Date: {new Date().toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

function TableHeader({ podInfo }: { podInfo: ProofOfDeliveryInquiry }) {
  return (
    <View
      style={{
        border: 1,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        borderWidth: 2,
      }}
    >
      <View style={{ width: "50%", paddingLeft: 5, alignItems: "flex-start" }}>
        <View
          style={{ minHeight: 35, flexDirection: "row", gap: 30 }}
          wrap={false}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              textAlign: "center",
              fontSize: 13,
              fontWeight: "ultralight",
            }}
          >
            Job No
          </Text>
          <Text style={{ fontFamily: "Courier" }}> {podInfo.JobNo}</Text>
        </View>
        <View
          style={{ minHeight: 35, flexDirection: "row", gap: 30 }}
          wrap={false}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            Description
          </Text>
          <Text style={{ fontFamily: "Courier" }}> {podInfo.Description}</Text>
        </View>
        <View
          style={{ minHeight: 35, flexDirection: "row", gap: 30 }}
          wrap={false}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            Transporter
          </Text>
          <Text style={{ fontFamily: "Courier" }}> {podInfo.Transporter}</Text>
        </View>
        <View
          style={{ minHeight: 35, flexDirection: "row", gap: 30 }}
          wrap={false}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            Shipper
          </Text>
          <Text style={{ fontFamily: "Courier" }}>{podInfo.Shipper}</Text>
        </View>
        <View
          style={{ minHeight: 35, flexDirection: "row", gap: 30 }}
          wrap={false}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            Delivery To
          </Text>
          <Text style={{ fontFamily: "Courier" }}> {podInfo.DeliveryTo}</Text>
        </View>
        <View
          style={{ minHeight: 35, flexDirection: "row", gap: 30 }}
          wrap={false}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            Contact Person
          </Text>
          <Text style={{ fontFamily: "Courier" }}>
            {" "}
            {podInfo.ContactPerson}
          </Text>
        </View>

        <View
          style={{ minHeight: 35, flexDirection: "row", gap: 30 }}
          wrap={false}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            Delivery Date
          </Text>
          <Text style={{ fontFamily: "Courier" }}>{podInfo.DeliveryDate}</Text>
        </View>
        <View
          style={{ minHeight: 35, flexDirection: "row", gap: 30 }}
          wrap={false}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            Time
          </Text>
          <Text style={{ fontFamily: "Courier" }}>{podInfo.Time}</Text>
        </View>
        <View
          style={{ minHeight: 35, flexDirection: "row", gap: 30 }}
          wrap={false}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            Receiver Name And Signature
          </Text>
          <Text style={{ fontFamily: "Courier" }}>
            {podInfo.ReceiverNameAndSignature}
          </Text>
        </View>
        <View
          style={{ minHeight: 35, flexDirection: "row", gap: 30 }}
          wrap={false}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            Mobile Number
          </Text>
          <Text style={{ fontFamily: "Courier" }}>{podInfo.MobileNumber}</Text>
        </View>
        <View
          style={{ minHeight: 35, flexDirection: "row", gap: 30 }}
          wrap={false}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            Company Stamp
          </Text>
          <Text style={{ fontFamily: "Courier" }}>{podInfo.CompanyStamp}</Text>
        </View>
        <View
          style={{ minHeight: 35, flexDirection: "row", gap: 30 }}
          wrap={false}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            Remarks (If any)
          </Text>
          <Text style={{ fontFamily: "Courier" }}>{podInfo.Remarks}</Text>
        </View>
      </View>
    </View>
  );
}

function Table() {
  return (
    <View>
      <HeaderItems />
    </View>
  );
}
function HeaderItems() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        alignSelf: "center",
        width: "80%",
        border: 1,
        padding: 5,
      }}
    >
      <Text
        style={{
          fontFamily: "Courier-Bold",
          textDecoration: "underline",
          textAlign: "center",
        }}
      >
        M.A.W.B
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        H.A.W.B No
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        No Of Packages
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        Weight
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        CBM
      </Text>
    </View>
  );
}
function TableRows({ podItems }: { podItems: ProofOfDeliveryItems[] }) {
  const rows = podItems?.map((i, ind) => (
    <View
      key={ind}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        width: "80%",
        border: 1,
        padding: 5,
      }}
      wrap={false}
    >
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        {i.MAWB}
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        {i.HAWBNo}
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        {i.NoOfPackages}
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        {i.Weight}
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        {i.CBM}
      </Text>
    </View>
  ));
  return <>{rows}</>;
}

function PageFooter({ companyInfo }: { companyInfo: CompanyLocationInfo }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 10,
        width: "80%",
        flexDirection: "column",
        borderTopWidth: 3,
        height: 80,
        borderTop: 2,
        alignSelf: "center",
        justifyContent: "center",
      }}
      fixed
    >
      <View>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          License No{" "}
        </Text>
      </View>
      <View>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          Office {companyInfo?.office}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          P.O Box {companyInfo?.pobox}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          Country {companyInfo?.country}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          Office Telephone {companyInfo?.telephone}
        </Text>
      </View>
    </View>
  );
}
export default ProofOfDelivery;
