import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { auth } from "../../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import ModalContext from "../../context/ModalContext";
import { BsCheck } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import FormButton from "./FormButton";
import { toast } from "react-toastify";

function SignUpForm() {
  const { setToggleSignInModal } = useContext(ModalContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    screenname: "",
    photo: "",
    email: "",
    password: "",
    listings: [],
    savedListings: [],
    savedSearches: [],
  });

  const navigate = useNavigate();

  const re = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/; //Password Validation

  const handleChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        profileData.email,
        profileData.password
      );
      delete profileData.password;
      setToggleSignInModal(false);
      setDoc(doc(db, "users", auth.currentUser.uid), {
        ...profileData,
        timestamp: serverTimestamp(),
      });
      navigate("/");
    } catch (error) {
      // Clear input fields
      toast.error("Invalid email or password");
      setProfileData({ ...profileData, email: "", password: "" });
      setIsChecked(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      re.test(profileData.password) &&
      isChecked &&
      profileData.email &&
      profileData.name
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isChecked, profileData]);

  return (
    <form
      onSubmit={registerUser}
      className="flex flex-col items-start px-2 py-5 text-right "
    >
      <label className="text-sm" htmlFor="name">
        Name
      </label>
      <input
        onChange={handleChange}
        value={profileData.name}
        type="text"
        id="name"
        placeholder="Enter name"
        className="py-2 px-5 mt-1 mb-4 w-full bg-gray-100 rounded-sm border-[1px] border-gray-300 outline-none"
      />
      <label className="text-sm" htmlFor="email">
        Email
      </label>
      <input
        onChange={handleChange}
        value={profileData.email}
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
        value={profileData.password}
        type="password"
        id="password"
        placeholder="Create password"
        className="py-2 px-5 mt-1 mb-2 w-full bg-gray-100 rounded-sm border-[1px] border-gray-300 outline-none"
      />
      <ul className="text-left ml-3 mb-4 space-y-1">
        <li
          className={`font-light text-xs ${
            profileData.password.length === 0
              ? "text-gray-600"
              : profileData.password.length > 5
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          At least 6 characters{" "}
          {profileData.password.length === 0 ? (
            ""
          ) : profileData.password.length > 5 ? (
            <BsCheck className="inline" size="1.2rem" />
          ) : (
            <IoMdClose className="inline" size="0.9rem" />
          )}
        </li>
        <li
          className={`font-light text-xs ${
            profileData.password.length === 0
              ? "text-gray-600"
              : profileData.password.match(/[0-9]/)
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          At least 1 number{" "}
          {profileData.password.length === 0 ? (
            ""
          ) : profileData.password.match(/[0-9]/) ? (
            <BsCheck className="inline" size="1.2rem" />
          ) : (
            <IoMdClose className="inline" size="0.9rem" />
          )}
        </li>
        <li
          className={`font-light text-xs ${
            profileData.password.length === 0
              ? "text-gray-600"
              : profileData.password.match(/[A-Z]/)
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          At least 1 uppercase letter{" "}
          {profileData.password.length === 0 ? (
            ""
          ) : profileData.password.match(/[A-Z]/) ? (
            <BsCheck className="inline" size="1.2rem" />
          ) : (
            <IoMdClose className="inline" size="0.9rem" />
          )}
        </li>
        <li
          className={`font-light text-xs ${
            profileData.password.length === 0
              ? "text-gray-600"
              : profileData.password.match(/[#?!@$%^&*-]/)
              ? "text-green-500"
              : "text-red-500 font-bold"
          }`}
        >
          At least 1 special character{" "}
          {profileData.password.length === 0 ? (
            ""
          ) : profileData.password.match(/[#?!@$%^&*-]/) ? (
            <BsCheck className="inline" size="1.2rem" />
          ) : (
            <IoMdClose className="inline" size="0.9rem" />
          )}
        </li>
      </ul>
      <div className="flex items-center space-x-3 mb-8">
        <input
          onChange={handleChecked}
          checked={isChecked}
          id="checkbox"
          type="checkbox"
          className="h-5 w-5 outline-none cursor-pointer "
        />
        <label htmlFor="checkbox" className="cursor-pointer text-sm">
          I agree to the <strong>fake</strong> terms and conditions checkbox
        </label>
      </div>

      <FormButton
        text="Create account"
        disabled={isDisabled}
        password={profileData.password}
      />
    </form>
  );
}

export default SignUpForm;
