import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import SideBar from "./Components/SIdeBar";
const Home = React.lazy(() => import("./Pages/Home"));
function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex">
        <SideBar />
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path="/home" Component={Home} />
            <Route path="/dashboard" Component={Dashboard} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
