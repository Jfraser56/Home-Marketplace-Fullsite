import { createContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
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
    console.log("asdfasdf");
  };

  const toggleProfileDropDown = () => {
    setProfileDropDown(!profileDropDown);
  };
  const closeProfileDropDown = () => {
    setProfileDropDown(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getUser();
        setUser(currentUser);
      } else {
        setUser();
      }
    });
  }, []);

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
