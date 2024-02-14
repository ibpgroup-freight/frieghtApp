import React, { Suspense, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import SideBar from "./Components/SIdeBar";
import { Oval } from "react-loader-spinner";
import Contacts from "./Pages/Contacts";
import InvoicePdf from "./Components/InvoicePdf";
import useUser from "./store/User";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "react-toastify/dist/ReactToastify.css";
import HamburgerIcon from "./Components/Hamburger";
import { ToastContainer } from "react-toastify";
import CustomLoader from "./Components/CustomLoader";
import { FormikProvider } from "formik";
import TestingInvoice from "./Components/TestingInvoice";
import ManageUsers from "./Pages/ManageUsers";
import Analytics from "./Pages/Analytics";
import BillOfLaddle from "./Pages/BillOfLaddle";
const CreateJob = React.lazy(() => import("./Pages/CreateJob"));
const JobDetail = React.lazy(() => import("./Pages/JobDetail"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Authenticate = React.lazy(() => import("./Pages/Authenticate"));
const GenerateInvoice = React.lazy(() => import("./Pages/GenerateInvoice"));
const SearchPage = React.lazy(() => import("./Pages/Search"));
function App() {
  const { isloggedIn, AuthStateLogIn } = useUser();
  const [isloading, setisloading] = useState(true);
  const [showSideBar, setshowSideBar] = useState<boolean>(false);
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
                <Route path="/testPdf" Component={TestingInvoice} />
                <Route path="/manageUsers" Component={ManageUsers} />
                <Route path="/search" Component={SearchPage} />
                <Route path="/analytics" Component={Analytics} />
                <Route path="/billofladdle" Component={BillOfLaddle} />

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
