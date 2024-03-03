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
  const companyLocation = Location.find(
    (l) => l.key === AirwayInfo.officeAddress
  );
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
              fontFamily: "Courier-Bold",
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
          minHeight: 20,
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
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

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
            <Text
              style={{
                fontFamily: "Courier",
              }}
            >
              {companyInfo?.BankInfo?.IBAN}
            </Text>
          </View>
        </View>

        <Text style={{ fontFamily: "Courier", fontSize: 12 }}>
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
          minHeight: 30,
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
              fontFamily: "Courier-Bold",

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
            <Text
              style={{
                fontFamily: "Courier",
              }}
            >
              {jobInfo.CustomerAccount || ""}
            </Text>
          </View>
        </View>
        <Text style={{ fontFamily: "Courier", fontSize: 12 }}>
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
          height: 40,
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
              fontFamily: "Courier-Bold",

              width: "100%",
            }}
          >
            Issuing Carrier's Agent Name and City
          </Text>
          <Text
            style={{
              fontFamily: "Courier",

              width: "100%",
            }}
          ></Text>
        </View>
      </View>
      <View
        style={{
          borderRight: 1,
          borderRightColor: "black",
          width: "100%",
          minHeight: 30,
          borderBottom: 1,
          borderBottomColor: "black",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{}}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
            }}
          >
            Agents IATA Code
          </Text>
          <Text
            style={{
              fontFamily: "Courier",
            }}
          >
            {jobInfo.AgentsIATA}
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
            }}
          >
            Account No
          </Text>
          <Text
            style={{
              fontFamily: "Courier",
            }}
          ></Text>
        </View>
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
              fontFamily: "Courier-Bold",
            }}
          >
            Accounting Information
          </Text>
          <Text
            style={{
              fontFamily: "Courier",
            }}
          >
            {jobInfo.AccountingInformation}
          </Text>
        </View>
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
            fontFamily: "Courier-Bold",
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
            <Text style={{ fontSize: 8 }}>
              {" "}
              (Addr. of first Carrier) and requested Routing
            </Text>
          </Text>
        </Text>
        <Text style={{ fontFamily: "Courier", fontSize: 15 }}>
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
            fontFamily: "Courier-Bold",
            textDecoration: "underline",
          }}
        >
          Airport Of Destination
        </Text>
        <Text style={{ fontFamily: "Courier", fontSize: 15 }}>
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
            fontFamily: "Courier-Bold",
            textDecoration: "underline",
          }}
        >
          Flight Details
        </Text>
        <Text style={{ fontFamily: "Courier", fontSize: 9 }}>
          {jobInfo.FlightDetails}
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
            fontFamily: "Courier-Bold",
            textDecoration: "underline",
          }}
        >
          Handling Information
        </Text>
        <Text style={{ fontFamily: "Courier", fontSize: 15 }}>
          {jobInfo.HandlingInformation}
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
            fontFamily: "Courier-Bold",
            textDecoration: "underline",
          }}
        >
          Mode Of Payment
        </Text>
        <Text
          style={{
            textDecoration: "none",
            marginLeft: 5,
            fontFamily: "Courier",
          }}
        >
          {jobInfo.PaymentMethod}
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
          height: 145,
          borderBottom: 1,
          borderBottomColor: "black",
        }}
      >
        <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
          It is agreed that the goods described herein are accepted in apparent
          good order and condition (except as noted) for carriage SUBJECT TO THE
          CONDITIONS OF CONTRACT ON THE REVERSE HEREOF. ALL GOODS MAY BE CARRIED
          BY ANY OTHER MEANS INCLUDING ROAD OR ANY OTHER CARRIER UNLESS SPECIFIC
          CONTRARY INSTRUCTIONS ARE GIVEN HEREON BY THE SHIPPER, AND SHIPPER
          AGREES THAT THE SHIPMENT MAY BE CARRIED VIA INTERMEDIATE STOPPING
          PLACES WHICH THE CARRIER DEEMS APPROPRIATE. THE SHIPPERS ATTENTION IS
          DRAWN TO THE NOTICE CONCERNING CARRIERS LIMITATION OF LIABILITY.
          <Text style={{ fontSize: 8 }}>
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
        <View style={{ width: "15%", height: 30, borderRight: 1 }}>
          <Text
            style={{
              fontSize: 9,
            }}
          >
            Currency
          </Text>
          <Text
            style={{
              fontFamily: "Courier",
              fontSize: 7,
            }}
          >
            {jobInfo.Currency}
          </Text>
        </View>
        <View style={{ width: "15%", height: 30, borderRight: 1 }}>
          <Text
            style={{
              fontSize: 9,
            }}
          >
            Chgs Code
          </Text>
          <Text
            style={{
              fontSize: 9,
            }}
          >
            {jobInfo.ChargesCode}
          </Text>
        </View>
        <View style={{ width: "15%", height: 30, borderRight: 1 }}>
          <View>
            <Text
              style={{
                fontSize: 9,
              }}
            >
              Wt/Val
            </Text>
            <View style={{ flexDirection: "row", borderBottom: 1 }}>
              <Text
                style={{
                  fontSize: 7,
                  borderRightColor: "black",
                  borderRightWidth: 1,
                }}
              >
                PPD
              </Text>{" "}
              <Text
                style={{
                  fontSize: 7,
                }}
              >
                COLL
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 7,
                  borderRightColor: "black",
                }}
              >
                {jobInfo.WVPPD}
              </Text>{" "}
              <Text
                style={{
                  fontSize: 7,
                }}
              >
                {jobInfo.WVColl}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "15%", height: 30, borderRight: 1 }}>
          <View>
            <Text
              style={{
                fontSize: 9,
              }}
            >
              Other
            </Text>
            <View style={{ flexDirection: "row", borderBottom: 1 }}>
              <Text
                style={{
                  fontSize: 7,
                  borderRightColor: "black",
                  borderRightWidth: 1,
                }}
              >
                PPD
              </Text>{" "}
              <Text
                style={{
                  fontSize: 7,
                }}
              >
                COLL
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 7,
                  borderRightColor: "black",
                }}
              >
                {jobInfo.OtherPPD}
              </Text>{" "}
              <Text
                style={{
                  fontSize: 7,
                }}
              >
                {jobInfo.OtherColl}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "15%", height: 30, borderRight: 1 }}>
          <Text
            style={{
              fontSize: 8,
            }}
          >
            Declared Value for Carriage
          </Text>{" "}
          <Text
            style={{
              fontSize: 8,
              marginTop: 9,
              fontFamily: "Courier",
            }}
          >
            {jobInfo.DeclaredValCarriage}
          </Text>
        </View>
        <View style={{ width: "15%", height: 30 }}>
          <Text
            style={{
              fontSize: 8,
            }}
          >
            Declared Value for Customs
          </Text>
          <Text
            style={{
              fontSize: 8,
              marginTop: 9,
              fontFamily: "Courier",
            }}
          >
            {jobInfo.DeclaredValCustoms}
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
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "black",
        }}
      >
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
            }}
          >
            Reference Number
          </Text>
          <Text style={{ fontFamily: "Courier", fontSize: 15 }}>
            {jobInfo.ReferenceNumber}
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 10,
            }}
          >
            Optional Shipping Information
          </Text>
          <Text style={{ fontFamily: "Courier", fontSize: 8 }}>
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
        <View>
          <Text
            style={{
              fontFamily: "Courier-Bold",
            }}
          >
            Insurance Information
          </Text>
          <Text
            style={{
              fontFamily: "Courier",
            }}
          >
            {jobInfo.AmountInsurance}
          </Text>
        </View>

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
            fontFamily: "Courier-Bold",
            textDecoration: "underline",
          }}
        >
          Requested Flight / Date
        </Text>
        <Text
          style={{
            fontFamily: "Courier",
            fontSize: 9,
          }}
        >
          {jobInfo.RequestedFlight}
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
        <View>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
            }}
          >
            To
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
            }}
          >
            By First Carrier
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
            }}
          >
            To
          </Text>
        </View>{" "}
        <View>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
            }}
          >
            By
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
            }}
          >
            To
          </Text>
        </View>{" "}
        <View>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              textDecoration: "underline",
            }}
          >
            By
          </Text>
        </View>
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
        fontFamily: "Courier-Bold",
      }}
      wrap={false}
    >
      <View
        style={{
          border: 1,
          borderColor: "black",
          width: "100%",
          minHeight: 50,
          borderBottom: 1,
          borderBottomColor: "black",

          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "100%" }}>
          <View style={{ flexDirection: "column" }}>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={{ width: "50%", borderRight: 1 }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    borderBottom: 1,
                    textAlign: "center",
                  }}
                >
                  Prepaid
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    borderBottom: 1,
                    textAlign: "center",
                  }}
                >
                  Collect
                </Text>
              </View>
            </View>
            <View style={{ height: 40, borderBottom: 1 }}>
              <Text
                style={{
                  fontFamily: "Courier-Bold",
                  textAlign: "center",
                  border: 1,
                  width: "50%",
                  alignSelf: "center",
                }}
              >
                Weight Charges
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  height: "100%",
                }}
              >
                <View style={{ width: "50%", borderRight: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",
                      textAlign: "center",
                    }}
                  >
                    Pre
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      fontFamily: "Courier",
                    }}
                  >
                    {jobInfo.PPDWeight}
                  </Text>
                </View>

                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",
                      textAlign: "center",
                    }}
                  >
                    Collect
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      fontFamily: "Courier",
                    }}
                  >
                    {jobInfo.CollWeight}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: 40, borderBottom: 1 }}>
              <Text
                style={{
                  fontFamily: "Courier-Bold",
                  textAlign: "center",
                  border: 1,
                  width: "50%",
                  alignSelf: "center",
                }}
              >
                Valuation Charges
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  height: "100%",
                }}
              >
                <View style={{ width: "50%", borderRight: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",
                      textAlign: "center",
                    }}
                  >
                    Pre
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      fontFamily: "Courier",
                    }}
                  >
                    {jobInfo.PPDValuation}
                  </Text>
                </View>

                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",
                      textAlign: "center",
                    }}
                  >
                    Collect
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      fontFamily: "Courier",
                    }}
                  >
                    {jobInfo.CollValuation}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: 40, borderBottom: 1 }}>
              <Text
                style={{
                  fontFamily: "Courier-Bold",
                  textAlign: "center",
                  border: 1,
                  width: "50%",
                  alignSelf: "center",
                }}
              >
                Tax
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  height: "100%",
                }}
              >
                <View style={{ width: "50%", borderRight: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",
                      textAlign: "center",
                    }}
                  >
                    Pre
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      fontFamily: "Courier",
                    }}
                  >
                    {jobInfo.PPDTax}
                  </Text>
                </View>

                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",
                      textAlign: "center",
                    }}
                  >
                    Collect
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Courier",
                      textAlign: "center",
                    }}
                  >
                    {jobInfo.CollTax}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: 40, borderBottom: 1 }}>
              <Text
                style={{
                  fontFamily: "Courier-Bold",
                  textAlign: "center",
                  fontSize: 7,
                  border: 1,
                  width: "50%",
                  alignSelf: "center",
                }}
              >
                Total Other Charges Due Agent
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  height: "100%",
                }}
              >
                <View style={{ width: "50%", borderRight: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",
                      textAlign: "center",
                    }}
                  >
                    Pre
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      fontFamily: "Courier",
                    }}
                  ></Text>
                </View>

                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",
                      textAlign: "center",
                    }}
                  >
                    Collect
                  </Text>{" "}
                </View>
              </View>
            </View>
            <View style={{ height: 40, borderBottom: 1 }}>
              <Text
                style={{
                  fontFamily: "Courier-Bold",
                  textAlign: "center",
                  fontSize: 7,
                  border: 1,
                  width: "50%",
                  alignSelf: "center",
                }}
              >
                Total Other Charges Due Carrier
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",

                  height: "100%",
                }}
              >
                <View style={{ width: "50%", borderRight: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",
                      textAlign: "center",
                    }}
                  >
                    Pre
                  </Text>
                </View>

                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",
                      textAlign: "center",
                    }}
                  >
                    Collect
                  </Text>{" "}
                </View>
              </View>
            </View>
            <View style={{ height: 40, borderBottom: 1, flexDirection: "row" }}>
              <View style={{ width: "50%", borderRight: 1 }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",

                    fontSize: 12,
                  }}
                >
                  Total Prepaid
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",

                    fontSize: 12,
                  }}
                >
                  Total Collect
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 40,
                borderBottom: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ width: "50%", borderRight: 1 }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",
                    fontSize: 12,
                  }}
                >
                  Currency Conversion Rate
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Courier",
                    textAlign: "center",
                  }}
                >
                  {jobInfo.CurrConv}
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",

                    fontSize: 12,
                  }}
                >
                  CC charges in Dest. Currency
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Courier",
                    textAlign: "center",
                  }}
                >
                  {jobInfo.CCChargesinDestCurr}
                </Text>
              </View>
            </View>

            <View style={{ height: 40, borderBottom: 1, flexDirection: "row" }}>
              <View style={{ width: "50%", borderRight: 1 }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",

                    fontSize: 8,
                  }}
                >
                  For Carriers Use Only At Destination
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontFamily: "Courier-Bold",
                    textAlign: "center",

                    fontSize: 12,
                  }}
                >
                  Charges at Destination
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          border: 1,
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
              fontFamily: "Courier-Bold",
            }}
          >
            For Carriers Use Only *
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%", borderRight: 1, height: "100%" }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",
              }}
            >
              Charges At Destination
            </Text>
          </View>
          <View style={{ width: "50%", height: "100%" }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",
              }}
            >
              Total Collect Charges
            </Text>
          </View>
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
