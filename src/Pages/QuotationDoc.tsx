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
import useInquiryItem from "../store/Inquiry";
import useItemStore from "../store/Item";
import { toast } from "react-toastify";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

function QuotationDoc() {
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
    },
    logo: {
      width: 74,
      height: 66,
    },
  });
  const { inquiry, address, prestation } = useInquiryItem();
  const { items } = useItemStore();
  const { Location } = useCompanyInfo();
  const companyLocation = Location.find((l) => l.key === address);
  const [isSaving, setisSaving] = useState<boolean>(false);

  const handleSavePdf = async () => {
    try {
      const myDoc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <Text
              render={({ pageNumber, totalPages }) => (
                <Text>
                  Page. {pageNumber} / {totalPages}
                </Text>
              )}
              fixed
            />
            <InvoiceHeader jobinfo={inquiry} />
            <CompanyInfo jobInfo={inquiry} location={companyLocation!} />
            <BillToInfo jobInfo={inquiry} />
            <AdditionalInformation jobInfo={inquiry} />
            <View style={{ width: "100%", alignItems: "center", marginTop: 8 }}>
              <Text style={{ fontSize: 12, fontFamily: "Courier" }}>
                Details Of Prestation{" "}
              </Text>
            </View>
            <PrestationItemsTableHeader />
            <PrestationTableRows items={prestation} />
            <PrestationTableFooter items={items} jobInfo={inquiry} />
            <CustomerInformation jobinfo={inquiry} />
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ fontSize: 12, fontFamily: "Courier" }}>
                Goods Details
              </Text>
            </View>
            <GoodsTableHeader />
            <GoodsTableRows items={items} />
            {/* <PageFooter companyInfo={companyLocation!} /> */}
            <SalesTerms jobinfo={inquiry} />
            {/* <View>
            <View
              style={{
                border: 1,
                position: "relative",
                bottom: 0,
                width: "80%",
                alignSelf: "center",
                minHeight: 80,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text
                render={({ totalPages, pageNumber }) =>
                  pageNumber == totalPages ? (
                    <Text
                      style={{
                        fontFamily: "Courier",
                        textAlign: "center",
                        width: "30%",
                        fontSize: 10,
                      }}
                    >
                      Check For Agreement
                    </Text>
                  ) : null
                }
                style={{ width: "100%", textAlign: "justify" }}
              />
              <Text
                render={({ totalPages, pageNumber }) =>
                  pageNumber == totalPages ? (
                    <Text
                      style={{
                        fontFamily: "Courier",
                        textAlign: "center",
                        width: "30%",
                        fontSize: 10,
                      }}
                    >
                      Date
                    </Text>
                  ) : null
                }
                style={{ width: "100%", textAlign: "justify" }}
              />
              <Text
                render={({ totalPages, pageNumber }) =>
                  pageNumber == totalPages ? (
                    <Text
                      style={{
                        fontFamily: "Courier",
                        textAlign: "center",
                        width: "30%",
                        fontSize: 10,
                      }}
                    >
                      Company Stamp
                    </Text>
                  ) : null
                }
                style={{ width: "100%", textAlign: "justify" }}
              />
            </View>
          </View> */}
          </Page>
        </Document>
      );
      setisSaving(true);
      const doc = pdf(myDoc);
      const blob = await doc.toBlob();
      const jref = ref(storage, `${inquiry.quotationId}/Quotation.pdf`);
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
            <Text
              render={({ pageNumber, totalPages }) => (
                <Text>
                  Page. {pageNumber} / {totalPages}
                </Text>
              )}
              fixed
            />
            <InvoiceHeader jobinfo={inquiry} />
            <CompanyInfo jobInfo={inquiry} location={companyLocation!} />
            <BillToInfo jobInfo={inquiry} />
            <AdditionalInformation jobInfo={inquiry} />
            <View style={{ width: "100%", alignItems: "center", marginTop: 8 }}>
              <Text style={{ fontSize: 12, fontFamily: "Courier" }}>
                Details Of Prestation{" "}
              </Text>
            </View>
            <PrestationItemsTableHeader />
            <PrestationTableRows items={prestation} />
            <PrestationTableFooter items={items} jobInfo={inquiry} />
            <CustomerInformation jobinfo={inquiry} />
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ fontSize: 12, fontFamily: "Courier" }}>
                Goods Details
              </Text>
            </View>
            <GoodsTableHeader />
            <GoodsTableRows items={items} />
            {/* <PageFooter companyInfo={companyLocation!} /> */}
            <SalesTerms jobinfo={inquiry} />
            {/* <View>
            <View
              style={{
                border: 1,
                position: "relative",
                bottom: 0,
                width: "80%",
                alignSelf: "center",
                minHeight: 80,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text
                render={({ totalPages, pageNumber }) =>
                  pageNumber == totalPages ? (
                    <Text
                      style={{
                        fontFamily: "Courier",
                        textAlign: "center",
                        width: "30%",
                        fontSize: 10,
                      }}
                    >
                      Check For Agreement
                    </Text>
                  ) : null
                }
                style={{ width: "100%", textAlign: "justify" }}
              />
              <Text
                render={({ totalPages, pageNumber }) =>
                  pageNumber == totalPages ? (
                    <Text
                      style={{
                        fontFamily: "Courier",
                        textAlign: "center",
                        width: "30%",
                        fontSize: 10,
                      }}
                    >
                      Date
                    </Text>
                  ) : null
                }
                style={{ width: "100%", textAlign: "justify" }}
              />
              <Text
                render={({ totalPages, pageNumber }) =>
                  pageNumber == totalPages ? (
                    <Text
                      style={{
                        fontFamily: "Courier",
                        textAlign: "center",
                        width: "30%",
                        fontSize: 10,
                      }}
                    >
                      Company Stamp
                    </Text>
                  ) : null
                }
                style={{ width: "100%", textAlign: "justify" }}
              />
            </View>
          </View> */}
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
function AdditionalInformation({ jobInfo }: { jobInfo: Inquiry }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        justifyContent: "flex-start",
        border: 1,
        marginVertical: 15,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          paddingVertical: 3,
          paddingHorizontal: 4,
        }}
      >
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 7,
            paddingLeft: 1,
          }}
        >
          Other Information
        </Text>
        <Text
          style={{
            fontFamily: "Courier",
            fontSize: 7,
            paddingLeft: 1,
          }}
        >
          {jobInfo?.othershippingDetails}
        </Text>
      </View>
    </View>
  );
}
function CustomerInformation({ jobinfo }: { jobinfo: Inquiry }) {
  console.log("info", jobinfo, "Here");
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        justifyContent: "flex-start",
        border: 1,
        marginVertical: 15,
        minHeight: 30,
      }}
    >
      <View style={{ width: "50%" }}>
        <View
          style={{
            borderBottomWidth: 1,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",

                fontSize: 7,
              }}
            >
              Carrier
            </Text>
          </View>
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",

                fontSize: 7,
              }}
            >
              {jobinfo.CarrierName}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",

                fontSize: 7,
              }}
            >
              From
            </Text>
          </View>
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",

                fontSize: 7,
              }}
            >
              {jobinfo?.From}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",

                fontSize: 7,
              }}
            >
              To
            </Text>
          </View>
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",

                fontSize: 7,
              }}
            >
              {jobinfo?.To}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",

                fontSize: 7,
              }}
            >
              Transit Time
            </Text>
          </View>
          <View style={{ width: "70%" }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",

                fontSize: 7,
              }}
            >
              {jobinfo?.TransitTime}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View style={{ borderRight: 1, width: "100%", padding: 1 }}>
            <Text
              style={{
                fontFamily: "Courier-Bold",

                fontSize: 7,
              }}
            >
              NDER RESERVED OF FINAL DIMENSIONS//UNDER RESERVE OF SPACE DURING
              THE BOOKING
            </Text>
          </View>
        </View>
      </View>
      <View style={{ width: "50%", borderLeft: 1, height: "100%" }}>
        <Text
          style={{
            fontFamily: "Courier-Bold",
            fontSize: 7,
            paddingLeft: 1,
          }}
        >
          Other Customer Information
        </Text>
        <Text
          style={{
            fontFamily: "Courier",
            fontSize: 7,
            paddingLeft: 1,
          }}
        >
          {jobinfo.othershippingDetails}
        </Text>
      </View>
    </View>
  );
}
function InvoiceHeader({ jobinfo }: { jobinfo: Inquiry }) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        borderBottomColor: "red",
        borderBottomWidth: 2,
        padding: 10,
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
        <Image
          style={{ objectFit: "contain", height: 60, width: "100%" }}
          src={logo}
          fixed
        />
      </View>
      <View style={{ width: "70%", alignItems: "flex-start" }}>
        <Text style={{ fontFamily: "Courier", fontSize: 15 }}>
          {jobinfo.IssuedBy}
        </Text>
        <Text style={{ fontFamily: "Courier", fontSize: 15 }}>
          Quotation Number {jobinfo?.quotationId}
        </Text>{" "}
        <Text style={{ fontFamily: "Courier-Bold", fontSize: 12 }}>
          Valid From {jobinfo?.validFrom} To {jobinfo?.validTo}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    border: 1,
    borderWidth: 1,
    borderColor: "blue",
    width: "100%",
    marginVertical: 5,
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

