import { createContext } from "react";
import { useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  //Toggle the Sign in modal when logging in or signing up
  const [toggleSignInModal, setToggleSignInModal] = useState(false);

  //Whether to open or close forgot password form
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        toggleSignInModal,
        forgotPassword,
        setToggleSignInModal,
        setForgotPassword,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
