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
    },
    logo: {
      width: 74,
      height: 66,
    },
  });
  const { Items, jobInfo, ladingItems, ladleInfo } = useinvoiceStore();
  const { Location } = useCompanyInfo();
  console.log("loca", Location);
  const companyLocation = Location.find((l) => l.key === ladleInfo.address);
  console.log("loca2", jobInfo);

  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <PageHeader />
          <PresentationHeader />
          <Table />
          <TableHeader />
          <TableFooter />
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

function TableHeader() {
  return (
    <View
      style={{
        border: 1,
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        borderWidth: 2,
      }}
    >
      <View style={{ width: "50%", paddingLeft: 5, alignItems: "flex-start" }}>
        <View>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textAlign: "center",
              fontWeight: "ultralight",
            }}
          >
            Job No
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            Description
          </Text>
        </View>
        <View>
          {" "}
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            Transporter
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            Shipper
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            Delivery To
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            Contact Person
          </Text>
        </View>

        <View>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            Delivery Date
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            Time
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            Receiver Name And Signature
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            Mobile Number
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            Company Stamp
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            Remarks (If any)
          </Text>
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
        marginVertical: 10,
        alignSelf: "center",
        width: "80%",
        border: 1,
        padding: 5,
      }}
    >
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
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

function TableFooter() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 10,
        width: "80%",
        flexDirection: "row",
        borderTopWidth: 3,
        padding: 20,
        height: 30,
        borderTop: 2,
        alignSelf: "center",
        justifyContent: "center",
      }}
      fixed
    >
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        License No{" "}
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        Office{" "}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          P.O Box{" "}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          Country{" "}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          Office Telephone{" "}
        </Text>
      </View>
    </View>
  );
}
export default ProofOfDelivery;
