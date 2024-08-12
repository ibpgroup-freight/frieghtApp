import React, { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase.js";
import useUser from "../store/User";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../Components/CustomLoader";
import { addDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
function Authenticate() {
  const [signup, setsignup] = useState(false);
  const { AuthStateLogIn } = useUser();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const phoneRed = useRef<HTMLInputElement | null>(null);
  const [Loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const logInUser = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current?.value!,
        passwordRef.current?.value!
      ).then(async (r) => {
        console.log(r.user);
        // AuthStateLogIn();
        navigate("/");
      });
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  const registerUser = async () => {
    setLoading(true);
    try {
      const u = await createUserWithEmailAndPassword(
        auth,
        emailRef.current?.value!,
        passwordRef.current?.value!
      );
      await setDoc(doc(db, "users", u.user.uid), {
        email: emailRef.current?.value!,
        username: nameRef.current?.value!,
        role: "User",
        phone: phoneRed.current?.value,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full h-screen flex flex-row">
      <div className="w-1/2 bg-blue-600"></div>
      <div className="w-1/2 flex h-full flex-col justify-center items-center bg-slate-100 space-y-5 ">
        <h1 className="text-4xl uppercase">Authenticate</h1>
        {signup && (
          <input
            type="text"
            placeholder="Enter Name"
            className="focus:outline-none px-2 py-3 border-2 border-slate-500 rounded-md w-80"
            ref={nameRef}
          />
        )}
        {signup && (
          <input
            type="text"
            placeholder="Enter Phone"
            className="focus:outline-none px-2 py-3 border-2 border-slate-500 rounded-md w-80"
            ref={phoneRed}
          />
        )}
        <input
          type="email"
          placeholder="Enter Email"
          className="focus:outline-none px-2 py-3 border-2 border-slate-500 rounded-md w-80"
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="focus:outline-none px-2 py-3 border-2 border-slate-500 rounded-md w-80"
          ref={passwordRef}
        />
        <button
          className="  text-sky-400 rounded-md px-2 py-3 "
          onClick={() => navigate("/forgotpassword")}
        >
          Forgot Password?
        </button>
        <button
          className="bg-sky-500  text-white rounded-md px-2 py-3 "
          onClick={signup ? registerUser : logInUser}
          disabled={Loading}
        >
          {Loading ? (
            <CustomLoader customStyle="w-17 !h-12 color-white" height={50} />
          ) : (
            "Submit"
          )}
        </button>

        <button
          className="cursor-pointer text-violet-700"
          onClick={() => setsignup((p) => !p)}
        >
          {signup ? "Login" : "Signup"} Instead
        </button>
      </div>
    </section>
  );
}

export default Authenticate;
