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

const TableShipmentDetails = ({
  jobInfo,
}: {
  jobInfo: Inquiry & cargoInfo;
}) => {
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
            Weight
          </Text>{" "}
          {"         "}
          {jobInfo.Weight}
        </Text>
        <Text style={styles.singleText}>
          <Text
            style={{
              fontStyle: "italic",
              color: "dodgerblue",
            }}
          >
            Dimension
          </Text>{" "}
          {"         "}
          {jobInfo.Dimensions}
        </Text>
        <Text style={styles.singleText}>
          <Text
            style={{
              fontStyle: "italic",
              color: "dodgerblue",
            }}
          >
            Place Of Issue
          </Text>{" "}
          {"         "}
          {jobInfo.Dimensions}
        </Text>
        <Text style={styles.singleText}>
          <Text
            style={{
              fontStyle: "italic",
              color: "dodgerblue",
            }}
          >
            Date Of Issue{" "}
          </Text>
          {"         "}
          {new Date().getDate() +
            "-" +
            new Date().getMonth() +
            "-" +
            new Date().getFullYear()}
        </Text>
      </View>
      <View style={styles.singleContainer}>
        <Text style={styles.singleText}>
          <Text
            style={{
              fontStyle: "italic",
              color: "dodgerblue",
            }}
          >
            Cargo Type{" "}
          </Text>{" "}
          {"         "}
          {jobInfo.TypeOfCargo}
        </Text>
        <Text style={styles.singleText}>
          <Text
            style={{
              fontStyle: "italic",
              color: "dodgerblue",
            }}
          >
            Shipment Terms
          </Text>
          {"         "}

          {jobInfo.ShipmentTerms}
        </Text>
        <Text style={styles.singleText}>
          <Text
            style={{
              fontStyle: "italic",
              color: "dodgerblue",
            }}
          >
            Quote Validity
          </Text>
          {"      "}

          {
            new Date(new Date().setDate(new Date().getDate() + 5))
              .toISOString()
              .split("T")[0]
          }
        </Text>
        {jobInfo.DriverDetails && (
          <Text style={styles.singleText}>
            <Text
              style={{
                fontStyle: "italic",
                color: "dodgerblue",
              }}
            >
              Driver Details
            </Text>
            {"      "}

            {jobInfo.DriverDetails}
          </Text>
        )}
        {jobInfo.RouteDetails && (
          <Text style={styles.singleText}>
            <Text
              style={{
                fontStyle: "italic",
                color: "dodgerblue",
              }}
            >
              Route Details
            </Text>

            {jobInfo.RouteDetails}
          </Text>
        )}
        {jobInfo.VehicleDetails && (
          <Text style={styles.singleText}>
            <Text
              style={{
                fontStyle: "italic",
                color: "dodgerblue",
              }}
            >
              Vehicle Details
            </Text>
            {"      "}

            {jobInfo.VehicleDetails}
          </Text>
        )}
        {jobInfo.VesselName && (
          <Text style={styles.singleText}>
            <Text
              style={{
                fontStyle: "italic",
                color: "dodgerblue",
              }}
            >
              Vehicle Name
            </Text>
            {"      "}

            {jobInfo.VesselName}
          </Text>
        )}{" "}
        {jobInfo.VesselDetails && (
          <Text style={styles.singleText}>
            <Text
              style={{
                fontStyle: "italic",
                color: "dodgerblue",
              }}
            >
              Vehicle Details
            </Text>
            {"      "}

            {jobInfo.VesselDetails}
          </Text>
        )}
        {jobInfo.ShippingLaneDetails && (
          <Text style={styles.singleText}>
            <Text
              style={{
                fontStyle: "italic",
                color: "dodgerblue",
              }}
            >
              Shipping Lane Details
            </Text>
            {"      "}

            {jobInfo.ShippingLaneDetails}
          </Text>
        )}
        {/* <Text style={styles.singleText}>
          Currency
          {
          jobInfo.
          }
        </Text> */}
      </View>
    </View>
  );
};

export default TableShipmentDetails;
