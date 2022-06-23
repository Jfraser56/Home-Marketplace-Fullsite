import { useContext } from "react";
import ModalContext from "../../context/ModalContext";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";

function ProfileDropDown({ active }) {
  const { navigateTo } = useContext(ModalContext);

  const logOut = async () => {
    await signOut(auth);
    navigateTo("/");
  };

  return (
    <div
      className={`drop-down absolute rounded-l border bg-white top-40 lg:top-16 w-screen lg:w-80 lg:right-2 z-30 ${
        !active && "hidden"
      }`}
    >
      <ul className="drop-down text-center">
        <li
          onClick={() => {
            navigateTo("/my-account/saved-homes");
          }}
          className="transition px-3 py-4 hover:bg-green-500/20 border-b cursor-pointer font-notoSans font-light"
        >
          Saved homes
        </li>
        <li
          onClick={() => {
            navigateTo("/my-account/manage-listings");
          }}
          className="transition px-3 py-4 hover:bg-green-500/20 border-b cursor-pointer font-notoSans font-light"
        >
          Manage your listings
        </li>
        <li
          onClick={() => {
            navigateTo("/my-account/profile-settings");
          }}
          className="transition px-3 py-4 hover:bg-green-500/20 cursor-pointer font-notoSans font-light"
        >
          Profile Settings
        </li>
        <li className="transition h-[2px] mx-auto bg-gray-200 cursor-pointer font-notoSans font-light"></li>
        <li
          onClick={logOut}
          className="transition px-3 py-4 hover:bg-green-500/20 cursor-pointer font-notoSans font-light"
        >
          Sign out
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropDown;
