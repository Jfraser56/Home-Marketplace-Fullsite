import { createContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [profileIcon, setProfileIcon] = useState();

  const toggleProfileDropDown = () => {
    setProfileDropDown(!profileDropDown);
  };
  const closeProfileDropDown = () => {
    setProfileDropDown(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const activeIcon = await getDoc(docRef);
        setProfileIcon(activeIcon.data().photo);
      }
    });
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profileDropDown,
        profileIcon,
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
