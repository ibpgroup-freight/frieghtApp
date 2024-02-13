import React from "react";
import {
  Page,
  Document,
  Image,
  StyleSheet,
  PDFViewer,
  View,
  Text,
} from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import logo from "../../src/logo.jpg";
import { useLocation } from "react-router-dom";
import useinvoiceStore from "../store/Invoice";
// const invoiceData = {
//   id: "5df3180a09ea16dc4b95f910",
//   invoice_no: "201906-28",
//   balance: "$2,283.74",
//   company: "MANTRIX",
//   email: "susanafuentes@mantrix.com",
//   phone: "+1 (872) 588-3809",
//   address: "922 Campus Road, Drytown, Wisconsin, 1986",
//   trans_date: "2019-09-12",
//   due_date: "2019-10-12",
//   items: [
//     {
//       sno: 1,
//       desc: "ad sunt culpa occaecat qui",
//       qty: 5,
//       rate: 405.89,
//     },
//     {
//       sno: 2,
//       desc: "cillum quis sunt qui aute",
//       qty: 5,
//       rate: 373.11,
//     },
//     {
//       sno: 3,
//       desc: "ea commodo labore culpa irure",
//       qty: 5,
//       rate: 458.61,
//     },
//     {
//       sno: 4,
//       desc: "nisi consequat et adipisicing dolor",
//       qty: 10,
//       rate: 725.24,
//     },
//     {
//       sno: 5,
//       desc: "proident cillum anim elit esse",
//       qty: 4,
//       rate: 141.02,
//     },
//   ],
// };
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
    height: 66,
  },
});

const TestingInvoice = () => {
  const { Items, jobInfo } = useinvoiceStore();
  const location = useLocation();
  console.log("location", location.state);
  console.log(Items, "Item");
  console.log(jobInfo, "jobInfo");

  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page} wrap>
          <Image style={styles.logo} src={logo} />
          <InvoiceTitle title="Invoice" />
          <InvoiceNo jobInfo={jobInfo} />
          <BillTo jobInfo={jobInfo} />
          <InvoiceItemsTable Items={Items} jobInfo={jobInfo} />
          <InvoiceThankYouMsg />
          <View style={{ width: "100%" }} wrap={false}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                alignItems: "flex-start",
                borderTopWidth: 1,
                borderTopColor: "navy",
              }}
            >
              <Text
                style={{
                  width: "20%",
                  textDecoration: "underline",
                  color: "mediumblue",
                }}
              >
                Sales Conditions:
              </Text>
              <Text
                style={{
                  width: "80%",
                  flexWrap: "wrap",
                  color: "dimgrey",
                }}
              >
                All our operations are made on the general terms of sale TLF
                Overseas.{"\n"} Rates exclude VAT, and the customs duties and
                taxes.{"\n"} Rates subject to modification with or without
                advance notice, in particular concerning the freight, the
                exchange rates, the fuel surcharge.{"\n"} Except specific
                written instructions received from you before the starting up of
                the operations, no ad-valorem insurance will be subscribed.
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  width: "20%",
                  textDecoration: "underline",
                  color: "mediumblue",
                }}
              >
                Payment Terms
              </Text>
              <Text
                style={{
                  width: "80%",
                  color: "gray",
                }}
              >
                X Days After Invoice
              </Text>
            </View>
            <View
              style={{
                borderWidth: 2,
                borderColor: "royalblue",
                height: 50,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 3,
                marginVertical: 5,
              }}
            >
              <Text>Check For Agreement</Text>
              <Text>Date</Text>
              <Text>Company Stamp</Text>
            </View>
          </View>
          <View
            fixed
            style={{
              position: "absolute",
              bottom: 0,
              height: 20,
              width: "100%",
              backgroundColor: "dodgerblue",
              marginTop: 20,
            }}
          ></View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default TestingInvoice;
