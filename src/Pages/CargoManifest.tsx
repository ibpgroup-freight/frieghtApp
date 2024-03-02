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

function CargoManifest() {
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
          <ManifestHeader />
          <PresentationHeader />
          <TableHeader />
          <Table />
        </Page>
      </Document>
    </PDFViewer>
  );
}

function ManifestHeader() {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 30,
        flexDirection: "row",
      }}
    >
      <View style={{ width: "50%" }}>
        <Image
          source={logo}
          style={{ width: "50%", height: 50, objectFit: "contain" }}
        />
      </View>
      <View style={{ width: "50%" }}>
        <Text style={{ fontFamily: "Courier-Bold" }}>Testing Place</Text>
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
      }}
    >
      <View style={{ width: "50%", alignItems: "center" }}>
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
        }}
      >
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 19 }}>
          Cargo Manifest
        </Text>
      </View>
      <View style={{ width: "50%", alignItems: "center" }}>
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
        height: 90,
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        borderWidth: 2,
      }}
    >
      <View style={{ width: "50%" }}></View>
      <View style={{ width: "50%", paddingLeft: 5, alignItems: "flex-start" }}>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            textAlign: "center",
            fontWeight: "ultralight",
          }}
        >
          Consolidation{" "}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          M.A.W.B{" "}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          Flights{" "}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          Date{" "}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            From{" "}
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            To{" "}
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
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        H.A.W.B
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        Parcels Weight
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        Description
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        Shipper/Consignee
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        Charges
      </Text>
      <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
        Collect
      </Text>
    </View>
  );
}
export default CargoManifest;
