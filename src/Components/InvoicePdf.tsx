import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// type Inquiry = {
//   CustomerName: string;
//   CustomerAddress: string;
//   SalesPerson: string;
//   PortOfOrigin: string;
//   PortOfDestination: string;
//   Weight: string;
//   Dimensions: string;
//   TransitTime: string;
//   ShipmentTerms: string;
//   CarrierName: string;
// };
// type Item = {
//   id: string;
//   QuoteValidity: string;
//   Charges: string;
//   ChargeDescription: string;
//   UnitPerKg: string;
//   Currency: string;
//   AmountPerUnit: string;
//   CostAndSellSection: string;
// };
// type Job = {
//   id: string;
//   inquiry: Inquiry;
//   Items: Item[];
// };

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  logo: {
    backgroundColor: "blue",
    color: "white",
    padding: 25,
    opacity: 0.7,
  },
  table: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    border: 1,
    width: "90%",
    alignSelf: "center",
  },
  inquiryText: {
    fontSize: 12,
    margin: 3,
    fontWeight: "normal",
    textAlign: "justify",
  },
  inquiryHeading: {
    fontWeight: "bold",
    fontSize: 14,
    color: "blue",
    textDecoration: "underline",
    padding: 10,
  },
  inquiryView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
type InvoicePdfProps = {
  job?: Job;
};
function InvoicePdf() {
  const { inquiry } = useInquiryItem();
  const { job } = useLocation().state;
  const items: Job["Items"] = job ? job.items : [];
  console.log(job, "invoice");
  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4">
          <View>
            <View style={styles.logo}>
              <Text>Logo</Text>
            </View>
          </View>
          <Text style={{ textAlign: "center" }}>Inquiry Information</Text>
          <View style={styles.table}>
            <View style={{ justifyContent: "flex-start" }}>
              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Customer Name</Text>
                <Text style={styles.inquiryText}>
                  {job ? job.inquiry.CustomerName : inquiry.CustomerName}
                </Text>
              </View>
              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Customer Address</Text>
                <Text style={styles.inquiryText}>
                  {job ? job.inquiry.CustomerName : inquiry.CustomerAddress}
                </Text>
              </View>
              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Sales Person</Text>
                <Text style={styles.inquiryText}>
                  {job ? job.inquiry.SalesPerson : inquiry.SalesPerson}
                </Text>
              </View>
              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>CarrierName</Text>
                <Text style={styles.inquiryText}>
                  {job ? job.inquiry.CarrierName : inquiry.CarrierName}
                </Text>
              </View>
              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Weight</Text>
                <Text style={styles.inquiryText}>
                  {job ? job.inquiry.Weight : inquiry.Weight}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-start" }}>
              <View style={styles.inquiryView}>
                {/* <Text style={styles.inquiryHeading}>Customer Address</Text>
                <Text style={styles.inquiryText}>
                  {job ? job.inquiry.Dimensions : inquiry.Dimensions}
                </Text> */}
              </View>

              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Port Of Destination</Text>
                <Text style={styles.inquiryText}>
                  {job
                    ? job.inquiry.PortOfDestination
                    : inquiry.PortOfDestination}
                </Text>
              </View>

              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Port Of Origin</Text>
                <Text style={styles.inquiryText}>
                  {job ? job.inquiry.PortOfOrigin : inquiry.PortOfOrigin}
                </Text>
              </View>
              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Container Type</Text>
                <Text style={styles.inquiryText}>
                  {job?.inquiry?.ContainerType ?? ""}
                  {job?.inquiry?.CustomContainerType?.split(",").join("") ?? ""}
                </Text>
              </View>

              {/* <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Transit Time</Text>
                <Text style={styles.inquiryText}>
                  {job ? job.inquiry.TransitTime : inquiry.TransitTime}
                </Text>
              </View> */}
            </View>

            {/* Add more inquiry data fields as needed */}
          </View>

          <View style={styles.section}>
            <Text style={{ textAlign: "center", marginVertical: 10 }}>
              Items
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                border: 1,
                padding: 3,
              }}
            >
              <Text style={styles.inquiryHeading}>Item ID</Text>
              <Text style={styles.inquiryHeading}>Quote Validity</Text>
              <Text style={styles.inquiryHeading}>Unit/Kg</Text>
              <Text style={styles.inquiryHeading}>Currency</Text>
              <Text style={styles.inquiryHeading}>Amount/Unit</Text>
            </View>
            {items &&
              items.map((i: QuotationItem) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 5,
                  }}
                >
                  <Text style={styles.inquiryText}>{i.id}</Text>
                  <Text style={styles.inquiryText}>{i.QuoteValidity}</Text>
                  {/* <Text style={styles.inquiryText}>{i.UnitPerKg}</Text> */}
                  <Text style={styles.inquiryText}>{i.Currency}</Text>
                  {/* <Text style={styles.inquiryText}>{i.AmountPerUnit}</Text> */}
                </View>
              ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default InvoicePdf;
