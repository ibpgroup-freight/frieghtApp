import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import SideBar from "./Components/SIdeBar";
const CreateJob = React.lazy(() => import("./Pages/CreateJob"));
const JobDetail = React.lazy(() => import("./Pages/JobDetail"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex">
        <SideBar />
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path="/home" Component={CreateJob} />
            <Route path="/" Component={Dashboard} />
            <Route path="/jobDetail/:id" Component={JobDetail} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
