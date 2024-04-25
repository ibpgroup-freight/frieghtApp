import {
  PDFViewer,
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Image,
  pdf,
} from "@react-pdf/renderer";
import React, { useState } from "react";
import useinvoiceStore from "../store/Invoice";
import useCompanyInfo from "../store/CompanyInfo";
import logo from "../assets/images/Logo.png";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import useInquiryItem from "../store/Inquiry";

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
    width: "30%",
    height: "100%",
    objectFit: "contain",
  },
});
function BillOfLaddle() {
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
      position: "relative",
    },
    logo: {
      width: 74,
      height: 66,
    },
  });
  const { Items, ladingItems, ladleInfo } = useinvoiceStore();
  const { Location } = useCompanyInfo();
  console.log("laddleInfo", ladleInfo);
  const companyLocation = Location.find(
    (l) => l.key === ladleInfo.officeAddress
  );
  const [isSaving, setisSaving] = useState<boolean>(false);
  const { ladingbasisItems } = useInquiryItem();

  const handleSavePdf = async () => {
    try {
      const myDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
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
                  (new Date().getMonth() + 1) +
                  "-" +
                  new Date().getDate()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                border: 1,
              }}
            >
              <Column1 jobInfo={ladleInfo} companyInfo={companyLocation!} />
              <Column2 jobInfo={ladleInfo} />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
                marginVertical: 2,
              }}
            >
              <InvoiceTableHeader />
              <InvoiceTableRow items={ladingItems} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                position: "absolute",
                bottom: 3,
                left: 8,
                border: 1,
              }}
            >
              <Column3 jobInfo={ladleInfo} ladingBasis={ladingbasisItems} />
              <Column4 jobInfo={ladleInfo} />
            </View>
          </Page>
        </Document>
      );
      setisSaving(true);
      const doc = pdf(myDoc);
      const blob = await doc.toBlob();
      const jref = ref(storage, `${ladleInfo.Jobid || "Test"}/BOL.pdf`);
      await uploadBytes(jref, blob!);
      toast.success("Successfully Uploaded");
    } catch (e) {
      console.log(e);
      toast.error("Couldnt Upload Document");
    } finally {
      setisSaving(false);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row lg:items-start">
      <PDFViewer className="w-full h-screen">
        <Document>
          <Page size="A4" style={styles.page}>
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
                  (new Date().getMonth() + 1) +
                  "-" +
                  new Date().getDate()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                border: 1,
              }}
            >
              <Column1 jobInfo={ladleInfo} companyInfo={companyLocation!} />
              <Column2 jobInfo={ladleInfo} />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
                marginVertical: 2,
              }}
            >
              <InvoiceTableHeader />
              <InvoiceTableRow items={ladingItems} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                position: "absolute",
                bottom: 3,
                left: 8,
                border: 1,
              }}
            >
              <Column3 jobInfo={ladleInfo} ladingBasis={ladingbasisItems} />
              <Column4 jobInfo={ladleInfo} />
            </View>
          </Page>
        </Document>
      </PDFViewer>
      <button
        className="bg-blue-700 w-40 !mx-auto   text-white rounded-lg px-5 py-3 text-2xl self-start my-4 gap-4"
        onClick={handleSavePdf}
      >
        {isSaving ? "..." : "Save"}
      </button>
    </div>
  );
}

export default BillOfLaddle;

function Column1({
  jobInfo,
  companyInfo,
}: {
  jobInfo: cargoInfo & ladleInquiry;
  companyInfo: CompanyLocationInfo;
}) {
  return (
    <View
      style={{
        width: "50%",
        borderRight: 1,
      }}
    >
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 30,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 1,
          borderTopColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 6,
          }}
        >
          Shipper Details
        </Text>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 10,
            fontWeight: 1000,
          }}
        >
          {jobInfo?.ShipperName} {"\n"}
          {jobInfo?.ShipperAddress} {"\n"}
          {jobInfo?.ShipperEmail} {"\n"}
          {jobInfo?.ShipperPhone} {"\n"}
          {jobInfo?.OtherShipperInfo}
          {"\n"}
          TRN {jobInfo?.ShippersTRN}
          {"\n"}
          PO Box {jobInfo?.ShippersPO}
          {"\n"}
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 30,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 6,
          }}
        >
          Consignee
        </Text>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 10,

            fontWeight: 1000,
          }}
        >
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
            fontSize: 6,
          }}
        >
          Notify Address
        </Text>
        <Text
          style={{ fontFamily: "Courier-Bold", fontSize: 10, fontWeight: 1000 }}
        >
          {jobInfo.NotifyAddress}
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 40,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "50%", padding: 2 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Vessel
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 10,
              fontWeight: 1000,
            }}
          >
            {jobInfo.VesselName}
          </Text>
        </View>
        <View style={{ width: "50%", padding: 2 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Voyage Number
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 10,
              fontWeight: 1000,
            }}
          >
            {jobInfo.VoyageNo}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 30,
          borderBottomColor: "black",
          padding: 5,
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Port Of Loading
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 10,
              fontWeight: 1000,
            }}
          >
            {jobInfo.PortOfLoading}
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Port Of Discharge
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 10,
              fontWeight: 1000,
            }}
          >
            {jobInfo.PortOfDischarge}
          </Text>
        </View>
      </View>
    </View>
  );
}

