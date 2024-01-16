import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import useinvoiceStore from "../store/Invoice";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    border: 1,
    borderWidth: 1,
    borderColor: "black",
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
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 3,
    paddingHorizontal: 4,
    fontSize: 8,
  },
});

const BillTo = ({ jobInfo }: any) => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          ...styles.singleContainer,
          borderRight: 1,
          borderRightWidth: 1,
        }}
      >
        <Text style={styles.singleText}>Billed To {jobInfo.CustomerName}</Text>
        <Text style={styles.singleText}>{jobInfo.CustomerAddress}</Text>
        <Text style={styles.singleText}>{jobInfo.CustomerPhone}</Text>
        <Text style={styles.singleText}>{jobInfo.CustomerEmail}</Text>
      </View>
      <View style={styles.singleContainer}>
        <Text style={styles.singleText}>TRN No: {jobInfo.CustomerTRN}</Text>
        {/* <Text style={styles.singleText}>Status {jobInfo.company}</Text> */}
        <Text style={styles.singleText}>Job Id : {jobInfo.Jobid} </Text>
      </View>
    </View>
  );
};

export default BillTo;
