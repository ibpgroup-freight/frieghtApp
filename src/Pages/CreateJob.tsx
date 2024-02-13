import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import Inquiry from "../Components/Inquiry";
import Transaction from "../Components/Transaction";
import { useContext } from "react";
import { ModalCtx } from "../store/Modal";
import { useNavigate, useSearchParams } from "react-router-dom";
function Home() {
  const ctx = useContext(ModalCtx);
  const params = useSearchParams();
  const type = params[0].get("method");
  const navigate = useNavigate();
  useEffect(() => {
    if (!type) {
      console.log("redirect");
      navigate("/");
    }
  }, []);

  return (
    <div className={`flex ${ctx.toggle ? "bg-slate-300" : ""} w-full`}>
      <Transaction />
    </div>
  );
}

export default Home;
