import { useState } from "react";
import { useContext } from "react";
import ModalContext from "../../context/ModalContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase.config";
import { IoMdClose } from "react-icons/io";
import FormButton from "./FormButton";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [emailInput, setEmailInput] = useState("");

  const { toggleSignInModal, setToggleSignInModal, setForgotPassword } =
    useContext(ModalContext);

  const handleClick = () => {
    setToggleSignInModal(!toggleSignInModal);
    setForgotPassword(false);
  };

  const handleChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handlePasswordResetEmail = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, emailInput);
      toast.success("Email sent!");
    } catch (error) {
      toast.error("Invalid Email Address");
    }
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
    <motion.div
      onClick={(e) => e.stopPropagation()}
      variants={modal}
      className="relative flex flex-col justify-start text-center w-screen sm:w-[30rem] p-10 mx-auto my-24 bg-white shadow-2xl rounded-md overflow-y-auto"
    >
      <button onClick={handleClick} className="absolute top-4 right-4">
        <IoMdClose
          size={25}
          className="transition hover:fill-green-500 hover:scale-110"
        />
      </button>
      <h2 className="font-noto font-semibold text-2xl mb-3">
        Forgot your Password?
      </h2>
      <p className="font-light mb-5">
        Enter your email address and we'll send you a link to set your password.
      </p>
      <form onSubmit={handlePasswordResetEmail} className="text-left">
        <label className="text-sm" htmlFor="email">
          Email
        </label>
        <input
          onChange={handleChange}
          value={emailInput}
          type="text"
          id="email"
          placeholder="Enter email"
          className="py-2 px-5 mt-1 mb-8 w-full bg-gray-100 rounded-sm border-[1px] border-gray-300 outline-none"
        />
        <FormButton text="Send" /> {/*Redirect to 'Link Sent!' page */}
      </form>
      <p className="font-light mt-1">
        Know your password?{" "}
        <span
          onClick={() => setForgotPassword(false)}
          className="cursor-pointer text-green-600"
        >
          Sign In
        </span>
      </p>
    </motion.div>
  );
}

export default ForgotPassword;
