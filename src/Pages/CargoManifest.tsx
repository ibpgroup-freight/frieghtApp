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
  const { ManifestItems, ladleInfo, manifestInfo } = useinvoiceStore();
  const { Location } = useCompanyInfo();
  console.log("loca", Location);
  const companyLocation = Location.find(
    (l) => l.key === manifestInfo.officeAddress
  );
  console.log("loca2", ManifestItems);
  const Total = ManifestItems?.reduce(
    (acc: number, item: CargoManifestItems) => {
      acc = acc + parseInt(item.Charges) - parseInt(item.Collect);
      return acc;
    },
    0
  );
  const [isSaving, setisSaving] = useState<boolean>(false);

  const handleSavePdf = async () => {
    try {
      const myDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <ManifestHeader manifestInfo={manifestInfo} />
            <PresentationHeader />
            <TableHeader
              manifestInfo={manifestInfo}
              companyLocation={companyLocation!}
            />
            <Table manifestItems={ManifestItems} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginVertical: 10,
              }}
            >
              <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
                Total {Total}
              </Text>
            </View>
          </Page>
        </Document>
      );
      setisSaving(true);

      const doc = pdf(myDoc);
      const blob = await doc.toBlob();
      const jref = ref(
        storage,
        `${manifestInfo.Jobid || "Test"}/CargoManifest.pdf`
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
            <ManifestHeader manifestInfo={manifestInfo} />
            <PresentationHeader />
            <TableHeader
              manifestInfo={manifestInfo}
              companyLocation={companyLocation!}
            />
            <Table manifestItems={ManifestItems} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginVertical: 10,
              }}
            >
              <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
                Total {Total}
              </Text>
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

function ManifestHeader({
  manifestInfo,
}: {
  manifestInfo: CargoManifestInquiry;
}) {
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
        <Text style={{ fontFamily: "Courier-Bold" }}>
          {manifestInfo.HeaderAddress}
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

function TableHeader({
  manifestInfo,
  companyLocation,
}: {
  manifestInfo: CargoManifestInquiry;
  companyLocation: CompanyLocationInfo;
}) {
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
        gap: 30,
      }}
    >
      <View style={{ width: "50%", alignItems: "flex-start" }}>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            textAlign: "left",
            fontWeight: "ultralight",
          }}
        >
          {companyLocation?.name}
        </Text>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            textAlign: "left",
            fontWeight: "ultralight",
          }}
        >
          {companyLocation?.location}
        </Text>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            textAlign: "left",
            fontWeight: "ultralight",
          }}
        >
          {companyLocation?.office}
        </Text>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            textAlign: "left",
            fontWeight: "ultralight",
          }}
        >
          {companyLocation?.telephone}
        </Text>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            textAlign: "left",
            fontWeight: "ultralight",
          }}
        >
          {companyLocation?.country}
        </Text>
      </View>
      <View
        style={{
          width: "50%",
          paddingLeft: 5,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-Bold",
            textAlign: "center",
            fontWeight: "ultralight",
          }}
        >
          Consolidation {"       "} {manifestInfo.Consolidation}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          M.A.W.B {"       "} {manifestInfo.MAWB}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          Flights {"       "} {manifestInfo.Flights}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          Date {"       "} {manifestInfo.Date}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            From {"    "} {manifestInfo.From} {"  "}
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
            To {"    "} {manifestInfo.To}
          </Text>
        </View>
      </View>
    </View>
  );
}

function Table({ manifestItems }: { manifestItems: CargoManifestItems[] }) {
  return (
    <View>
      <HeaderItems />
      <TableRows manifestItems={manifestItems} />
    </View>
  );
}
function TableRows({ manifestItems }: { manifestItems: CargoManifestItems[] }) {
  if (!manifestItems) return null;

  const rows = manifestItems?.map((i, ind) => (
    <View style={{ flexDirection: "column" }} key={ind}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          {i.HAWB}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          {i.ParcelsWeight}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          {i.Description}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          {i.Shipper}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          {i.Charges}
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", textAlign: "center" }}>
          {i.Collect}
        </Text>
      </View>
    </View>
  ));
  return <>{rows}</>;
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
