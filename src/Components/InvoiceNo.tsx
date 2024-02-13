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
  },
});

const InvoiceNo = ({ jobInfo }: { jobInfo: cargoInfo }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
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
        <Text style={styles.singleText}>Date: {jobInfo?.TodaysDate} </Text>
        <Text style={styles.singleText}>
          Served By: {jobInfo?.SalesPerson}{" "}
        </Text>
        <Text style={styles.singleText}>Origin: {jobInfo?.PortOfOrigin} </Text>
        <Text style={styles.singleText}>
          Destination: {jobInfo?.PortOfDestination}{" "}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceNo;
