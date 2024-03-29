import React, { useEffect, useContext } from "react";
import ProfileContext from "../context/ProfileContext";
import { useParams } from "react-router-dom";
import AccountNav from "../components/my-account/AccountNav";
import ManageListings from "../components/my-account/ManageListings";
import ProfileSettings from "../components/my-account/account-settings/ProfileSettings";
import SavedHomes from "../components/my-account/SavedHomes";

function Account() {
  const { user } = useContext(ProfileContext);

  const { segment } = useParams();

  const titles = {
    "saved-homes": "Saved Homes",
    "manage-listings": "Your Listings",
    "profile-settings": "Profile Settings",
  };

  return (
    <>
      <AccountNav />
      <main className="mb-8 container mx-auto">
        <h1 className="text-4xl font-notoSerif text-center md:text-left md:pl-5 font-bold mb-8">
          {titles[segment]}
        </h1>
        {segment === "saved-homes" ? (
          <SavedHomes user={user} />
        ) : segment === "manage-listings" ? (
          <ManageListings user={user} />
        ) : (
          <ProfileSettings user={user} />
        )}
      </main>
    </>
  );
}

export default Account;
