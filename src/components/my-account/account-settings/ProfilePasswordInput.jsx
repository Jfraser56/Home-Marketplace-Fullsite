import { useState, useEffect } from "react";
import { auth } from "../../../firebase.config";
import { updatePassword } from "firebase/auth";
import { IoMdClose } from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import { toast } from "react-toastify";

function ProfilePasswordInput({ activeModal, setActiveModal }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    new: "",
    confirm: "",
  });

  const openPassModal = () => {
    setActiveModal("password");
  };

  const closePassModal = () => {
    setPasswordForm({
      new: "",
      confirm: "",
    });
    setActiveModal(null);
  };

  const handlePasswordForm = (e) => {
    setPasswordForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const re = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/; //Password Validation

  useEffect(() => {
    if (
      re.test(passwordForm.new) &&
      passwordForm.new === passwordForm.confirm
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [passwordForm]);

  const handleUpdatePassword = () => {
    try {
      updatePassword(auth.currentUser, passwordForm.new);
      toast.success("Password changed!");
    } catch (error) {
      toast.error("An error occurred");
      console.log(error); // If recent sign in is required then redirect
    }
    //clear fields and close modal
    closePassModal();
  };

  return (
    <div className="relative flex justify-between items-center border-b-[1px] pb-2 mb-5 ml-3 border-gray-300">
      <div className="space-y-2 mb-2">
        <h3 className="text-sm font-semibold" htmlFor="name">
          Password
        </h3>
        <p className="w-full text-gray-400 font-light">
          Set a unique password to protect your account
        </p>
      </div>
      <button
        onClick={openPassModal}
        className="mr-7 h-10 px-3 font-semibold border-[1px] outline-none border-green-600 rounded-sm text-green-600 bg-green-600/0 hover:bg-green-600 hover:text-white duration-300"
        type="button"
      >
        Change password
      </button>
      {activeModal === "password" && (
        <>
          <div className="absolute z-10 right-24 top-14 border-t-0 border-[0.75rem] border-x-transparent border-b-slate-50"></div>{" "}
          <div className="absolute flex flex-col items-center z-10 w-96 -right-5 top-16 rounded-sm shadow-lg bg-slate-50">
            <IoMdClose
              className="absolute top-2 right-2 transition duration-300 hover:text-green-500"
              onClick={closePassModal}
            />
            <div className="px-6 py-4">
              <h3 className="text-center mb-2 text-xl font-notoSerif font-semibold">
                Update Password
              </h3>
              <div className="h-[1px] w-full bg-gray-300 mb-6"></div>
              <label className="text-sm" htmlFor="new">
                New password
              </label>
              <input
                onChange={(e) => handlePasswordForm(e)}
                value={passwordForm.new}
                type="password"
                id="new"
                className="py-2 px-5 mt-1 mb-4 w-full bg-gray-100 rounded-sm border-[1px] border-gray-300 outline-none"
              />
              <ul className="text-left ml-3 mb-6 space-y-1">
                <li
                  className={`font-light text-xs ${
                    passwordForm.new.length === 0
                      ? "text-gray-600"
                      : passwordForm.new.length > 5
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  At least 6 characters{" "}
                  {passwordForm.new.length === 0 ? (
                    ""
                  ) : passwordForm.new.length > 5 ? (
                    <BsCheck className="inline" size="1.2rem" />
                  ) : (
                    <IoMdClose className="inline" size="0.9rem" />
                  )}
                </li>
                <li
                  className={`font-light text-xs ${
                    passwordForm.new.length === 0
                      ? "text-gray-600"
                      : passwordForm.new.match(/[0-9]/)
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  At least 1 number{" "}
                  {passwordForm.new.length === 0 ? (
                    ""
                  ) : passwordForm.new.match(/[0-9]/) ? (
                    <BsCheck className="inline" size="1.2rem" />
                  ) : (
                    <IoMdClose className="inline" size="0.9rem" />
                  )}
                </li>
                <li
                  className={`font-light text-xs ${
                    passwordForm.new.length === 0
                      ? "text-gray-600"
                      : passwordForm.new.match(/[A-Z]/)
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  At least 1 uppercase letter{" "}
                  {passwordForm.new.length === 0 ? (
                    ""
                  ) : passwordForm.new.match(/[A-Z]/) ? (
                    <BsCheck className="inline" size="1.2rem" />
                  ) : (
                    <IoMdClose className="inline" size="0.9rem" />
                  )}
                </li>
                <li
                  className={`font-light text-xs ${
                    passwordForm.new.length === 0
                      ? "text-gray-600"
                      : passwordForm.new.match(/[#?!@$%^&*-]/)
                      ? "text-green-500"
                      : "text-red-500 font-bold"
                  }`}
                >
                  At least 1 special character{" "}
                  {passwordForm.new.length === 0 ? (
                    ""
                  ) : passwordForm.new.match(/[#?!@$%^&*-]/) ? (
                    <BsCheck className="inline" size="1.2rem" />
                  ) : (
                    <IoMdClose className="inline" size="0.9rem" />
                  )}
                </li>
              </ul>
              <label className="text-sm" htmlFor="confirm">
                Confirm password
              </label>
              <input
                onChange={(e) => handlePasswordForm(e)}
                value={passwordForm.confirm}
                type="password"
                id="confirm"
                className="py-2 px-5 w-full mt-1 mb-4 bg-gray-100 rounded-sm border-[1px] border-gray-300 outline-none"
              />
              <button
                onClick={handleUpdatePassword}
                type="button"
                disabled={isDisabled}
                className={`transition py-3 w-full rounded-md font-normal tracking-wide text-white ${
                  isDisabled
                    ? "bg-green-500/50"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePasswordInput;
