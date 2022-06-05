import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import AccountNav from "../components/my-account/AccountNav";
import ManageListings from "../components/my-account/ManageListings";
import ProfileSettings from "../components/my-account/account-settings/ProfileSettings";
import SavedHomes from "../components/my-account/SavedHomes";
import Spinner from "../components/shared/Spinner";

function Account() {
  const [user, setUser] = useState();

  const { segment } = useParams();

  const titles = {
    "saved-homes": "Saved Homes",
    "manage-listings": "Your Listings",
    "profile-settings": "Profile Settings",
  };

  useEffect(async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const user = await getDoc(userRef);
    setUser(user.data());
  }, []);

  return (
    <>
      <AccountNav />
      <main className="mb-8 container mx-auto">
        <h1 className="text-4xl font-notoSerif font-bold mb-8">
          {titles[segment]}
        </h1>
        {segment === "saved-homes" ? (
          <SavedHomes user={user} />
        ) : segment === "manage-listings" ? (
          <ManageListings user={user} />
        ) : (
          <ProfileSettings />
        )}
      </main>
    </>
  );
}

export default Account;
