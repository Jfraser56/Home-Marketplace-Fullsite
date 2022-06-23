import { createContext, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [profileIcon, setProfileIcon] = useState("");
  const [profileDropDown, setProfileDropDown] = useState(false);

  const getUser = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const user = await getDoc(userRef);
    setUser(user.data());
    setProfileIcon(user.data().photo);
  };

  const toggleProfileDropDown = () => {
    setProfileDropDown(!profileDropDown);
  };
  const closeProfileDropDown = () => {
    setProfileDropDown(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        user,
        profileDropDown,
        profileIcon,
        setUser,
        getUser,
        setProfileDropDown,
        setProfileIcon,
        toggleProfileDropDown,
        closeProfileDropDown,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
