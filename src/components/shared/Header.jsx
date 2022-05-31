import { useState, useContext } from "react";
import ModalContext from "../../context/ModalContext";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import logoSvg from "../../assets/svg/logo.svg";
import ProfileIcon from "./ProfileIcon";

function Header() {
  const [user, setUser] = useState({});
  const { toggleSignInModal, setToggleSignInModal } = useContext(ModalContext);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const getCurrentLocation = () => {
    // Do geocoding and get city name of coords of current location
    // If no current location, return boston-ma
  };

  return (
    <header className="shadow-md bg-white">
      <nav className="h-20 flex justify-between items-center mx-10 lg:container lg:mx-auto">
        <ul className="flex space-x-8 ">
          <li>
            <Link
              onClick={getCurrentLocation}
              className=" transition hover:text-green-500"
              to="/homes/sale/recent"
            >
              Buy
            </Link>
          </li>
          <li>
            <Link
              className=" transition hover:text-green-500"
              to="/homes/rent/recent"
            >
              Rent
            </Link>
          </li>
          <li>
            <Link className=" transition hover:text-green-500" to="/sell">
              Sell
            </Link>
          </li>
          <li>
            <Link className=" transition hover:text-green-500" to="/explore">
              Explore
            </Link>
          </li>
          <li>
            <Link className=" transition hover:text-green-500" to="/offers">
              Offers
            </Link>
          </li>
        </ul>
        <Link to="/">
          <img src={logoSvg} alt="Zillow" className="h-9" />
        </Link>
        <ul className="flex space-x-14 items-center">
          <li>
            <Link
              className=" whitespace-nowrap transition hover:text-green-500"
              to="/my-account/manage-listings"
            >
              Manage Listings
            </Link>
          </li>
          <li>
            <Link className=" transition hover:text-green-500" to="/about">
              About
            </Link>
          </li>
          <li>
            {user ? (
              <ProfileIcon user={user} />
            ) : (
              <button
                onClick={() => setToggleSignInModal(!toggleSignInModal)}
                className=" 
                transition hover:text-green-500"
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