function Column2({ jobInfo }: { jobInfo: cargoInfo & ladleInquiry }) {
  return (
    <View
      style={{
        width: "50%",
      }}
    >
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 50,
          borderBottom: 1,
          borderBottomColor: "black",
          borderTopColor: "black",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Image style={[styles.logo]} src={logo} />
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 10 }}>
          Bill Of Lading .{`\n`}
          Issued By IBP CARGO SERVICES LLC.
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 40,
          borderBottom: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "black",
        }}
      >
        <View
          style={{
            borderRightWidth: 1,
            borderRightColor: "black",
            padding: 2,
            width: "50%",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Carriers Reference
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 10,
              fontWeight: 1000,
            }}
          >
            {jobInfo.CarrierReference}
          </Text>
        </View>
        <View
          style={{
            width: "50%",
            padding: 2,
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            B/L No
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 10,
              fontWeight: 1000,
            }}
          >
            {jobInfo.blNo}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 40,
          borderBottom: 1,
          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 6,
          }}
        >
          Export Reference
        </Text>
        <Text
          style={{ fontFamily: "Courier-Bold", fontSize: 10, fontWeight: 1000 }}
        >
          {jobInfo.ExportReference}
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 50,

          borderBottom: 1,

          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 6,
          }}
        >
          Forwarding Agent
        </Text>
        <Text
          style={{ fontFamily: "Courier-Bold", fontSize: 10, fontWeight: 1000 }}
        >
          {jobInfo.ForwardingAgent}
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 50,

          borderBottom: 1,

          borderBottomColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 6,
          }}
        >
          Consignee Reference
        </Text>
        <Text
          style={{ fontFamily: "Courier-Bold", fontSize: 10, fontWeight: 1000 }}
        >
          {jobInfo.ConsigneeReference}
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          padding: 4,
          height: 30,
          flexDirection: "row",
          justifyContent: "flex-start",
          borderBottomColor: "black",
        }}
      >
        <View style={{ width: "50%" }}>
          {" "}
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Place Of Receipt
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 10,
              fontWeight: 1000,
            }}
          >
            {jobInfo.PlaceOfReceipt}
          </Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 6,
            }}
          >
            Place Of Delivery
          </Text>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 10,
              fontWeight: 1000,
            }}
          >
            {jobInfo.PlaceOfDelivery}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles2 = StyleSheet.create({
  container: {
    marginVertical: 1,
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
    fontSize: 8,
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
  <View
    style={[styles2.container, { marginBottom: 0, borderBottom: 0 }]}
    wrap={false}
  >
    <Text style={styles2.description}>Package Description</Text>
    <Text style={styles2.amount}>Container No.</Text>
    <Text style={styles2.amount}>Seal No.</Text>
    <Text style={styles2.amount}>No Of Packages</Text>
    <Text style={styles2.qty}>Dimensions</Text>
    <Text style={[styles2.qty, { borderRight: 0 }]}>Weight</Text>
  </View>
);

function Column3({
  jobInfo,
  ladingBasis,
}: {
  jobInfo: cargoInfo & ladleInquiry;
  ladingBasis: basisItems[];
}) {
  return (
    <>
      <View
        style={{
          width: "50%",
          borderRight: 1,
        }}
      >
        <View
          style={{
            borderColor: "black",
            width: "100%",
            minHeight: 40,
            borderBottom: 1,
            borderBottomColor: "black",
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "column", width: "50%" }}>
            <Text
              style={{
                fontSize: 8,
                fontFamily: "Courier-Bold",
              }}
            >
              Total Containers Received By Carrier
            </Text>
            <Text
              style={{
                marginHorizontal: 4,
                fontFamily: "Courier-Bold",

                fontSize: 12,
              }}
            >
              {jobInfo.TotalContainers}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "50%",

              borderLeft: 1,
              paddingLeft: 3,
            }}
          >
            <Text
              style={{
                fontSize: 8,
                fontFamily: "Courier-Bold",
              }}
            >
              Packages Received By Carrier
            </Text>
            <Text
              style={{
                marginHorizontal: 4,
                fontSize: 12,
                fontFamily: "Courier-Bold",
                marginTop: 4,
              }}
            >
              {jobInfo.PackagesReceived}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderColor: "black",
            width: "100%",
            minHeight: 40,
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
                fontFamily: "Courier-Bold",
                fontSize: 8,
              }}
            >
              Movement
            </Text>
            <Text
              style={{
                marginHorizontal: 4,
                fontFamily: "Courier-Bold",
                fontSize: 12,
              }}
            >
              {jobInfo.Movement}
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",
                fontSize: 8,
              }}
            >
              Currency
            </Text>
            <Text
              style={{
                marginHorizontal: 4,
                fontFamily: "Courier-Bold",
                fontSize: 12,
              }}
            >
              {jobInfo.Currency}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              borderRightColor: "black",
              width: "100%",
              minHeight: 10,
              borderBottom: 1,
              borderBottomColor: "black",
              paddingHorizontal: 5,
              paddingVertical: 2,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "18%",
                padding: 1,
                borderRightWidth: 1,
                borderRightColor: "black",
              }}
            >
              <Text
                style={{
                  fontFamily: "Courier-Bold",

                  fontSize: 8,
                }}
              >
                Charge
              </Text>
            </View>
            <View
              style={{
                width: "18%",
                padding: 1,
                borderRightWidth: 1,
                borderRightColor: "black",
              }}
            >
              <Text
                style={{
                  fontFamily: "Courier-Bold",

                  fontSize: 8,
                }}
              >
                Rate
              </Text>
            </View>
            <View
              style={{
                width: "18%",
                padding: 1,
                borderRightWidth: 1,
                borderRightColor: "black",
              }}
            >
              <Text
                style={{
                  fontFamily: "Courier-Bold",

                  fontSize: 8,
                }}
              >
                Basis
              </Text>
            </View>
            <View
              style={{
                width: "18%",
                padding: 1,
                borderRightWidth: 1,
                borderRightColor: "black",
              }}
            >
              <Text
                style={{
                  fontFamily: "Courier-Bold",

                  fontSize: 7.5,
                }}
              >
                Wt/Vol/Val
              </Text>
            </View>
            <View
              style={{
                width: "18%",
                padding: 1,
                borderRightWidth: 1,
                borderRightColor: "black",
              }}
            >
              <Text
                style={{
                  fontFamily: "Courier-Bold",

                  fontSize: 8,
                }}
              >
                P/C
              </Text>
            </View>
            <View
              style={{
                width: "18%",
                padding: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: "Courier-Bold",

                  fontSize: 8,
                }}
              >
                Amount
              </Text>
            </View>
          </View>
          <View style={{ minHeight: 150, borderBottom: 1 }}>
            {ladingBasis.map((i) => (
              <View
                style={{
                  borderRightColor: "black",
                  width: "100%",
                  minHeight: 10,

                  borderBottomColor: "black",
                  paddingHorizontal: 3,
                  paddingVertical: 0,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: "18%",

                    borderRightWidth: 1,
                    borderRightColor: "black",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",

                      fontSize: 8,
                      textAlign: "center",
                    }}
                  >
                    {i.charge}
                  </Text>
                </View>
                <View
                  style={{
                    width: "18%",

                    borderRightWidth: 1,
                    borderRightColor: "black",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",

                      fontSize: 8,
                      textAlign: "center",
                    }}
                  >
                    {i.rate}
                  </Text>
                </View>
                <View
                  style={{
                    width: "18%",

                    borderRightWidth: 1,
                    borderRightColor: "black",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",

                      fontSize: 8,
                      textAlign: "center",
                    }}
                  >
                    {i.basis}
                  </Text>
                </View>
                <View
                  style={{
                    width: "18%",

                    borderRightWidth: 1,
                    borderRightColor: "black",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",

                      fontSize: 8,
                      textAlign: "center",
                    }}
                  >
                    {i.wtvolval}
                  </Text>
                </View>
                <View
                  style={{
                    width: "18%",

                    borderRightWidth: 1,
                    borderRightColor: "black",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",

                      fontSize: 8,
                      textAlign: "center",
                    }}
                  >
                    {i.pc}
                  </Text>
                </View>
                <View
                  style={{
                    width: "18%",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Courier-Bold",
                      fontSize: 8,
                      textAlign: "center",
                    }}
                  >
                    {i.amount}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View
          style={{
            borderRightColor: "black",
            width: "100%",
            minHeight: 30,
            flexDirection: "row",
            justifyContent: "space-evenly",
            borderBottomColor: "black",
          }}
        >
          <View
            style={{
              borderRight: 1,
              alignItems: "flex-start",
              flexGrow: 1,
              paddingHorizontal: 1,
            }}
          >
            <Text style={{ fontSize: 7, fontFamily: "Courier-Bold" }}>
              Total Freight Prepaid
            </Text>
            <Text style={{ fontSize: 11, fontFamily: "Courier-Bold" }}>
              {jobInfo.FreightPrepaid}
            </Text>
          </View>
          <View
            style={{
              borderRight: 1,
              alignItems: "flex-start",
              flexGrow: 2,
              paddingHorizontal: 1,
            }}
          >
            <Text
              style={{
                fontSize: 7,
                fontFamily: "Courier-Bold",
                textAlign: "left",
              }}
            >
              Total Freight Collected
            </Text>
            <Text style={{ fontSize: 11, fontFamily: "Courier-Bold" }}>
              {jobInfo.FreightCollected}
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-start",
              flexGrow: 1,
              paddingHorizontal: 1,
            }}
          >
            <Text style={{ fontSize: 7, fontFamily: "Courier-Bold" }}>
              Total Freight
            </Text>
            <Text style={{ fontSize: 11, fontFamily: "Courier-Bold" }}>
              {jobInfo.TotalFreight}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

function Column4({ jobInfo }: { jobInfo: cargoInfo & ladleInquiry }) {
  return (
    <View
      style={{
        width: "50%",
      }}
    >
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 170,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
          fontSize: 8,
        }}
      >
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 8 }}>
          RECEIVED by the Carrier from the Shipper in apparent good order and
          condition (unless otherwise noted herein) the total number or quantity
          of Containers or other packages or units indicated in the box opposite
          entitled “Total No. of Containers/Packages received by the Carrier”
          for Carriage subject to all the terms and conditions hereof (INCLUDING
          THE TERMS AND CONDITIONS ON THE REVERSE HEREOF AND THE TERMS AND
          CONDITIONS OF THE CARRIER’S APPLICABLE TARIFF) from the Place of
          Receipt or the Port of Loading, whichever is applicable, to the Port
          of Discharge or the Place of Delivery, whichever is applicable.{"\n"}{" "}
          One original Bill of Lading, duly endorsed, must be surrendered by the
          Merchant to the Carrier in exchange for the Goods or a delivery order.
          In accepting this Bill of Lading the Merchant expressly accepts and
          agrees to all its terms and conditions whether printed, stamped or
          written, or otherwise incorporated, notwithstanding the non-signing of
          this Bill of Lading by the Merchant. IN WITNESS WHEREOF the number of
          original Bills of Lading stated below all of this tenor and date has
          been signed, one of which being accomplished the others to stand void.
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 30,
          borderBottom: 1,
          borderBottomColor: "black",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 7,
          }}
        >
          Place And Date Of Issue
        </Text>
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 10 }}>
          {jobInfo.PlaceOfIssue} {jobInfo.DateOfIssue}
        </Text>
      </View>
      <View
        style={{
          borderRightColor: "black",
          width: "100%",
          minHeight: 30,
          borderBottomColor: "black",
          padding: 5,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "50%",
            padding: 1,

            borderRight: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Freight Payable At
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 10 }}>
            {jobInfo.PayableAt}
          </Text>
        </View>
        <View style={{ width: "50%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Number Of Original Bs/L
          </Text>
          <Text style={{ fontFamily: "Courier-Bold", fontSize: 10 }}>
            {jobInfo.OriginalBSL}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles3 = StyleSheet.create({
  container: {
    flexDirection: "row",
    color: "black",
    alignItems: "center",
    textAlign: "center",
    flexGrow: 1,
    flexWrap: "nowrap",
    fontWeight: "heavy",
    minHeight: 10,
    width: "100%",
    border: 1,
  },
  description: {
    width: "25%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 8,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
  },
  qty: {
    width: "15%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 8,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
  },
  rate: {
    width: "20%",
    borderRightColor: "navy",
    borderRightWidth: 1,
    fontSize: 8,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
  },
  amount: {
    width: "15%",
    fontSize: 8,
    fontWeight: "heavy",
    fontFamily: "Courier-Bold",
    borderRightColor: "navy",
    borderRightWidth: 1,
  },
});
const InvoiceTableRow = ({ items }: { items: LadingItems[] }) => {
  const rows = items?.map((item: LadingItems, index) => (
    <View style={styles3.container} key={index} wrap={false}>
      <Text style={styles3.description}>{item.PackageDescription}</Text>
      <Text style={styles2.amount}>{item.ContainerNo}</Text>
      <Text style={styles2.amount}>{item.SealNo}</Text>
      <Text style={styles2.amount}>{item.NoOfPackages}</Text>
      <Text style={styles2.qty}>{item.Dimensions}</Text>
      <Text style={[styles2.qty, { borderRight: 0 }]}>{item.NoOfPackages}</Text>
    </View>
  ));
  return <>{rows}</>;
};
