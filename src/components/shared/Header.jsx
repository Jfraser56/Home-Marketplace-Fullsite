import { useState, useContext } from "react";
import ModalContext from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import ProfileIcon from "./ProfileIcon";

function Header() {
  const [user, setUser] = useState({});
  const [mobileNav, setMobileNav] = useState(false);
  const { toggleSignInModal, setToggleSignInModal } = useContext(ModalContext);

  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const showMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  const navigateTo = (url) => {
    setMobileNav(false);
    navigate(url);
  };

  return (
    <header className="shadow bg-white">
      <nav className="h-20 flex justify-between items-center container mx-auto">
        <ul
          className={`${
            !mobileNav && "hidden lg:flex"
          } flex flex-col lg:flex-row items-center absolute lg:static top-20 lg:top-0 left-0 right-0 bg-white lg:space-y-0 lg:space-x-5 z-20 `}
        >
          <li
            onClick={() => navigateTo("/homes/sale/recent")}
            className="border-y lg:border-none w-full text-center p-3 transition hover:text-green-600"
          >
            Buy
          </li>
          <li
            onClick={() => navigateTo("/homes/rent/recent")}
            className="border-b lg:border-none w-full text-center p-3 transition hover:text-green-600"
          >
            Rent
          </li>
          <li
            onClick={() => navigateTo("/sell")}
            className="border-b lg:border-none w-full text-center p-3 transition hover:text-green-600"
          >
            Sell
          </li>
          <li
            onClick={() => navigateTo("/explore")}
            className="border-b lg:border-none w-full text-center p-3 transition hover:text-green-600"
          >
            Explore
          </li>
          <li
            onClick={() => navigateTo("/offers")}
            className="border-b lg:border-none w-full text-center p-3 transition hover:text-green-600"
          >
            Offers
          </li>
        </ul>
        <h1
          onClick={() => navigateTo("/")}
          className="text-3xl font-bold ml-5 lg:ml-0"
        >
          SellYour<span className="text-green-600">Place</span>
        </h1>
        <div
          onClick={showMobileNav}
          className="lg:hidden mr-5 w-5 cursor-pointer"
        >
          <div
            className={`transition-all h-[3px] w-full mb-1 bg-black ${
              mobileNav && "rotate-45 translate-y-[6px] "
            } `}
          ></div>
          <div
            className={`transition h-[3px] w-full mb-1 bg-black ${
              mobileNav && "opacity-0"
            } `}
          ></div>
          <div
            className={`transition h-[3px] w-full mb-1 bg-black ${
              mobileNav && "-rotate-45 -translate-y-2"
            } `}
          ></div>
        </div>

        <ul
          className={`${
            !mobileNav && "hidden lg:flex"
          } flex flex-col lg:flex-row items-center absolute lg:static top-80  lg:top-0 left-0 right-0 bg-white lg:space-y-0 lg:space-x-5 z-10 `}
        >
          <li
            onClick={() => navigateTo("/my-account/manage-listings")}
            className="border-y lg:border-none w-full text-center p-3 transition hover:text-green-600 whitespace-nowrap "
          >
            Manage Listings
          </li>
          <li
            onClick={() => navigateTo("/about")}
            className="border-b lg:border-none w-full text-center p-3 transition hover:text-green-600"
          >
            About
          </li>
          <li className="flex justify-center border-b lg:border-none w-full p-3">
            {user ? (
              <ProfileIcon user={user} />
            ) : (
              <button
                onClick={() => setToggleSignInModal(!toggleSignInModal)}
                className="transition hover:text-green-600 whitespace-nowrap"
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
