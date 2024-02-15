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
    marginTop: 3,
    padding: 3,
    minHeight: 40,
  },
  billTo: {
    marginTop: 10,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  singleContainer: {
    width: "50%",
    padding: 3,
    flexDirection: "column",
  },
  singleText: {
    paddingVertical: 1,
    paddingHorizontal: 4,
    fontSize: 8,
    flexWrap: "wrap",
  },
});

const OtherShipmentDetails = ({
  jobInfo,
}: {
  jobInfo: Inquiry & cargoInfo;
}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={{ color: "dodgerblue" }}>Other Shipment Details</Text>
      <View
        style={{
          ...styles.singleContainer,
        }}
      >
        <Text style={styles.singleText}>{jobInfo.othershippingDetails}</Text>
        <Text style={styles.singleText}>{jobInfo.specialInstructions}</Text>
      </View>
    </View>
  );
};

export default OtherShipmentDetails;
