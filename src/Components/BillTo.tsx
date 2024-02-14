import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import useinvoiceStore from "../store/Invoice";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    border: 1,
    borderWidth: 1,
    borderColor: "blue",
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

const BillTo = ({ jobInfo }: { jobInfo: Inquiry & cargoInfo }) => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          ...styles.singleContainer,
        }}
      >
        <Text style={styles.singleText}>
          <Text
            style={{
              fontStyle: "italic",
              color: "dodgerblue",
            }}
          >
            Billed To ,
          </Text>{" "}
          {jobInfo.CustomerName}
        </Text>
        <Text style={styles.singleText}>{jobInfo.CustomerAddress}</Text>
        <Text style={styles.singleText}>{jobInfo.CustomerPhoneNo}</Text>
        <Text style={styles.singleText}>{jobInfo.CustomerEmail}</Text>
      </View>
      <View style={styles.singleContainer}>
        <Text style={styles.singleText}>
          <Text
            style={{
              fontStyle: "italic",
              color: "dodgerblue",
            }}
          >
            TRN No:
          </Text>
          {jobInfo.CustomerTRN}
        </Text>
        {/* <Text style={styles.singleText}>Status {jobInfo.company}</Text> */}
        <Text style={styles.singleText}>
          <Text
            style={{
              fontStyle: "italic",
              color: "dodgerblue",
            }}
          >
            Job Id :{" "}
          </Text>{" "}
          {jobInfo.Jobid}{" "}
        </Text>
        <Text style={styles.singleText}>
          <Text
            style={{
              fontStyle: "italic",
              color: "dodgerblue",
            }}
          >
            Transit Time :{" "}
          </Text>{" "}
          {jobInfo.TransitTime}{" "}
        </Text>
      </View>
    </View>
  );
};

export default BillTo;
