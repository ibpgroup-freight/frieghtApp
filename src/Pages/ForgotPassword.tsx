import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { LoaderIcon } from "react-hot-toast";
function ForgotPassword() {
  const [Loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<any>();
  const navigate = useNavigate();
  const resetPassword = async () => {
    try {
      if (!emailRef.current.value) return toast.error("Please Enter Email");
      setLoading(true);
      const res = await sendPasswordResetEmail(auth, emailRef.current.value);
      console.log("Res void", res);
      toast.success("Password Reset Link Send to Your Email");
    } catch (e) {
      toast.error("An Error Occured");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full h-screen flex flex-row">
      <div className="w-1/2 bg-blue-600"></div>
      <div className="w-1/2 flex h-full flex-col justify-center items-center bg-slate-100 space-y-5 ">
        <h1 className="text-4xl uppercase">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="focus:outline-none px-2 py-3 border-2 border-slate-500 rounded-md w-80"
          ref={emailRef}
        />
        <h1>Enter Your Email Address to Link TO</h1>
        <button
          className="bg-sky-500  text-white rounded-md px-2 py-3 "
          onClick={() => resetPassword()}
          disabled={Loading}
        >
          {Loading ? <LoaderIcon /> : "Send Link"}
        </button>
      </div>
    </section>
  );
}

export default ForgotPassword;
