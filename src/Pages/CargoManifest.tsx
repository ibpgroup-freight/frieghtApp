import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useSearchParams } from "react-router-dom";

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
type jobPdfProps = {
  job?: Job;
};
function CargoManifest({ job }: jobPdfProps) {
  const { inquiry: inquiryStoreItems } = useInquiryItem();
  const { items: itemStoreItems } = useItemStore();
  const items = job ? job.Items : itemStoreItems;
  const inquiry = job ? job.inquiry : inquiryStoreItems;
  console.log(job?.inquiry.ContainerType);
  console.log(job?.inquiry.CustomContainerType);

  return (
    <PDFViewer className="w-3/4 h-full">
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
                <Text style={styles.inquiryText}>{inquiry.CustomerName}</Text>
              </View>
              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Customer Address</Text>
                <Text style={styles.inquiryText}>
                  {inquiry.CustomerAddress}
                </Text>
              </View>
              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Sales Person</Text>
                <Text style={styles.inquiryText}>{inquiry.SalesPerson}</Text>
              </View>
              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>CarrierName</Text>
                <Text style={styles.inquiryText}>{inquiry.CarrierName}</Text>
              </View>
              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Weight</Text>
                <Text style={styles.inquiryText}>{inquiry.Weight}</Text>
              </View>
            </View>
            <View style={{ justifyContent: "flex-start" }}>
              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Customer Address</Text>
                <Text style={styles.inquiryText}>{inquiry.Dimensions}</Text>
              </View>

              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Port Of Destination</Text>
                <Text style={styles.inquiryText}>
                  {inquiry.PortOfDestination}
                </Text>
              </View>

              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Port Of Origin</Text>
                <Text style={styles.inquiryText}>{inquiry.PortOfOrigin}</Text>
              </View>

              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Transit Time</Text>
                <Text style={styles.inquiryText}>{inquiry.TransitTime}</Text>
              </View>
              <View style={styles.inquiryView}>
                <Text style={styles.inquiryHeading}>Container Type</Text>
                <Text style={styles.inquiryText}>
                  {inquiry?.ContainerType ?? ""}
                  {inquiry?.CustomContainerType?.split(",").join("") ?? ""}
                </Text>
              </View>
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
            {items.map((i) => (
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

export default CargoManifest;
