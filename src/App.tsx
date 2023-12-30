import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import SideBar from "./Components/SIdeBar";
import { Oval } from "react-loader-spinner";
import Contacts from "./Pages/Contacts";
import InvoicePdf from "./Components/InvoicePdf";
const CreateJob = React.lazy(() => import("./Pages/CreateJob"));
const JobDetail = React.lazy(() => import("./Pages/JobDetail"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const GenerateInvoice = React.lazy(() => import("./Pages/GenerateInvoice"));

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex">
        <SideBar />
        <Suspense
          fallback={
            <div className="w-full h-screen flex justify-center items-center">
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#0000FF"
                secondaryColor="#0000FF"
                ariaLabel="oval-loading"
              />
            </div>
          }
        >
          <Routes>
            <Route path="/home" Component={CreateJob} />
            <Route path="/" Component={Dashboard} />
            <Route path="/jobDetail/:id" Component={JobDetail} />
            <Route path="/jobDetail/:id" Component={JobDetail} />
            <Route path="/generateInvoice" Component={GenerateInvoice} />
            <Route path="/manageContacts" Component={Contacts} />
            <Route path="/invoicePdf" Component={InvoicePdf} />

            <Route path="*" Component={NotFound} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