const CompanyInfo = ({
  jobInfo,
  location,
}: {
  jobInfo: Inquiry;
  location: CompanyLocationInfo;
}) => {
  return (
    <View style={styles.headerContainer}>
      <About companyLocation={location} jobInfo={jobInfo} />
    </View>
  );
};

function About({
  companyLocation,
  jobInfo,
}: {
  companyLocation: CompanyLocationInfo;
  jobInfo: Inquiry;
}) {
  return (
    <>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          width: "50%",
          justifyContent: "flex-start",
          borderRight: 1,
        }}
      >
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {companyLocation?.name}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            {companyLocation?.location}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            {companyLocation?.office}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            Phone {"   "} {companyLocation?.telephone}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            P.O Box {"   "} {companyLocation?.pobox}
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            TRN {"   "} {companyLocation?.TRN}
          </Text>
        </View>
        <View style={{ width: "100%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",
              fontSize: 7,
            }}
          >
            {companyLocation?.country}
          </Text>
        </View>
      </View>

      <AuxiliaryInfo jobInfo={jobInfo} />
    </>
  );
}

function AuxiliaryInfo({ jobInfo }: { jobInfo: Inquiry }) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: "30%",
        justifyContent: "flex-start",

        borderLeft: 1,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Department
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.Department}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Y/Ref
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.Yref}
          </Text>
        </View>
      </View>
      {/* <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Incharge
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.Incharge}
          </Text>
        </View>
      </View> */}
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Destination
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo.Destination}
          </Text>
        </View>
      </View>
    </View>
  );
}

