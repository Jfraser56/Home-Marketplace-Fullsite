import { useState, useEffect } from "react";
import { db, auth } from "../../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ListingCard from "../market/ListingCard";
import Spinner from "../shared/Spinner";
import { ReactComponent as SavedHomesIcon } from "../../assets/svg/saved-listings.svg";
import { FaRegHeart } from "react-icons/fa";
import ListingSearch from "../shared/ListingSearch";

function SavedHomes({ user }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedListings = async () => {
    const listingsDocs = await Promise.all(
      user.savedListings.map((listing) => getDoc(doc(db, "listings", listing)))
    );

    //In case a listing was deleted, this will filter out data that is no longer available
    const results = listingsDocs.filter((doc) => {
      if (doc.exists()) {
        return doc;
      }
    });

    //If there is missing data, this function updates the users savedListing array in firebase
    if (results.length !== listingsDocs.length) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { savedListings: results });
    }

    setListings(results.map((doc) => ({ data: doc.data(), id: doc.id })));
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      // console.log("fetched saved listings on user change");
      getSavedListings();
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center flex-start w-full h-auto py-20 px-5 bg-white border-[1px] border-gray-300">
      {loading ? (
        <Spinner />
      ) : listings.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((listing) => (
            <ListingCard key={listing.id} data={listing.data} id={listing.id} />
          ))}
        </div>
      ) : (
        <>
          <div className="w-80 mb-2">
            <SavedHomesIcon />
          </div>
          <h1 className="font-notoSerif text-4xl font-semibold tracking-tight mb-5">
            Save homes for safe keeping
          </h1>
          <p className="font-light text-md tracking-wide mb-12">
            Whenever you find homes you like, click the{" "}
            <FaRegHeart size="1.25rem" className="inline" fill="#22c55e" /> icon
            to save them here
          </p>
          <ListingSearch border={true} />
        </>
      )}
    </div>
  );
}

export default SavedHomes;
