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
    width: "100%",
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

const BillTo = ({
  jobInfo,
  location,
}: {
  jobInfo: Inquiry & cargoInfo;
  location: CompanyLocationInfo;
}) => {
  return (
    <View style={styles.headerContainer}>
      <TableHeader companyLocation={location} />
      <View
        style={{
          ...styles.singleContainer,
        }}
      >
        <Text style={styles.singleText}>
          <Text
            style={{
              fontStyle: "italic",
              color: "red",
            }}
          >
            Billed To ,
          </Text>
          {"         "}
          {jobInfo.CustomerName}
        </Text>
        <Text style={styles.singleText}>{jobInfo.CustomerAddress}</Text>
        <Text style={styles.singleText}>{jobInfo.CustomerPhoneNo}</Text>
        <Text style={styles.singleText}>{jobInfo.CustomerEmail}</Text>
      </View>
    </View>
  );
};

export default BillTo;

function TableHeader({
  companyLocation,
}: {
  companyLocation: CompanyLocationInfo;
}) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        width: "50%",
        justifyContent: "flex-start",
        borderRight: 1,
      }}
    >
      <View style={{ borderBottomWidth: 1, width: "100%" }}>
        <Text
          style={{
            fontFamily: "Courier-Bold",

            fontSize: 7,
          }}
        >
          Hello {companyLocation?.name} Hello
        </Text>
      </View>
      <View style={{ borderBottomWidth: 1, width: "100%" }}>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 7,
          }}
        >
          {companyLocation?.location} Hello
        </Text>
      </View>
      <View style={{ borderBottomWidth: 1, width: "100%" }}>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 7,
          }}
        >
          {companyLocation?.office} Hello
        </Text>
      </View>
      <View style={{ borderBottomWidth: 1, width: "100%" }}>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 7,
          }}
        >
          {companyLocation?.telephone} Hello
        </Text>
      </View>
      <View style={{ borderBottomWidth: 1, width: "100%" }}>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 7,
          }}
        >
          {companyLocation?.country} Hello
        </Text>
      </View>
    </View>
  );
}
