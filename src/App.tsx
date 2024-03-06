import React, { Suspense, useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import SideBar from "./Components/SIdeBar";
import { Oval } from "react-loader-spinner";
import InvoicePdf from "./Components/InvoicePdf";
import useUser from "./store/User";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import "react-toastify/dist/ReactToastify.css";
import HamburgerIcon from "./Components/Hamburger";
import { ToastContainer } from "react-toastify";
import CustomLoader from "./Components/CustomLoader";
import { FormikProvider } from "formik";
import TestingInvoice from "./Components/TestingInvoice";
import Ejspagestest from "./Pages/ejspagestest.js";
import { collection, getDocs } from "firebase/firestore";
import useCompanyInfo from "./store/CompanyInfo";
import ProofOfDelivery from "./Pages/ProofOfDelivery";
import Invoice from "./Pages/Invoice";
const CargoManifest = React.lazy(() => import("./Pages/CargoManifest"));
const GenerateJob = React.lazy(() => import("./Pages/GenerateJob"));
const BillOfLaddle = React.lazy(() => import("./Pages/BillOfLaddle"));
const Analytics = React.lazy(() => import("./Pages/Analytics"));
const ManageUsers = React.lazy(() => import("./Pages/ManageUsers"));
const Contacts = React.lazy(() => import("./Pages/Contacts"));
const QuotationDoc = React.lazy(() => import("./Pages/QuotationDoc"));

const CreateJob = React.lazy(() => import("./Pages/CreateJob"));
const JobDetail = React.lazy(() => import("./Pages/JobDetail"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Authenticate = React.lazy(() => import("./Pages/Authenticate"));
const GenerateInvoice = React.lazy(() => import("./Pages/GenerateInvoice"));
const SearchPage = React.lazy(() => import("./Pages/Search"));
const AirwayBill = React.lazy(() => import("./Pages/AirwayBill"));

function App() {
  const { isloggedIn, AuthStateLogIn } = useUser();
  const [isloading, setisloading] = useState(true);
  const [showSideBar, setshowSideBar] = useState<boolean>(false);
  const { setInformation } = useCompanyInfo();
  useEffect(() => {
    setisloading((p) => true);
    const sub = onAuthStateChanged(auth, (user) => {
      if (user) {
        AuthStateLogIn();
      } else {
        // User is signed out
        // ...
      }
      setisloading((p) => false);
    });
    return () => sub();
  }, []);
  const getCompanyLocation = useCallback(async () => {
    const docs = await getDocs(collection(db, "companyInformation"));
    const company: CompanyLocationInfo[] = [];
    docs.forEach((doc) => company.push(doc.data() as CompanyLocationInfo));
    setInformation(company);
  }, []);
  useEffect(() => {
    getCompanyLocation();
  }, []);
  if (isloading) return <CustomLoader />;
  return (
    <div className="App">
      <Suspense fallback={<CustomLoader />}>
        <ToastContainer position="top-right" />
        {isloggedIn ? (
          <div>
            <HamburgerIcon
              onClick={() => {
                console.log("Clicked");
                setshowSideBar((p) => !p);
              }}
            />

            <Header />
            <div className="flex">
              <SideBar showSideBar={showSideBar} />
              <Routes>
                <Route path="/home" Component={CreateJob} />
                <Route path="/" Component={Dashboard} />
                <Route path="/jobDetail/:id" Component={JobDetail} />
                <Route path="/jobDetail/:id" Component={JobDetail} />
                <Route path="/generateInvoice" Component={GenerateInvoice} />
                <Route path="/manageContacts" Component={Contacts} />
                <Route path="/invoicePdf" Component={InvoicePdf} />
                <Route path="/invoice" Component={Invoice} />

                <Route path="/testPdf" Component={TestingInvoice} />
                <Route path="/quotationDoc" Component={QuotationDoc} />

                <Route path="/manageUsers" Component={ManageUsers} />
                <Route path="/search" Component={SearchPage} />
                <Route path="/analytics" Component={Analytics} />
                <Route path="/billofladdle" Component={BillOfLaddle} />
                <Route path="/generateJob" Component={GenerateJob} />
                <Route path="/airwayBill" Component={AirwayBill} />
                <Route path="/cargoManifest" Component={CargoManifest} />
                <Route path="/ProofOfDelivery" Component={ProofOfDelivery} />

                <Route path="*" Component={NotFound} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/auth" Component={Authenticate} />
            <Route path="*" Component={Authenticate} />
          </Routes>
        )}
      </Suspense>
    </div>
  );
}

export default App;
