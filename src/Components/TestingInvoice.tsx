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
import logo from "../assets/images/Logo.png";
import { useLocation } from "react-router-dom";
import useinvoiceStore from "../store/Invoice";
import TableShipmentDetails from "./TableShipmentDetails";
import OtherShipmentDetails from "./OtherShipmentDetails";
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
          <TableShipmentDetails jobInfo={jobInfo} />
          <OtherShipmentDetails jobInfo={jobInfo} />
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
                  color: "dodgerblue",
                }}
              >
                Sales Conditions:
              </Text>
              <Text
                style={{
                  width: "80%",
                  flexWrap: "wrap",
                }}
              >
                All our operations are made on the general terms of sale TLF
                Overseas.{"\n"} Rates exclude VAT, and the customs duties and
                taxes.{"\n"} Rates subject to modification with or without
                advance notice, in particular concerning the freight, the
                exchange rates, the fuel surcharge.{"\n"} Except specific
                written instructions received from you before the starting up of
                the operations, no ad-valorem insurance will be subscribed.
                {"\n"}Sea freight and additional charges of sea freight are
                included and valid on the date of the offer, actual charges and
                additional costs are valid on the date of shipping (V.A.T.O.S.)
                and can be changed without prior announcement of ocean carrier
                or any other relavant party.{"\n"}
                The insurance of goods during transport must be ordered
                additionally, as shipment is not insured under transport
                insurance during the transport.{"\n"}f the goods need to be
                stuffed into a container or into/onto another transport
                packaging (hereafter: the container) at the place of loading,
                this needs to be carried out within the so called free time. The
                same rule applies at the place of unloading where the container
                must be unstuffed and returned to the shipping company or to
                another owner withing the free time. Free time is the time
                within which an additional payment for: a) the use of the
                container by the shipping company or by another owner of the
                container (demurrage, detention) or b) the storage of the
                container (storage) by the port or by another manager of
                warehousing premises is not yet being charged. If the free time
                is exceeded Intereuropa is (pursuant to the contract entered
                into between Intereuropa and them) bound to pay the shipping
                companies, the ports and/or other performers of
                transport/logistics services a damage or other compensation as
                defined within their general terms and tariffs. By ordering the
                service or entering into the freight forwarding contract with
                Intereuropa the client confirms to be aware of the facts
                specified above. In case Intereuropa is for whatever reason
                bound to pay such damage or other compensations, the client
                shall refund Intereuropa (upon receiving Intereuropa’s first
                demand) the paid amounts as well as any other expenses related
                thereto. This rule shall apply also in cases were the delay is
                caused by the shipper/consignee from which or to which the
                container is taken/delivered on client’s order. The rule does
                not apply only in case the exceeding of the free time was caused
                by Intereuropa.
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
                  color: "dodgerblue",
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
              <Text style={{ color: "dodgerblue" }}>Check For Agreement</Text>
              <Text style={{ color: "dodgerblue" }}>Date</Text>
              <Text style={{ color: "dodgerblue" }}>Company Stamp</Text>
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
