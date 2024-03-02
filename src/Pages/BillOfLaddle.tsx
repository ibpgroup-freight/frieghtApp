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
    width: 74,
    height: 90,
  },
});
function BillOfLaddle() {
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
            }}
          >
            <Column1 jobInfo={ladleInfo} companyInfo={companyLocation!} />
            <Column2 jobInfo={ladleInfo} />
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
            <InvoiceTableRow items={ladingItems} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Column3 jobInfo={ladleInfo} />
            <Column4 jobInfo={ladleInfo} />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default BillOfLaddle;

function Column1({
  jobInfo,
  companyInfo,
}: {
  jobInfo: cargoInfo & ladleInquiry;
  companyInfo: CompanyLocationInfo;
}) {
  return (
    <View
      style={{
        width: "50%",
        borderLeft: 1,
        borderLeftColor: "black",
      }}
    >
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 100,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          borderTop: 1,
          borderTopColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Shipper Details
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 12 }}>
          {companyInfo?.name} {"\n"}
          {companyInfo?.office} {"\n"}
          {companyInfo?.location} {"\n"}
          {companyInfo?.country}
          {"\n"}
          {companyInfo?.office}
          {"\n"}
          TRN {companyInfo?.TRN}
          {"\n"}
          {companyInfo?.telephone}
          {"\n"}
          PO Box {companyInfo?.pobox}
          {"\n"}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 100,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Consignee
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 12 }}>
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
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 50,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Notify Address
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.NotifyAddress}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 40,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "50%", padding: 2 }}>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
            }}
          >
            Vessel
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
            {jobInfo.VesselName}
          </Text>
        </View>
        <View style={{ width: "50%", padding: 2 }}>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
            }}
          >
            Voyage Number
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
            {jobInfo.VesselName}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 40,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Port Of Loading
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.PortOfLoading}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 40,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Port Of Discharge
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.PortOfDischarge}
        </Text>
      </View>
    </View>
  );
}

function Column2({ jobInfo }: { jobInfo: cargoInfo & ladleInquiry }) {
  return (
    <View
      style={{
        width: "50%",
      }}
    >
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 50,
          borderBottom: 1,
          borderBottomColor: "black",
          borderTop: 1,
          borderTopColor: "black",
        }}
      >
        <Image style={styles.logo} src={logo} />
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 40,
          borderBottom: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "black",
        }}
      >
        <View
          style={{
            borderRightWidth: 1,
            borderRightColor: "black",
            padding: 2,
            width: "50%",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
            }}
          >
            Carriers Reference
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
            {jobInfo.ExportReference}
          </Text>
        </View>
        <View
          style={{
            width: "50%",
            padding: 2,
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
            }}
          >
            B/L No
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
            {jobInfo.ExportReference}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 40,

          borderBottom: 1,

          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Export Reference
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.ExportReference}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 80,

          borderBottom: 1,

          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Forwarding Agent
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.ForwardingAgent}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 80,

          borderBottom: 1,

          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Consignee Reference
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.ConsigneeReference}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 80,
          borderBottom: 1,

          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Place Of Receipt
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.PlaceOfReceipt}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 80,
          borderBottom: 1,

          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Place Of Delivery
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.PlaceOfDelivery}
        </Text>
      </View>
    </View>
  );
}
const styles2 = StyleSheet.create({
  container: {
    marginVertical: 4,
    flexDirection: "row",
    borderColor: "navy",
    color: "black",
    borderWidth: 1,
    alignItems: "center",
    textAlign: "center",
    flexGrow: 1,
    flexWrap: "nowrap",
    fontWeight: "heavy",
    minHeight: 20,
    width: "100%",
    fontFamily: "Courier-Bold",
    fontSize: 12,
  },
  description: {
    width: "25%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
  },
  qty: {
    width: "15%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
  },
  rate: {
    width: "20%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
  },
  amount: {
    width: "15%",
    fontSize: 10,
    fontWeight: "heavy",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontFamily: "Courier-Bold",
  },
});

const InvoiceTableHeader = () => (
  <View style={styles2.container} wrap={false}>
    <Text style={styles2.description}>Package Description</Text>
    <Text style={styles2.amount}>Container No.</Text>
    <Text style={styles2.amount}>Seal No.</Text>
    <Text style={styles2.amount}>No Of Packages</Text>
    <Text style={styles2.qty}>Dimensions</Text>
    <Text style={styles2.qty}>Weight</Text>
  </View>
);