function BillToInfo({ jobInfo }: { jobInfo: Inquiry }) {
  return (
    <View>
      {/* <View
        style={{
          borderBottomWidth: 2,
          borderTopWidth: 1,
          width: "100%",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 10, textAlign: "center" }}>This estimate is sent by</Text>
      </View> */}
      <ReceiverInfo jobInfo={jobInfo} />
    </View>
  );
}
function ReceiverInfo({ jobInfo }: { jobInfo: Inquiry }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        border: 1,
      }}
    >
      <ReceiverCol1 jobInfo={jobInfo} />
      <View style={{ borderLeft: 1, width: "30%" }}>
        <Text></Text>
      </View>
      <ReceiverCol2 jobInfo={jobInfo} />
    </View>
  );
}
function ReceiverCol1({ jobInfo }: { jobInfo: Inquiry }) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: "35%",
        justifyContent: "flex-start",
        flex: 1,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            From
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo.From}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Departure
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.Departure}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            To
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.To}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Arrival
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.Arrival}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Transit Time
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.TransitTime}
          </Text>
        </View>
      </View>
    </View>
  );
}
function ReceiverCol2({ jobInfo }: { jobInfo: Inquiry }) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: "35%",
        justifyContent: "flex-start",
        flex: 1,
        borderLeft: 1,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Incoterm
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          {" "}
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.IncoTerm}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Periodicity
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.Periodicity}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Served By {"   "}
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.SalesPerson}
          </Text>{" "}
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Customer Email
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.CustomerEmail}
          </Text>{" "}
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Customer Name
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.CustomerName}
          </Text>{" "}
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View style={{ borderRight: 1, width: "30%", padding: 1 }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Customer Phone
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo?.CustomerPhoneNo}
          </Text>{" "}
        </View>
      </View>
    </View>
  );
}

