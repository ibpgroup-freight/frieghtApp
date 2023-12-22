import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";

const Home = React.lazy(() => import("./Pages/Home"));
function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/home" Component={Home} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
