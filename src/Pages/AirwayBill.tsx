import {
  PDFViewer,
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import React from "react";
import useinvoiceStore from "../store/Invoice";
import useCompanyInfo from "../store/CompanyInfo";
import logo from "../assets/images/Logo.png";

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
    width: "50%",
    height: "100%",
    objectFit: "contain",
  },
});
function AirwayBill() {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 11,
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: 10,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "black",
      width: "100%",
      height: "100%",
      paddingVertical: 10,
    },
    logo: {
      width: 74,
      height: 66,
    },
  });
  const { AirwayInfo, AirwayItems } = useinvoiceStore();
  const { Location } = useCompanyInfo();
  console.log("loca", Location);
  const companyLocation = Location.find((l) => l.key === AirwayInfo.address);
  console.log("loca2", AirwayItems);

  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <Text
            render={({ pageNumber, totalPages }) => (
              <Text>
                Page. {pageNumber} / {totalPages}
              </Text>
            )}
            fixed
            wrap={false}
            style={{
              fontFamily: "Courier-BoldOblique",
            }}
          />
          <View
            style={{
              fontSize: 10,
              alignSelf: "flex-end",
              paddingHorizontal: 20,
            }}
          >
            <Text>
              Date:{" "}
              {new Date().getFullYear() +
                "-" +
                new Date().getMonth() +
                "-" +
                new Date().getDate()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Column1 jobInfo={AirwayInfo} companyInfo={companyLocation!} />
            <Column2 jobInfo={AirwayInfo} />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <InvoiceTableHeader />
            <InvoiceTableRow items={AirwayItems} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Column3 jobInfo={AirwayInfo} />
            <Column4 jobInfo={AirwayInfo} />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default AirwayBill;

function Column1({
  jobInfo,
  companyInfo,
}: {
  jobInfo: cargoInfo & AirwayBillInquiry;
  companyInfo: CompanyLocationInfo;
}) {
  return (
    <View
      style={{
        width: "50%",
        borderLeft: 1,
        borderLeftColor: "black",
      }}
    >
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 100,
          borderBottom: 1,
          borderBottomColor: "black",
          paddingBottom: 5,
          borderTop: 1,
          borderTopColor: "black",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: 30,
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
              width: "40%",
            }}
          >
            Shipper Details
          </Text>
          <View
            style={{
              padding: 1,
              width: "60%",
              borderLeftWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            <Text>Shippers Account Number</Text>
            <Text>{companyInfo?.BankInfo?.IBAN}</Text>
          </View>
        </View>

        <Text style={{ fontFamily: "Courier-Bold", fontSize: 12 }}>
          {companyInfo?.name} {"\n"}
          {companyInfo?.office} {"\n"}
          {companyInfo?.location} {"\n"}
          {companyInfo?.country}
          {"\n"}
          {companyInfo?.office}
          {"\n"}
          TRN {companyInfo?.TRN}
          {"\n"}
          {companyInfo?.telephone}
          {"\n"}
          PO Box {companyInfo?.pobox}
          {"\n"}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 100,
          borderBottom: 1,
          borderBottomColor: "black",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            minHeight: 30,
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
              width: "40%",
            }}
          >
            Consignee
          </Text>
          <View
            style={{
              padding: 1,
              width: "60%",
              borderLeftWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            <Text> Consignees Account Number</Text>
            <Text>{jobInfo.CustomerAccount || ""}</Text>
          </View>
        </View>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 12 }}>
          {jobInfo.CustomerName}
          {"\n"}
          {jobInfo.CustomerEmail}
          {"\n"}
          {jobInfo.CustomerAddress} {"\n"}
          {jobInfo.CustomerPhoneNo}
          {"\n"}
          Customer TRN {jobInfo.CustomerTRN}
        </Text>
      </View>

      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 80,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
            }}
          >
            Accounting Information
          </Text>
          <Text style={{}}>{jobInfo.AccountingInformation}</Text>
        </View>

        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Mode Of Payment
        </Text>
        <Text
          style={{
            textDecoration: "none",
            marginLeft: 5,
          }}
        >
          {jobInfo.PaymentMethod}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 40,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Currency
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.Currency}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 50,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Airport Of Departure
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              fontSize: 10,
            }}
          >
            (Addr. of first Carrier) and requested Routing
          </Text>
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.AirportOfOrigin}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 40,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Airport Of Destination
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.AirportOfDestination}
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 40,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Flight Details
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}></Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 50,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Handling Information
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
          {jobInfo.HandlingInformation}
        </Text>
      </View>
    </View>
  );
}

