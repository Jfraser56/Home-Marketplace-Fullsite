import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";

function ProfileDropDown({ active }) {
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div
      className={`drop-down transition duration-300 absolute py-3 rounded-l-md top-20 w-80 z-20 bg-slate-50 -right-80 ${
        active && "-translate-x-80"
      }`}
    >
      <ul className="drop-down">
        <li
          onClick={() => {
            navigate("/my-account/saved-homes");
          }}
          className="transition p-3 hover:bg-green-500/20 cursor-pointer font-notoSans font-light"
        >
          Saved homes
        </li>
        <li
          onClick={() => {
            navigate("/my-account/manage-listings");
          }}
          className="transition p-3 hover:bg-green-500/20 cursor-pointer font-notoSans font-light"
        >
          Manage your listings
        </li>
        <li
          onClick={() => {
            navigate("/my-account/profile-settings");
          }}
          className="transition p-3 mb-2 hover:bg-green-500/20 cursor-pointer font-notoSans font-light"
        >
          Profile Settings
        </li>
        <li className="transition h-[2px] mx-auto bg-gray-200 cursor-pointer font-notoSans font-light"></li>
        <li
          onClick={logOut}
          className="transition p-3 mt-2 hover:bg-green-500/20 cursor-pointer font-notoSans font-light"
        >
          Sign out
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropDown;
