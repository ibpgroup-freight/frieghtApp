import {
  PDFViewer,
  Document,
  Page,
  StyleSheet,
  View,
  Text,
} from "@react-pdf/renderer";
import React from "react";
import useinvoiceStore from "../store/Invoice";

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
  const { Items, jobInfo } = useinvoiceStore();
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
            <Column1 jobInfo={jobInfo} />
            <Column2 jobInfo={jobInfo} />
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
            <InvoiceTableRow items={Items} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Column3 jobInfo={jobInfo} />
            <Column4 jobInfo={jobInfo} />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default BillOfLaddle;

function Column1({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
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
        <Text>Shipper Details</Text>
        <Text>
          XYZ {"\n"}
          XYZ Location {"\n"}
          XXXXXXXXXXXX Number
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
        <Text>Consignee</Text>
        <Text>
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
        <Text>Notify Address</Text>
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
        <Text>Vessel</Text>
        <Text>
          {jobInfo.VesselName ||
            jobInfo.VehicleDetails ||
            jobInfo.FlightInformation}
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
        <Text>Port Of Loading</Text>
        <Text>
          {jobInfo.PortOfOrigin ||
            jobInfo.AirportOfOrigin ||
            jobInfo.PlaceOfOrigin}
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
        <Text>Port Of Discharge</Text>
        <Text>
          {jobInfo.PortOfDestination ||
            jobInfo.AirportOfDestination ||
            jobInfo.PlaceOfDestination}
        </Text>
      </View>
    </View>
  );
}

function Column2({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
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
        <Text>Logo</Text>
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
        <Text>Export Reference</Text>
      </View>{" "}
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
        <Text>Forwarding Agent</Text>
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
        <Text>Consignee Reference</Text>
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
        <Text>Place Of Receipt</Text>
        {/* <Text>{jobInfo.SalesPerson}</Text> */}
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
        <Text>Place Of Delivery</Text>
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
  },
  description: {
    width: "30%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
  },
  qty: {
    width: "20%",
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
    width: "10%",
    fontSize: 10,
    fontWeight: "heavy",
  },
});

const InvoiceTableHeader = () => (
  <View style={styles2.container}>
    <Text style={styles2.description}>Item Description</Text>
    <Text style={styles2.qty}>Qty</Text>
    <Text style={styles2.rate}>Unit Price</Text>
    <Text style={styles2.amount}>Toal Amount</Text>
  </View>
);

function Column3({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
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
        <Text>Movement</Text>
        <Text>Currency</Text>
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
        <Text>Charge</Text>
        <Text>Rate</Text>
        <Text>Basis</Text>
        <Text>P/C</Text>
        <Text>Amount</Text>
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
        }}
      >
        <Text>Payable At</Text>
      </View>
    </View>
  );
}

function Column4({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) {
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
        <Text>Place Of Issue</Text>
      </View>
    </View>
  );
}

const styles3 = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "navy",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    alignItems: "center",
    textAlign: "center",
    fontStyle: "ultrabold",
    flexGrow: 1,
    flexWrap: "nowrap",
    height: 18,
    width: "100%",
  },
  description: {
    width: "30%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 8,
    fontWeight: "ultrabold",
  },
  qty: {
    width: "20%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 9,
    fontWeight: "ultrabold",
  },
  rate: {
    width: "20%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 9,
    fontWeight: "light",
  },
  amount: {
    width: "10%",
    fontSize: 9,
    fontWeight: "bold",
  },
});
const InvoiceTableRow = ({ items }: { items: QuotationItem[] }) => {
  const rows = items.map((item: QuotationItem, index) => (
    <View style={styles3.container} key={item.id} break={index === 20}>
      <Text style={styles3.description}>{item.ChargeDescription}</Text>
      <Text style={styles3.qty}>{item.Units}</Text>
      <Text style={styles3.rate}>
        {item.Charges} {item.Currency}
      </Text>
      <Text style={styles3.amount}>
        {(parseInt(item.Units) * parseInt(item.Charges)).toFixed(2)}{" "}
        {item.Currency}
      </Text>
    </View>
  ));
  return <>{rows}</>;
};
