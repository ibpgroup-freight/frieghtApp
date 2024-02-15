import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  reportTitle: {
    color: "black",
    letterSpacing: 4,
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

const InvoiceTitle = ({ title }: { title: string }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>{title}</Text>
  </View>
);

export default InvoiceTitle;
