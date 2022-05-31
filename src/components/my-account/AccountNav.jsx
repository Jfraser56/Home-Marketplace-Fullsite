import { NavLink } from "react-router-dom";

function AccountNav() {
  return (
    <nav className="mb-8 border-t-[1px] border-gray-300 bg-white">
      <ul className="flex space-x-8 container mx-auto">
        <NavLink
          to="/my-account/saved-homes"
          className={({ isActive }) =>
            isActive
              ? "p-2 text-green-500 border-b-2 border-b-green-500"
              : "p-2 border-b-4 border-transparent"
          }
        >
          Saved homes
        </NavLink>
        <NavLink
          to="/my-account/manage-listings"
          className={({ isActive }) =>
            isActive
              ? "p-2 text-green-500 border-b-2 border-b-green-500"
              : "p-2 border-b-4 border-transparent"
          }
        >
          Your Listings
        </NavLink>
        <NavLink
          to="/my-account/profile-settings"
          className={({ isActive }) =>
            isActive
              ? "p-2 text-green-500 border-b-2 border-b-green-500"
              : "p-2 border-b-4 border-transparent"
          }
        >
          Profile Settings
        </NavLink>
      </ul>
    </nav>
  );
}

export default AccountNav;