function PrestationItemsTableHeader() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 10,
        border: 1,
      }}
    >
      <View
        style={{
          padding: 5,
          width: "20%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          S No
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "50%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Description
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "15%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Currency
        </Text>
      </View>{" "}
      <View
        style={{
          padding: 5,
          width: "15%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Total
        </Text>
      </View>
    </View>
  );
}
function PrestationTableRows({ items }: { items: PrestationItem[] }) {
  const rows = items?.map((i, index) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        border: 1,
      }}
    >
      <View
        style={{
          width: "20%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {index + 1}{" "}
        </Text>
      </View>
      <View
        style={{
          width: "50%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i.description}
        </Text>
      </View>
      <View
        style={{
          width: "15%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i.currency}
        </Text>
      </View>{" "}
      <View
        style={{
          width: "15%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i.total}
        </Text>
      </View>
    </View>
  ));
  return <>{rows}</>;
}
function PrestationTableFooter({
  items,
  jobInfo,
}: {
  items: QuotationItem[];
  jobInfo: Inquiry;
}) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TableFooterCol1 />
      <TableFooterCol2 items={items} jobInfo={jobInfo} />
    </View>
  );
}
function TableFooterCol1() {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        width: "35%",
        justifyContent: "flex-start",
        flex: 1,
        backgroundColor: "gainsboro",
        height: "100%",
        border: 1,
      }}
    ></View>
  );
}
function TableFooterCol2({
  items,
  jobInfo,
}: {
  items: QuotationItem[];
  jobInfo: Inquiry;
}) {
  const Total = items.reduce((acc, i, index) => {
    acc += parseInt(i.RateAmountPerUnit);
    acc = acc - (i.Discount ?? 0);
    acc = acc + (i.vatamount ?? 0);
    return acc;
  }, 0);
  const TWO = Total;
  console.log("Titems", items);
  console.log("Total", Total);
  console.log("TWo", TWO);
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "flex-end",
        width: "35%",
        justifyContent: "flex-start",
        flex: 1,
        border: 1,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Sub Total
          </Text>
        </View>
        <View style={{ width: "40%" }}>
          {" "}
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo.Subtotal || ""}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          width: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRight: 1,
            width: "40%",
            padding: 1,
            borderLeft: 1,
            backgroundColor: "gainsboro",
          }}
        >
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            Total Except Taxes Of Our Offer
          </Text>
        </View>
        <View style={{ width: "40%" }}>
          <Text
            style={{
              fontFamily: "Courier-Bold",

              fontSize: 7,
            }}
          >
            {jobInfo.SubtotalExceptTaxes || ""}
          </Text>
        </View>
      </View>
    </View>
  );
}

