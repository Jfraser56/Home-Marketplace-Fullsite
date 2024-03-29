import { useState, useEffect } from "react";
import { db } from "../../../firebase.config";
import { auth } from "../../../firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import Spinner from "../../shared/Spinner";
import { toast } from "react-toastify";
import ProfileTextInput from "./ProfileTextInput";
import ProfileIconInput from "./ProfileIconInput";
import ProfileEmailInput from "./ProfileEmailInput";
import ProfilePasswordInput from "./ProfilePasswordInput";
import DeleteAccount from "./DeleteAccount";

function ProfileSettings({ user }) {
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    screenname: "",
    photo: "",
  });

  //Submit changes to profile form - push to firebase
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", auth.currentUser.uid);

    if (edit) {
      try {
        updateDoc(userRef, profileData);
        toast.success("Changes saved!");
      } catch (error) {
        toast.error("An error occured");
      }
    }
    setEdit(!edit);
  };

  const handleFormChange = (input) => {
    //If function is called from photoIcon button -> variables are different -> id represents which icon is selected
    if (/[0-9]/.test(+input.id)) {
      setProfileData((prev) => ({ ...prev, photo: input.id }));
    } else {
      setProfileData((prev) => ({ ...prev, [input.id]: input.value }));
    }
  };

  const populateForm = async () => {
    setProfileData(user);
    setLoading(false);
  };

  useEffect(() => {
    //Populate form with User's profile data on render
    if (user) {
      populateForm();
    }
  }, [user]);

  return profileData && !loading ? (
    <form
      onSubmit={handleFormSubmit}
      className="w-full h-auto p-10 bg-white border-[1px] border-gray-300"
    >
      <div className="flex items-center space-x-5 mb-5">
        <h1 className="font-medium text-2xl ">Profile Info</h1>
        <button
          className="mr-5 py-1 px-3 border-[1px] outline-none border-green-600 rounded-sm text-green-600 bg-green-600/0 hover:bg-green-600 hover:text-white duration-300"
          type="submit"
        >
          {!edit ? "Edit profile" : "Apply changes"}
        </button>
      </div>
      <ProfileTextInput
        edit={edit}
        title="Name"
        desc="Enter your first and last name...this will appear on your listings"
        profileData={profileData}
        handleFormChange={handleFormChange}
      />
      <ProfileTextInput
        edit={edit}
        title="Screen Name"
        desc="If your prefer to remain anonymous while writing reviews, create a
            user name"
        profileData={profileData}
        handleFormChange={handleFormChange}
      />
      <ProfileIconInput
        edit={edit}
        profileData={profileData}
        handleFormChange={handleFormChange}
      />
      <h1 className="font-medium text-2xl mb-5">Sign in & security</h1>
      <ProfileEmailInput
        profileData={profileData}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
      <ProfilePasswordInput
        edit={edit}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
      <h1 className="font-medium text-2xl mb-5">Manage account</h1>
      <DeleteAccount />
    </form>
  ) : (
    <Spinner />
  );
}

export default ProfileSettings;
