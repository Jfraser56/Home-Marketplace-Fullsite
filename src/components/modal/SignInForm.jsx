import { useEffect, useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import ModalContext from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import FormButton from "./FormButton";
import { toast } from "react-toastify";

function SignInForm() {
  const { setToggleSignInModal, setForgotPassword } = useContext(ModalContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setToggleSignInModal(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Email or password incorrect!");
      setFormData({ email: "", password: "" });
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    if (formData.password && formData.email) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData]);

  return (
    <>
      <form
        onSubmit={loginUser}
        className="flex flex-col items-start px-2 pt-5 "
      >
        <label className="text-sm" htmlFor="email">
          Email
        </label>
        <input
          onChange={handleChange}
          value={formData.email}
          type="text"
          id="email"
          placeholder="Enter email"
          className="py-2 px-5 mt-1 mb-4 w-full bg-gray-100 rounded-sm border-[1px] border-gray-300 outline-none"
        />
        <label className="text-sm" htmlFor="password">
          Password
        </label>
        <input
          onChange={handleChange}
          value={formData.password}
          type="password"
          id="password"
          placeholder="Password"
          className="py-2 px-5 mt-1 mb-8 w-full bg-gray-100 rounded-sm border-[1px] border-gray-300 outline-none"
        />
        <FormButton text="Sign in" disabled={isDisabled} />
      </form>
      <button
        onClick={() => setForgotPassword(true)}
        type="text"
        className="transition mx-auto mt-3 mb-5 text-green-700 font-medium hover:scale-105"
      >
        Forgot your Password?
      </button>
    </>
  );
}

export default SignInForm;