function Column3({ jobInfo }: { jobInfo: cargoInfo & ladleInquiry }) {
  return (
    <View
      style={{
        width: "50%",
      }}
    >
      <View
        style={{
          border: 1,
          borderColor: "black",
          width: "100%",
          minHeight: 40,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "column", width: "50%" }}>
          <Text
            style={{
              fontSize: 7,
            }}
          >
            Total Containers Received By Carrier
          </Text>
          <Text
            style={{
              marginHorizontal: 4,
              fontFamily: "Courier-Bold",
              fontSize: 12,
            }}
          >
            {jobInfo.Movement}
          </Text>
        </View>
        <View style={{ flexDirection: "column", width: "50%" }}>
          <Text
            style={{
              fontSize: 7,
            }}
          >
            Packages Received By Carrier
          </Text>
          <Text
            style={{
              marginHorizontal: 4,
              fontFamily: "Courier-Bold",
              fontSize: 12,
            }}
          >
            {jobInfo.Currency}
          </Text>
        </View>
      </View>
      <View
        style={{
          border: 1,
          borderColor: "black",
          width: "100%",
          minHeight: 40,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
            }}
          >
            Movement
          </Text>
          <Text
            style={{
              marginHorizontal: 4,
              fontFamily: "Courier-Bold",
              fontSize: 12,
            }}
          >
            {jobInfo.Movement}
          </Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
            }}
          >
            Currency
          </Text>
          <Text
            style={{
              marginHorizontal: 4,
              fontFamily: "Courier-Bold",
              fontSize: 12,
            }}
          >
            {jobInfo.Currency}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 100,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "18%",
            padding: 1,
            borderRightWidth: 1,
            borderRightColor: "black",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
              fontSize: 8,
            }}
          >
            Charge
          </Text>
        </View>
        <View
          style={{
            width: "18%",
            padding: 1,
            borderRightWidth: 1,
            borderRightColor: "black",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
              fontSize: 8,
            }}
          >
            Rate
          </Text>
        </View>
        <View
          style={{
            width: "18%",
            padding: 1,
            borderRightWidth: 1,
            borderRightColor: "black",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
              fontSize: 8,
            }}
          >
            Basis
          </Text>
        </View>
        <View
          style={{
            width: "18%",
            padding: 1,
            borderRightWidth: 1,
            borderRightColor: "black",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
              fontSize: 8,
            }}
          >
            Wt/Vol/Val
          </Text>
        </View>
        <View
          style={{
            width: "18%",
            padding: 1,
            borderRightWidth: 1,
            borderRightColor: "black",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
              fontSize: 8,
            }}
          >
            P/C
          </Text>
        </View>
        <View
          style={{
            width: "18%",
            padding: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
              fontSize: 8,
            }}
          >
            Amount
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text style={{ fontSize: 8 }}>Total Freight Prepaid</Text>
        <Text style={{ fontSize: 8 }}>Total Freight Collected</Text>
        <Text style={{ fontSize: 8 }}>Total Freight</Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 20,
          borderWidth: 1,
          borderColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Payable At
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.PayableAt}
        </Text>
      </View>
    </View>
  );
}

function Column4({ jobInfo }: { jobInfo: cargoInfo & ladleInquiry }) {
  return (
    <View
      style={{
        width: "50%",
      }}
    >
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 170,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          fontSize: 8,
        }}
      >
        <Text>
          RECEIVED by the Carrier from the Shipper in apparent good order and
          condition (unless otherwise noted herein) the total number or quantity
          of Containers or other packages or units indicated in the box opposite
          entitled “Total No. of Containers/Packages received by the Carrier”
          for Carriage subject to all the terms and conditions hereof (INCLUDING
          THE TERMS AND CONDITIONS ON THE REVERSE HEREOF AND THE TERMS AND
          CONDITIONS OF THE CARRIER’S APPLICABLE TARIFF) from the Place of
          Receipt or the Port of Loading, whichever is applicable, to the Port
          of Discharge or the Place of Delivery, whichever is applicable.{"\n"}{" "}
          One original Bill of Lading, duly endorsed, must be surrendered by the
          Merchant to the Carrier in exchange for the Goods or a delivery order.
          In accepting this Bill of Lading the Merchant expressly accepts and
          agrees to all its terms and conditions whether printed, stamped or
          written, or otherwise incorporated, notwithstanding the non-signing of
          this Bill of Lading by the Merchant. IN WITNESS WHEREOF the number of
          original Bills of Lading stated below all of this tenor and date has
          been signed, one of which being accomplished the others to stand void.
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 30,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Place And Date Of Issue
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.PlaceOfIssue}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 30,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          flexDirection: "row",
        }}
      >
        <View style={{ width: "50%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
              fontSize: 8,
            }}
          >
            Freight Payable At
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
            {jobInfo.PlaceOfIssue}
          </Text>
        </View>
        <View style={{ width: "50%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
              fontSize: 8,
            }}
          >
            Number Of Original Bs/L
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
            {jobInfo.PlaceOfIssue}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles3 = StyleSheet.create({
  container: {
    marginVertical: 1,
    flexDirection: "row",
    color: "black",
    alignItems: "center",
    textAlign: "center",
    flexGrow: 1,
    flexWrap: "nowrap",
    fontWeight: "heavy",
    minHeight: 20,
    width: "100%",
  },
  description: {
    width: "25%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
  },
  qty: {
    width: "15%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
  },
  rate: {
    width: "20%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
  },
  amount: {
    width: "15%",
    fontSize: 10,
    fontWeight: "heavy",
    borderRightColor: "navy",
    borderRightWidth: 1,
  },
});
const InvoiceTableRow = ({ items }: { items: LadingItems[] }) => {
  const rows = items?.map((item: LadingItems, index) => (
    <View style={styles3.container} key={index} wrap={false}>
      <Text style={styles3.description}>{item.PackageDescription}</Text>
      <Text style={styles2.amount}>{item.ContainerNo}</Text>
      <Text style={styles2.amount}>{item.SealNo}</Text>
      <Text style={styles2.amount}>{item.NoOfPackages}</Text>
      <Text style={styles2.qty}>{item.Dimensions}</Text>
      <Text style={styles2.qty}>{item.NoOfPackages}</Text>
    </View>
  ));
  return <>{rows}</>;
};