function Column2({ jobInfo }: { jobInfo: cargoInfo & AirwayBillInquiry }) {
  return (
    <View
      style={{
        width: "50%",
      }}
    >
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          height: 80,
          borderBottom: 1,
          borderBottomColor: "black",
          borderTop: 1,
          borderTopColor: "black",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image style={styles.logo} src={logo} />
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 9 }}>
          Not Negotiable
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 60,

          borderBottom: 1,

          borderBottomColor: "black",
        }}
      >
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 9 }}>
          Issued By IBP CARGO SERVICES LLC.{"\n"} Copies1,2 and 3 of this Air
          Waybill are originals and have the same validity
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 165,
          borderBottom: 1,
          borderBottomColor: "black",
        }}
      >
        <Text style={{ fontSize: 10 }}>
          It is agreed that the goods described herein are accepted in apparent
          good order and condition (except as noted) for carriage SUBJECT TO THE
          CONDITIONS OF CONTRACT ON THE REVERSE HEREOF. ALL GOODS MAY BE CARRIED
          BY ANY OTHER MEANS INCLUDING ROAD OR ANY OTHER CARRIER UNLESS SPECIFIC
          CONTRARY INSTRUCTIONS ARE GIVEN HEREON BY THE SHIPPER, AND SHIPPER
          AGREES THAT THE SHIPMENT MAY BE CARRIED VIA INTERMEDIATE STOPPING
          PLACES WHICH THE CARRIER DEEMS APPROPRIATE. THE SHIPPERS ATTENTION IS
          DRAWN TO THE NOTICE CONCERNING CARRIERS LIMITATION OF LIABILITY.
          <Text style={{ fontSize: 9 }}>
            Shipper may increase such limitation of liability by declaring a
            higher value for carriage and paying a supplemental charge if
            required.
          </Text>
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 50,

          borderBottom: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontSize: 9,
            width: "32%",
            textDecoration: "underline",
          }}
        >
          Consignee Reference
        </Text>
        <Text
          style={{
            fontSize: 9,
            width: "32%",
          }}
        >
          Declared Value for Carriage
        </Text>
        <Text
          style={{
            fontSize: 9,
            width: "32%",
          }}
        >
          Declared Value for Customs
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 80,
          borderBottom: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "black",
        }}
      >
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
              textDecoration: "underline",
            }}
          >
            Reference Number
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
            {jobInfo.ReferenceNumber}
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
              fontSize: 10,
            }}
          >
            Optional Shipping Information
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 8 }}>
            {jobInfo.othershippingDetails}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 80,
          borderBottom: 1,
          justifyContent: "space-between",
          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Insurance Information
        </Text>
        <Text style={{ fontSize: 8 }}>
          INSURANCE - If Carrier offers insurance, and such insurance is
          requested in accordance with the conditions thereof, indicate amount
          to be insured in figures in box marked 'Amount of Insurance'
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 50,
          borderBottom: 1,
          justifyContent: "space-between",
          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-BoldOblique",
            textDecoration: "underline",
          }}
        >
          Requested Flight
        </Text>
        <Text style={{ fontSize: 8 }}>
          INSURANCE - If Carrier offers insurance, and such insurance is
          requested in accordance with the conditions thereof, indicate amount
          to be insured in figures in box marked 'Amount of Insurance'
        </Text>
      </View>
    </View>
  );
}
const styles2 = StyleSheet.create({
  container: {
    marginVertical: 4,
    flexDirection: "row",
    borderColor: "navy",
    color: "black",
    borderWidth: 1,
    alignItems: "center",
    textAlign: "center",
    flexGrow: 1,
    flexWrap: "nowrap",
    fontWeight: "heavy",
    minHeight: 20,
    width: "100%",
    fontFamily: "Courier-Bold",
    fontSize: 12,
  },
  description: {
    width: "25%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
  },
  qty: {
    width: "15%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
  },
  rate: {
    width: "20%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
  },
  amount: {
    width: "15%",
    fontSize: 10,
    fontWeight: "heavy",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontFamily: "Courier-Bold",
  },
});

