import React from "react";
import Dashboard from "./Dashboard";
import Inquiry from "../Components/Inquiry";
import Transaction from "../Components/Transaction";
import { useContext } from "react";
import { ModalCtx } from "../store/Modal";
function Home() {
  const ctx = useContext(ModalCtx);
  console.log("toggle ", ctx.toggle);
  return (
    <div className={`flex ${ctx.toggle ? "bg-slate-300" : ""} w-full`}>
      <Transaction />
    </div>
  );
}

export default Home;
