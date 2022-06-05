import { useState, useContext } from "react";
import ModalContext from "../../context/ModalContext";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import ProfileIcon from "./ProfileIcon";

function Header() {
  const [user, setUser] = useState({});
  const { toggleSignInModal, setToggleSignInModal } = useContext(ModalContext);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <header className="shadow bg-white">
      <nav className="h-20 flex justify-between items-center container mx-auto">
        <ul className="flex space-x-8 ">
          <li>
            <Link
              className="transition hover:text-green-600"
              to="/homes/sale/recent"
            >
              Buy
            </Link>
          </li>
          <li>
            <Link
              className="transition hover:text-green-600"
              to="/homes/rent/recent"
            >
              Rent
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-green-600" to="/sell">
              Sell
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-green-600" to="/explore">
              Explore
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-green-600" to="/offers">
              Offers
            </Link>
          </li>
        </ul>
        <Link to="/">
          <h1 className="text-3xl font-bold">
            SellYour<span className="text-green-600">Place</span>
          </h1>
        </Link>
        <ul className="flex space-x-8 items-center">
          <li>
            <Link
              className="whitespace-nowrap transition hover:text-green-600"
              to="/my-account/manage-listings"
            >
              Manage Listings
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-green-600" to="/about">
              About
            </Link>
          </li>
          <li>
            {user ? (
              <ProfileIcon user={user} />
            ) : (
              <button
                onClick={() => setToggleSignInModal(!toggleSignInModal)}
                className="transition hover:text-green-600"
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
