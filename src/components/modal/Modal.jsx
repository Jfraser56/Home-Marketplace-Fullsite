import React from "react";
import { useState, useContext } from "react";
import ModalContext from "../../context/ModalContext";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import GoogleSignIn from "./GoogleSignIn";
import ForgotPassword from "./ForgotPassword";

function Modal() {
  const {
    toggleSignInModal,
    setToggleSignInModal,
    forgotPassword,
    setForgotPassword,
  } = useContext(ModalContext);
  const [toggleForm, setToggleForm] = useState(false);

  const handleToggleForm = (e) => {
    e.target.id === "signIn" ? setToggleForm(true) : setToggleForm(false);
  };

  //Animate In
  const backDrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.2 } },
    exit: { opacity: 0 },
  };
  const modal = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        bounce: 0.3,
      },
    },
    exit: { scale: 0 },
  };

  return (
    <>
      <motion.div
        onClick={() => {
          setToggleSignInModal(!toggleSignInModal);
          setForgotPassword(false);
        }}
        className="z-20 absolute w-screen h-screen bg-black/80"
        variants={backDrop}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {forgotPassword ? (
          <ForgotPassword />
        ) : (
          <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={modal}
            className="relative flex flex-col justify-start text-center h-5/6 w-[30rem] p-10 mx-auto my-[5vh] bg-white shadow-2xl rounded-md overflow-y-auto"
          >
            <button
              onClick={() => setToggleSignInModal(!toggleSignInModal)}
              className="absolute top-4 right-4"
            >
              <IoMdClose
                size={25}
                className="transition hover:fill-green-500 hover:scale-110"
              />
            </button>
            <h2 className="font-notoSerif font-semibold text-2xl mb-7">
              Welcome to Zillow
            </h2>
            <ul className="flex space-x-5 border-b-2">
              <li>
                <button
                  id="signUp"
                  onClick={handleToggleForm}
                  className={`transition px-5 py-3 font-light hover:text-green-500 ${
                    !toggleForm && "text-green-500 border-b-4 border-green-500"
                  }`}
                >
                  Sign In
                </button>
              </li>
              <li>
                <button
                  id="signIn"
                  onClick={handleToggleForm}
                  className={`transition px-5 py-3 font-light hover:text-green-500 ${
                    toggleForm && "text-green-500 border-b-4 border-green-500"
                  }`}
                >
                  New Account
                </button>
              </li>
            </ul>
            {!toggleForm ? <SignInForm /> : <SignUpForm />}
            <GoogleSignIn />
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

export default Modal;
