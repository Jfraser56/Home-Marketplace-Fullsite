import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { auth } from "./firebase.config";
import ModalContext from "./context/ModalContext";
import ProfileContext from "./context/ProfileContext";
import Header from "./components/shared/Header";
import Modal from "./components/modal/Modal";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Market from "./pages/Market";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import PrivateRoute from "./pages/PrivateRoute";
import Account from "./pages/Account";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/LogIn";
import { useLoadScript } from "@react-google-maps/api";
import Spinner from "./components/shared/Spinner";
import Listing from "./pages/Listing";

function App() {
  const [libraries] = useState(["places"]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const { toggleSignInModal } = useContext(ModalContext);
  const { closeProfileDropDown } = useContext(ProfileContext);

  const closeOpenModals = (e) => {
    //Close Profile drop down when user clicks off (only if signed in)
    if (!e.target.classList.contains("drop-down") && auth.currentUser) {
      closeProfileDropDown();
    }
  };

  // console.log("render");

  return isLoaded ? (
    <div
      onClick={closeOpenModals}
      className={`relative h-screen w-full flex flex-col justify-between overflow-x-hidden bg-slate-100 ${
        toggleSignInModal && "overflow-y-hidden" //Disabled scrolling when modal is open
      }`}
    >
      <Header />
      {toggleSignInModal && <Modal className="transition duration-700" />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<PrivateRoute />}>
          <Route path="/sell" element={<Sell />} />
        </Route>

        <Route path="/homes/:type/:location" element={<Market />} />
        <Route path="/homes/home-details/:listingID" element={<Listing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-account/:segment" element={<PrivateRoute />}>
          <Route path="/my-account/:segment" element={<Account />} />
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  ) : (
    <Spinner />
  );
}

export default App;
