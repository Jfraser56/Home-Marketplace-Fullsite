import { useEffect, useState, useRef } from "react";
import { updateEmail } from "firebase/auth";
import { db, auth } from "../../../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

function ProfileEmailInput({ profileData, activeModal, setActiveModal }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [emailForm, setEmailForm] = useState({
    current: profileData.email,
    new: "",
    confirm: "",
  });

  const modalRef = useRef();

  const openEmailModal = () => {
    setActiveModal("email");
    modalRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const closeEmailModal = () => {
    setActiveModal(null);
  };

  const handleEmailForm = (e) => {
    setEmailForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const fetchUpdatedEmail = async () => {
    const result = await getDoc(doc(db, "users", auth.currentUser.uid));
    setEmailForm((prev) => ({
      ...prev,
      current: result.data().email,
    }));
  };

  const handleUpdateEmail = async () => {
    try {
      await updateEmail(auth.currentUser, emailForm.new);
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        email: emailForm.new,
      });
      toast.success("Email saved!");
    } catch (error) {
      toast.error("Email invalid");
      console.log(error);
    }
    fetchUpdatedEmail();
    closeEmailModal();
  };

  useEffect(() => {
    if (emailForm.new && emailForm.new === emailForm.confirm) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [emailForm]);

  // useEffect(() => {
  //   //Fetch email data on render
  //   fetchUpdatedEmail();
  // }, []);

  return (
    <div className="relative space-y-2 border-b-[1px] pb-3 mb-5 ml-3 border-gray-300">
      <h3 className="text-sm font-semibold" htmlFor="name">
        Email
      </h3>
      <div className="flex flex-col md:flex-row justify-between">
        <p className="w-full text-gray-400 font-light">
          The email associated with your account
        </p>
        <div className="flex items-center">
          <p className="text-center mr-7">{emailForm.current}</p>
          <p
            ref={modalRef}
            onClick={openEmailModal}
            className="transition p-1 mr-7 text-sm font-semibold text-center underline cursor-pointer text-green-500 hover:scale-105"
          >
            Edit
          </p>
        </div>
      </div>
      {activeModal === "email" && (
        <>
          <div className="absolute flex flex-col items-center z-10 w-96 -right-10 top-16 rounded-sm shadow-lg bg-slate-50">
            <IoMdClose
              className="absolute top-2 right-2 transition duration-300 hover:text-green-500"
              onClick={closeEmailModal}
            />
            <div className="px-6 py-4">
              <h3 className="text-center mb-2 text-xl font-notoSerif font-semibold">
                Update email
              </h3>
              <div className="h-[1px] w-full bg-gray-300 mb-6"></div>
              <label className="text-sm" htmlFor="new">
                New email
              </label>
              <input
                onChange={(e) => handleEmailForm(e)}
                value={emailForm.new}
                type="email"
                id="new"
                className="py-2 px-5 mt-1 mb-6 w-full bg-gray-100 rounded-sm border-[1px] border-gray-300 outline-none"
              />
              <label className="text-sm" htmlFor="confirm">
                Confirm email
              </label>
              <input
                onChange={(e) => handleEmailForm(e)}
                value={emailForm.confirm}
                type="email"
                id="confirm"
                className="py-2 px-5 w-full mt-1 mb-6 bg-gray-100 rounded-sm border-[1px] border-gray-300 outline-none"
              />
              <button
                onClick={handleUpdateEmail}
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

export default ProfileEmailInput;
