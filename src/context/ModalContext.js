import { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const navigate = useNavigate();

  //Toggle the Sign in modal when logging in or signing up
  const [toggleSignInModal, setToggleSignInModal] = useState(false);

  //Whether to open or close forgot password form
  const [forgotPassword, setForgotPassword] = useState(false);

  //Toggles the mobile nav drop down menu
  const [mobileNav, setMobileNav] = useState(false);

  const navigateTo = (url) => {
    setMobileNav(false);
    navigate(url);
  };

  return (
    <ModalContext.Provider
      value={{
        toggleSignInModal,
        forgotPassword,
        mobileNav,
        setToggleSignInModal,
        setForgotPassword,
        setMobileNav,
        navigateTo,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