function PageFooter({ companyInfo }: { companyInfo: CompanyLocationInfo }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <View style={{ width: "30%" }}>
        <Text style={{ fontFamily: "Courier", fontSize: 12 }}>License No#</Text>
      </View>
      <View style={{ width: "35%" }}>
        <Text
          style={{
            textDecoration: "underline",
            fontFamily: "Courier",
            fontSize: 12,
          }}
        >
          BANK Details AED Account
        </Text>
        <View>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Account Name: {"   "} {companyInfo?.BankInfo?.accName}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Account No: {"   "} {companyInfo?.BankInfo?.accNo}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Bank Name: {"   "} {companyInfo?.BankInfo?.bankName}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            IBAN: {"   "} {companyInfo?.BankInfo?.IBAN}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Branch Name: {"   "} {companyInfo?.BankInfo?.branch}
          </Text>
          <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
            Swift Code: {"   "} {companyInfo?.BankInfo?.swift}
          </Text>
        </View>
      </View>
    </View>
  );
}

// function FixedFooter() {
//   return (
//     <>
//       <Text
//         style={{
//           fontFamily: "Courier",
//           textAlign: "left",
//           width: "30%",
//           fontSize: 10,
//         }}
//       >
//         Check For Agreement
//       </Text>
//       <Text
//         style={{
//           fontFamily: "Courier",
//           textAlign: "center",
//           width: "30%",
//           fontSize: 10,
//         }}
//       >
//         Date
//       </Text>
//       <Text
//         style={{
//           fontFamily: "Courier",
//           textAlign: "right",
//           width: "30%",
//           fontSize: 10,
//         }}
//       >
//         Stamp Of Company
//       </Text>
//     </>
//   );
// }

function SalesTerms({ jobinfo }: { jobinfo: Inquiry }) {
  return (
    <View style={{ width: "100%", marginVertical: 15 }}>
      <View>
        <Text
          style={{
            width: "100%",
            fontFamily: "Courier-Bold",
          }}
        >
          Sales Conditions:
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          alignItems: "flex-start",
          borderTopColor: "navy",
          width: "100%",
          paddingHorizontal: 25,
        }}
      >
        <View style={{ width: "100%" }}>
          <Text
            style={{
              flexWrap: "nowrap",
              justifyContent: "flex-start",
              lineHeight: 1,
              fontFamily: "Courier",
              width: "100%",
              alignSelf: "flex-end",
            }}
          >
            {jobinfo.termsAndConditions?.map((s, ind) => (
              <React.Fragment key={ind}>
                <Text style={{ fontFamily: "Courier-Bold", fontSize: 15 }}>
                  {ind + 1}
                </Text>

                <Text style={{ fontSize: 10, fontFamily: "Courier-Bold" }}>
                  {" "}
                  {s + `${"\n"}`}
                </Text>
              </React.Fragment>
            ))}
          </Text>
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          alignItems: "flex-start",
          borderTopColor: "navy",
        }}
      >
        <Text
          style={{
            width: "20%",
            fontFamily: "Courier-Bold",
          }}
        >
          Payment Terms
        </Text>
        <Text
          style={{
            width: "80%",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            lineHeight: 1,
            fontFamily: "Courier-Bold",
          }}
        >
          30 DAYS AFTER DATE OF INVOICE
        </Text>
      </View> */}
    </View>
  );
}

function GoodsTableHeader() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 10,
        border: 1,
      }}
    >
      <View
        style={{
          padding: 5,
          width: "20%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          S No
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "35%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Description
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "15%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Weight
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "15%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Dimensions
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "15%",
          backgroundColor: "gainsboro",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          Charg. Weight
        </Text>
      </View>
    </View>
  );
}
function GoodsTableRows({ items }: { items: QuotationItem[] }) {
  const rows = items?.map((i, ind) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        border: 1,
      }}
    >
      <View
        style={{
          padding: 5,
          width: "20%",
          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {ind + 1}
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "35%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i.ChargeDescription}
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "15%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i.Weight}
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "15%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i?.Dimensions}
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          width: "15%",

          borderRight: 1,
        }}
      >
        <Text
          style={{ fontFamily: "Courier", fontSize: 9, textAlign: "center" }}
        >
          {i.RateAmountPerUnit}
        </Text>
      </View>
    </View>
  ));
  return <>{rows}</>;
}

export default QuotationDoc;

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