const InvoiceTableHeader = () => (
  <View style={styles2.container} wrap={false}>
    <Text style={styles2.description}>No Of Pieces RCP</Text>
    <Text style={styles2.amount}>Gross Weight</Text>
    <Text style={styles2.amount}>Unit</Text>
    <Text style={styles2.amount}>Rate Class</Text>
    <Text style={styles2.qty}>Chargeable Weight</Text>
    <Text style={styles2.qty}>Rate/Charge</Text>
    <Text style={styles2.qty}>
      Nature Of Goods
      <Text style={{ fontSize: 6 }}>(Including Dimensions Or Volume)</Text>
    </Text>
  </View>
);

function Column3({ jobInfo }: { jobInfo: cargoInfo & AirwayBillInquiry }) {
  return (
    <View
      style={{
        width: "50%",
        fontFamily: "Courier-BoldOblique",
      }}
    >
      <View
        style={{
          border: 1,
          borderColor: "black",
          width: "100%",
          minHeight: 50,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
            }}
          >
            Total
          </Text>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
            }}
          >
            Outstanding Charges
          </Text>
          <Text
            style={{
              marginHorizontal: 4,
              fontFamily: "Courier-Bold",
              fontSize: 12,
            }}
          >
            Total Other Charges
          </Text>
          <Text
            style={{
              marginHorizontal: 4,
              fontFamily: "Courier-Bold",
              fontSize: 12,
            }}
          >
            Total Prepaid
          </Text>
          <Text
            style={{
              marginHorizontal: 4,
              fontFamily: "Courier-Bold",
              fontSize: 12,
            }}
          >
            Grand Total
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          height: 64,
          //   flexDirection: "row",
          //   justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
            }}
          >
            For Carriers Use Only *
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
            }}
          >
            Charges At Destination
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Courier-BoldOblique",
            }}
          >
            Total Collect Charges
          </Text>
        </View>
      </View>
    </View>
  );
}

function Column4({ jobInfo }: { jobInfo: cargoInfo & AirwayBillInquiry }) {
  return (
    <View
      style={{
        width: "50%",
      }}
    >
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 80,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          fontSize: 8,
          justifyContent: "space-between",
        }}
      >
        <Text>
          Shipper certifies that the particulars on the face hereof are correct
          and that insofar as any part of the consignment contains dangerous
          goods, such part is properly described by name and is in proper
          condition for carriage by air according to the applicable Dangerous
          Goods Regulations.
        </Text>
        <Text
          style={{
            borderTopWidth: 1,
            borderStyle: "dashed",
            paddingVertical: 1,
          }}
        >
          Signature Of Shipper Or Agent
        </Text>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 40,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          fontSize: 8,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            borderTopWidth: 1,
            borderStyle: "dashed",
            paddingVertical: 1,
          }}
        >
          Executed On Date
        </Text>
        <Text
          style={{
            borderTopWidth: 1,
            borderStyle: "dashed",
            paddingVertical: 1,
          }}
        >
          at Place
        </Text>
        <Text
          style={{
            borderTopWidth: 1,
            borderStyle: "dashed",
            paddingVertical: 1,
          }}
        >
          Signature Of Issuing Carrier or its Agent
        </Text>
      </View>
    </View>
  );
}

const styles3 = StyleSheet.create({
  container: {
    marginVertical: 1,
    flexDirection: "row",
    color: "black",
    alignItems: "center",
    textAlign: "center",
    flexGrow: 1,
    flexWrap: "nowrap",
    fontWeight: "heavy",
    minHeight: 20,
    width: "100%",
  },
  description: {
    width: "25%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
  },
  qty: {
    width: "15%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
  },
  rate: {
    width: "20%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 10,
    fontWeight: "heavy",
  },
  amount: {
    width: "15%",
    fontSize: 10,
    fontWeight: "heavy",
    borderRightColor: "navy",
    borderRightWidth: 1,
  },
});
const InvoiceTableRow = ({ items }: { items: AirwayItem[] }) => {
  const rows = items.map((item: AirwayItem, index) => (
    <View style={styles3.container} key={index} wrap={false}>
      <Text style={styles3.description}>{item.NoPieces}</Text>
      <Text style={styles3.amount}>{item.GrossWeight}</Text>
      <Text style={styles3.amount}>{item.Unit}</Text>
      <Text style={styles3.amount}>{item.Rate}</Text>
      <Text style={styles3.qty}>{item.ChargeableWeight}</Text>
      <Text style={styles3.qty}>{item.RatePerCharge}</Text>
      <Text style={styles3.qty}>{item.NatureOfGoods}</Text>
    </View>
  ));
  return <>{rows}</>;
};
