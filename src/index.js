import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import { ProfileProvider } from "./context/ProfileContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <ProfileProvider>
          <ToastContainer
            theme="colored"
            position="top-right"
            pauseOnHover={false}
            autoClose="2000"
            hideProgressBar={true}
          />
          <App />
        </ProfileProvider>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
