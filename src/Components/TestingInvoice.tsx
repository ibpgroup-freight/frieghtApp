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
import useCompanyInfo from "../store/CompanyInfo";
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
  const { Location } = useCompanyInfo();
  const companyLocation = Location.find((l) => l.key === jobInfo.officeAddress);
  console.log(Items, "Item");
  console.log(jobInfo, "jobInfo");

  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page} wrap>
          <Text
            render={({ pageNumber, totalPages }) => (
              <Text>
                Page. {pageNumber} / {totalPages}
              </Text>
            )}
            fixed
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              borderBottomColor: "red",
              borderBottomWidth: 2,
            }}
          >
            <View
              fixed
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "25%",
              }}
            >
              <Image style={styles.logo} src={logo} fixed />
            </View>
            <View style={{ width: "70%", alignItems: "flex-start" }}>
              <Text style={{ fontFamily: "Courier", fontSize: 15 }}>
                IBP Cargo Services L.L.C
              </Text>
            </View>
          </View>

          <InvoiceTitle title={jobInfo.type.toUpperCase() + " Invoice"} />
          <InvoiceNo jobInfo={jobInfo} location={companyLocation!} />
          <BillTo jobInfo={jobInfo} location={companyLocation!} />
          <TableShipmentDetails jobInfo={jobInfo} />
          <OtherShipmentDetails jobInfo={jobInfo} />
          <InvoiceItemsTable Items={Items} jobInfo={jobInfo} />
          <InvoiceThankYouMsg />
          <View style={{ width: "100%" }} wrap={true}>
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
                  color: "red",
                }}
              >
                Sales Conditions:
              </Text>
              <Text
                style={{
                  width: "80%",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  lineHeight: 1,
                }}
              >
    
                {jobInfo.termsAndConditions
                  ?.map((s) => s + `${"\n"}`)
                  .join("\n")
                  .toString()}
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
                  color: "red",
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
              <Text style={{ color: "red" }}>Check For Agreement</Text>
              <Text style={{ color: "red" }}>Date</Text>
              <Text style={{ color: "red" }}>Company Stamp</Text>
            </View>
          </View>
          <View
            fixed
            style={{
              position: "absolute",
              bottom: 0,
              height: 20,
              width: "100%",
              backgroundColor: "red",
              marginTop: 20,
            }}
          ></View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default TestingInvoice;

const SeaFreightTerms = `Based on standard dimensions.${"\n"}
Rates are valid for general, non-haz. cargo.${"\n"}
Rates are excluding duties and taxes.${"\n"}
Customs inspection, if any, charges will be applicable payable in advance or IBP pay 5% fee will be charges on the duty amount. ${"\n"}
Any additional charges/approvals at destination/origin will be as per actual receipts.${"\n"}
Rates & booking are subject to space availability.${"\n"}
If any cancellation after booking has been made, charges will apply.${"\n"}
Standard shipping line terms and conditions apply.${"\n"}
Subject to customs/duties/inspection/loading/offloading/labor/storage/insurance, additional if required.${"\n"}
Your cargo is not insured. We strongly suggest that you comprehensively insure your goods${"\n"}
`;

const AirFreightTerms = `
Subject to prior booking request for space confirmation from the Airline.${"\n"}
Packages should comply IATA Standard. ${"\n"}
In case of any variance in gross weight, volume, or dimensions of the shipment, it will impact to the rate quoted. Rate will be revised accordingly, if required.${"\n"} 
If any transportation / Packing / crane / Forklift /other service required: charges would be at additional.${"\n"}
If any customs exit certification /inspection / submission: Charges would be at additional.${"\n"}
Above rates are excluding Insurance, Legalization and any other ancillary Govt. Receipt.${"\n"}
Standard shipping line terms and conditions apply.${"\n"}
The price applicable for General cargo/Stackable packages only.${"\n"}
`;

const RoadFreightTerms = `Rates quoted above exclude customs duties, legalization, cargo insurance, loading, offloading (both at origin and destination), detention, etc.${"\n"}Rates qoted above are for General cargo only and are valid till further notice from LBC.${"\n"}
Rates for DGR / Hazardous cargo, Oversized, Perishables and shipments to Exhibitions shall be quoted on case by case only.${"\n"}
Customs Duties or Legalization charges if any are to be borne by the consignee unless otherwise notified to IBP cargo services LLC in writing to the origin office prior to shipping with agreement for accounting purposes. ${"\n"}
Additional insurance if needed can be arranged through our customer service team. ${"\n"}
All goods must be palletized for the safety and security of Land Transportation of yourgoods. In the event of IBP cargo services LLC to do the palletization, the same shall be done with an additional charge.${"\n"}
All goods which are duty exempted are subject to customs inspection or approvals at the destinations. There is no official circular issued by GCC customs with regard to the same. If any duty imposed on arrival at the destination, the same shall be notified to the client.${"\n"}
Rates are valid till further notice and if Oil / Diesel prices increase and thereby adversely affect the business operation. A rate increase shall be discussed mutually before agreement.${"\n"}
IBP cargo services LLC signs only for received /delivered pallets and not for the contents inside the pallet.${"\n"}
`;
