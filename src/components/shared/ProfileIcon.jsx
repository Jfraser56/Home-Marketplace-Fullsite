import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import ProfileDropDown from "../my-account/ProfileDropDown";
import defaultIcon from "../../assets/png/default-profile-picture.png";
import profilePicture2 from "../../assets/png/profile-picture-2.png";
import profilePicture3 from "../../assets/png/profile-picture-3.png";
import profilePicture1 from "../../assets/png/profile-picture-1.png";
import profilePicture4 from "../../assets/png/profile-picture-4.png";
import profilePicture5 from "../../assets/png/profile-picture-5.png";

function ProfileIcon() {
  const { toggleProfileDropDown, profileDropDown, profileIcon } =
    useContext(ProfileContext);

  const profileIcons = [
    profilePicture1,
    profilePicture2,
    profilePicture3,
    profilePicture4,
    profilePicture5,
  ];

  return (
    <>
      <div
        className="transition w-9 h-9 rounded-full overflow-hidden cursor-pointer hover:scale-110"
        onClick={toggleProfileDropDown}
      >
        <img
          className="drop-down scale-110"
          src={profileIcon ? profileIcons[profileIcon] : defaultIcon}
          alt="profile-icon"
        />
      </div>
      <ProfileDropDown active={profileDropDown} />
    </>
  );
}

export default ProfileIcon;
