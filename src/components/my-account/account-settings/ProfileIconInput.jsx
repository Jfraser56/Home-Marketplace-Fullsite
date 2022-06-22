import { useState, useContext } from "react";
import ProfileContext from "../../../context/ProfileContext";
import deafultIcon from "../../../assets/png/default-profile-picture.png";
import profilePicture2 from "../../../assets/png/profile-picture-2.png";
import profilePicture3 from "../../../assets/png/profile-picture-3.png";
import profilePicture1 from "../../../assets/png/profile-picture-1.png";
import profilePicture4 from "../../../assets/png/profile-picture-4.png";
import profilePicture5 from "../../../assets/png/profile-picture-5.png";
import { IoMdClose } from "react-icons/io";

function ProfileIconInput({ edit, handleFormChange }) {
  const [selector, setSelector] = useState();
  const { profileIcon, setProfileIcon } = useContext(ProfileContext);

  const profileIcons = [
    profilePicture1,
    profilePicture2,
    profilePicture3,
    profilePicture4,
    profilePicture5,
  ];

  const toggleIconModal = () => {
    setSelector(!selector);
  };

  const handleIconSelect = (e) => {
    setSelector(false);
    setProfileIcon(e.target.parentElement.id);
    handleFormChange(e.target.parentElement);
  };

  return (
    <div className="relative flex justify-between items-start space-y-3 md:space-y-0 flex-col md:flex-row border-b-[1px] pb-3 mb-5 ml-3 border-gray-300">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold" htmlFor="name">
          Profile Icon
        </h3>
        <p className="text-gray-400 font-light">
          Personalize your profile with one of our select profile icons
        </p>
      </div>
      <div className="flex items-center">
        <div className="w-14 h-14 mr-7 rounded-full overflow-hidden">
          <img
            className="scale-110"
            src={profileIcon ? profileIcons[profileIcon] : deafultIcon}
            alt="Avatar"
          />
        </div>
        {edit && (
          <p
            onClick={toggleIconModal}
            className="transition p-1 mr-7 text-sm text-center cursor-pointer underline text-green-500 hover:scale-105"
          >
            Edit
          </p>
        )}
      </div>

      {edit && selector && (
        <div className="grid absolute w-96 p-3 -right-10 top-5 md:top-16 rounded-sm shadow-lg bg-slate-50">
          <IoMdClose
            className="justify-self-end transition duration-300 hover:text-green-500"
            onClick={() => setSelector(false)}
          />
          <ul className="flex justify-center space-x-4 mt-2 mb-3">
            {profileIcons.map((icon, index) => (
              <li key={index}>
                <div
                  onClick={(e) => handleIconSelect(e)}
                  id={index}
                  className="transition w-12 h-12 cursor-pointer bg-gray-500 rounded-full overflow-hidden duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <img src={icon} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileIconInput;
