import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import useInquiryItem from "../store/Inquiry";
import useinvoiceStore from "../store/Invoice";

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
  },
  invoiceDateContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
    justifyContent: "flex-start",
  },
  label: {
    width: 60,
  },
  singleItemContainer: {
    width: "50%",
  },
  singleText: {
    // borderWidth: 1,
    // borderColor: "black",
    paddingHorizontal: 4,
    fontSize: 8,
    color: "black",
  },
});

const InvoiceNo = ({ jobInfo }: { jobInfo: cargoInfo & Inquiry }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
        backgroundColor: "gainsboro",
        marginVertical: 4,
        borderWidth: 1,
        borderColor: "dimgrey",
      }}
    >
      <View style={styles.singleItemContainer}>
        <Text style={styles.singleText}>ABC Cargo Servies</Text>
        <Text style={{ ...styles.singleText }}>ABC CITY , ABC Country</Text>
        <Text style={{ ...styles.singleText }}>TEL: XXXXXXXXXX </Text>
        <Text style={{ ...styles.singleText }}>PO- XXXX</Text>
        <Text style={{ ...styles.singleText }}>TRN NO: XXXXXXXXXXXXXX </Text>
      </View>
      <View style={styles.singleItemContainer}>
        <Text style={styles.singleText}>
          Invoice No: {Math.floor(Math.random() + Date.now())}
        </Text>
        <Text style={styles.singleText}>
          Todays Date:{" "}
          {new Date().getFullYear() +
            "-" +
            new Date().getMonth() +
            "-" +
            new Date().getDate()}
        </Text>
        <Text style={styles.singleText}>
          Served By:
          {jobInfo?.SalesPerson}
        </Text>
        <Text style={styles.singleText}>
          Origin:
          {jobInfo.type?.includes("sea") || jobInfo.type?.includes("Sea")
            ? jobInfo?.PortOfOrigin
            : jobInfo.type?.includes("air") || jobInfo.type?.includes("Air")
            ? jobInfo.AirportOfOrigin
            : jobInfo.PlaceOfOrigin}
        </Text>
        <Text style={styles.singleText}>
          Destination:
          {jobInfo.type?.includes("sea") || jobInfo.type?.includes("Sea")
            ? jobInfo?.PortOfDestination
            : jobInfo.type?.includes("air") || jobInfo.type?.includes("Air")
            ? jobInfo?.AirportOfDestination
            : jobInfo?.PlaceOfDestination}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceNo;
