import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ManageListingsIcon } from "../../assets/svg/manage-listings.svg";
import { db, auth } from "../../firebase.config";
import {
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import ListingCard from "../market/ListingCard";
import Spinner from "../shared/Spinner";
import {
  AiOutlineEye,
  AiOutlineMinusCircle,
  AiOutlineEdit,
} from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

function ManageListings({ user }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRemoveListing = async (e) => {
    const listingID = e.target.parentElement.parentElement.parentElement.id;

    if (window.confirm("Are you sure?")) {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const listingRef = doc(db, "listings", listingID);
        await deleteDoc(listingRef);
        await updateDoc(userRef, {
          listings: arrayRemove(listingID),
        });
        setListings(listings.filter((listing) => listing.id !== listingID));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEditListing = () => {
    alert("Doesn't work yet");
  };

  const getOwnListings = async () => {
    const listingsDocs = await Promise.all(
      user.listings.map((listing) => getDoc(doc(db, "listings", listing)))
    );

    setListings(listingsDocs.map((doc) => ({ data: doc.data(), id: doc.id })));
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      // console.log("fetched own listings on user change");
      getOwnListings();
    }
  }, [user]);

  return (
    <div className="w-full h-auto py-10 px-5 bg-white border-[1px] border-gray-300">
      {loading ? (
        <Spinner />
      ) : listings.length ? (
        <div className="flex flex-col">
          {listings.map((listing) => (
            <div
              className="flex py-3 border-b flex-col md:flex-row"
              key={listing.id}
              id={listing.id}
            >
              <ListingCard data={listing.data} id={listing.id} />
              <div className="w-full text-start pt-5 pl-5">
                <h3>
                  Listed on:{" "}
                  <b>
                    {listing.data.timestamp.toDate().toString().slice(4, 15)}
                  </b>
                </h3>
                <ul className="flex flex-col lg:flex-row">
                  <li className="flex items-center text-gray-600 mr-5 whitespace-nowrap font-bold">
                    <AiOutlineEye size="1.2rem" className="mr-1" />
                    {listing.data.views} views
                  </li>
                  <li className="flex items-center text-gray-600 lg:mr-5 whitespace-nowrap font-bold">
                    <FaRegHeart size="1.2rem" className="mr-1" />
                    {listing.data.saves} saves
                  </li>
                  <li
                    onClick={handleEditListing}
                    className="w-fit transition flex items-center text-white px-3 py-1 mr-5 my-2 lg:my-0 whitespace-nowrap rounded cursor-pointer bg-yellow-500 hover:bg-yellow-600"
                  >
                    <AiOutlineEdit size="1.45rem" className="mr-1" />
                    Edit
                  </li>
                  <li
                    onClick={(e) => handleRemoveListing(e)}
                    className="w-fit transition flex items-center text-white px-3 py-1 whitespace-nowrap rounded cursor-pointer bg-red-600 hover:bg-red-700"
                  >
                    <AiOutlineMinusCircle size="1.2rem" className="mr-1" />
                    Delete
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center ">
          <div className="w-80 mb-2">
            <ManageListingsIcon />
          </div>
          <h1 className="font-notoSerif text-4xl font-semibold tracking-tight mb-5">
            Manage your listings all in one place
          </h1>
          <p className="font-light text-md tracking-wide mb-12">
            Add your first listing and you can view, update, or remove it here.
          </p>
          <Link to={"/sell"}>
            <button className="py-3 px-10 border-[1px] border-green-500 rounded-md text-green-500 bg-green-500/0 hover:bg-green-500 hover:text-white duration-300">
              Add your first listing here!
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ManageListings;
