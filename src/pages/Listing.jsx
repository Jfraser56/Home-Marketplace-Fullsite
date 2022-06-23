import { useEffect, useState } from "react";
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../firebase.config";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";
import {
  BsArrowLeft,
  BsCalendarCheck,
  BsColumns,
  BsFillCircleFill,
  BsHouseDoor,
  BsTree,
  BsCheck2Circle,
} from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { ReactComponent as FooterImg } from "../assets/svg/footer.svg";
import IndividualListingMap from "../components/market/IndividualListingMap";
import { BiBed, BiBath, BiCar } from "react-icons/bi";
import { MdOutlineStairs } from "react-icons/md";
import { RiRuler2Line } from "react-icons/ri";

function Listing() {
  const [listingData, setListingData] = useState("");
  const [listingSaved, setListingSaved] = useState(false);
  const [fullDescription, setFullDescription] = useState(false);

  const { listingID } = useParams();

  const listingRef = doc(db, "listings", listingID);

  const handleContactOwner = (e) => {
    e.preventDefault();
    alert("doesn't work yet");
  };

  const handleSaveListing = () => {
    const userRef = doc(db, "users", auth.currentUser.uid);

    if (!listingSaved) {
      try {
        updateDoc(userRef, {
          savedListings: arrayUnion(listingID),
        });
        setListingSaved(true);
        addOrRemoveSave();
        toast.success("Listing saved!");
      } catch (error) {
        toast.error("An error occurred");
      }
    } else {
      try {
        updateDoc(userRef, {
          savedListings: arrayRemove(listingID),
        });
        setListingSaved(false);
        addOrRemoveSave();
        toast.success("Listing no longer saved");
      } catch (error) {
        toast.error("An error occurred");
      }
    }
  };

  // Adds/Subtracts to saves counter when user saves/unsaves listing
  const addOrRemoveSave = async () => {
    const result = await getDoc(listingRef);
    if (!listingSaved) {
      updateDoc(listingRef, {
        saves: result.data().saves + 1,
      });
    } else {
      updateDoc(listingRef, {
        saves: result.data().saves - 1,
      });
    }
  };

  const checkIfSaved = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);

    if (auth.currentUser) {
      const user = await getDoc(userRef);
      const result = await user
        .data()
        .savedListings.some((listing) => listing === listingID);
      setListingSaved(result);
    }
  };

  //Adds to view counter when listing is rendered
  const addView = (listing) => {
    updateDoc(listingRef, {
      views: listing.data().views + 1,
    });
  };

  const fetchPageContent = async () => {
    const listing = await getDoc(listingRef);
    setListingData(listing.data());
    if (auth.currentUser) {
      addView(listing);
      checkIfSaved();
    }
  };

  useEffect(() => {
    fetchPageContent();
  }, []);

  return listingData ? (
    <div className="flex flex-col md:flex-row border-t border-gray-300 overflow-hidden">
      <div className="overflow-y-scroll w-full md:w-1/2 lg:w-full">
        <img
          className="object-cover object-center rounded"
          src={listingData.images[0]}
          alt="header-image"
        />
        <div className="flex flex-wrap justify-start">
          {listingData.images.slice(1).map((image, index) => (
            <div className="lg:w-1/2 p-1">
              <img
                key={index}
                className="w-full h-full object-cover object-center rounded"
                src={image}
                alt="secondary-image"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-auto bg-white overflow-y-scroll">
        <nav className="sticky top-0 flex items-center justify-between w-auto h-1/6 md:h-20 p-5 bg-white border-b border-gray-300 shadow z-10">
          <Link
            to={`/homes/${listingData.type}/recent`}
            className="transition group flex items-center text-gray-600 hover:text-green-600 "
          >
            <BsArrowLeft
              size="1.3rem"
              strokeWidth="0.7px"
              className="fill-gray-600 stroke-gray-600 mr-3 group-hover:fill-green-600 group-hover:stroke-green-600"
            />
            Back to map
          </Link>
          {auth.currentUser && (
            <button
              onClick={handleSaveListing}
              type="button"
              className="group flex items-center text-green-600 mr-3"
            >
              {listingSaved ? (
                <>
                  <FaHeart size="1.2rem" className="mr-1" />
                  <span className="group-hover:underline">Saved</span>
                </>
              ) : (
                <>
                  <FaRegHeart size="1.2rem" className="mr-1" />
                  <span className="group-hover:underline">Save</span>
                </>
              )}
            </button>
          )}
        </nav>
        <main className="px-2 md:px-8 pt-5 h-auto space-y-3">
          <h1 className="text-5xl font-semibold mr-5">
            ${listingData.price}
            {listingData.type === "rent" && "/mo"}
          </h1>
          <div className="flex items-center flex-wrap">
            {listingData.bed && (
              <div className="flex items-center font-light px-3 py-1 m-2 border border-gray-300 rounded shadow">
                <BiBed className="mr-2 inline" />{" "}
                <b className="mr-1">{listingData.bed}</b> bd
              </div>
            )}
            {listingData.bath && (
              <div className="flex items-center font-light px-3 py-1 m-2 border border-gray-300 rounded shadow">
                <BiBath className="mr-2 inline" />{" "}
                <b className="mr-1">{listingData.bath}</b>ba
              </div>
            )}
            {listingData.size && (
              <div className="flex items-center font-light px-3 py-1 m-2 border border-gray-300 rounded shadow">
                <BsColumns className="mr-2 inline" />{" "}
                <b className="mr-1">{listingData.size}</b>
                sqft
              </div>
            )}
            {listingData.lotSize && (
              <div className="flex items-center font-light px-3 py-1 m-2 border border-gray-300 rounded shadow">
                <BsTree className="mr-2 inline" />{" "}
                <b className="mr-1">{listingData.lotSize}</b> acres
              </div>
            )}
          </div>
          <div className="flex items-center">
            <div className="flex items-center px-3 py-1 m-2 border border-gray-300 rounded shadow">
              <BsFillCircleFill
                className="inline mr-2"
                size=".75rem"
                fill={
                  listingData.type === "sale"
                    ? "#ef4444"
                    : listingData.rent === "rent"
                    ? "#facc15"
                    : "#9333ea"
                }
              />{" "}
              For {listingData.type}
            </div>
            <div className="flex items-center px-3 py-1 m-2 border border-gray-300 rounded shadow">
              <BsHouseDoor className="inline mr-2" size="1.1rem" />{" "}
              {listingData.homeType}
            </div>
          </div>
          <p className="font-light">
            {listingData.address}, {listingData.town}, {listingData.state}{" "}
            {listingData.zip}
          </p>
          <IndividualListingMap lat={listingData.lat} lng={listingData.lng} />
          <div className="w-full h-1 border-b my-7 border-gray-300 "></div>
          <div className="flex items-center justify-center lg:justify-start flex-wrap sm:flex-nowrap">
            <h1 className="text-2xl font-semibold text-center w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
              Overview
            </h1>
            <span className="font-light px-4 w-full sm:w-auto sm:border-x border-gray-300">
              Listed by: <span className="font-bold">{listingData.name}</span>
            </span>
            <span className="font-light px-4 w-full sm:w-auto sm:border-r border-gray-300">
              Posted on:{" "}
              <span className="font-bold">
                {listingData.timestamp.toDate().toString().slice(4, 15)}
              </span>
            </span>
            <span className="font-light px-4 w-full sm:w-auto sm:border-r border-gray-300">
              Saves: <span className="font-bold">{listingData.saves}</span>
            </span>
          </div>
          <div className="w-full py-5 px-8 border rounded shadow overflow-hidden text-gray-600">
            {listingData.desc.length < 500 || fullDescription ? (
              <>
                <p>{listingData.desc}</p>
              </>
            ) : (
              <p>{listingData.desc.slice(0, 500)}</p>
            )}
            {listingData.desc.length > 500 && (
              <button
                onClick={() => setFullDescription(!fullDescription)}
                className="text-green-600 font-semibold underline"
              >
                {fullDescription ? "Read less" : "Read more"}
              </button>
            )}
          </div>
          <div className="w-full h-1 border-b my-7 border-gray-300 "></div>
          <h1 className="text-2xl font-semibold mr-5">Facts and Features</h1>
          <ul className="w-full sm:w-1/2 p-8 border shadow rounded space-y-5">
            {listingData.bed && (
              <li className="flex items-center">
                <BiBed size="1.5rem" className="fill-green-600 mr-2" />{" "}
                {listingData.bed} Bedroom
              </li>
            )}
            {listingData.bath && (
              <li className="flex items-center">
                <BiBath size="1.5rem" className="fill-green-600 mr-2" />{" "}
                {listingData.bath} Bath
              </li>
            )}
            {listingData.size && (
              <>
                <li className="flex items-center">
                  <BsColumns size="1.5rem" className="fill-green-600 mr-2" />{" "}
                  {listingData.size} Sqft.
                </li>
                <li className="flex items-center">
                  <RiRuler2Line size="1.5rem" className="fill-green-600 mr-2" />{" "}
                  $
                  {+listingData.price.replace(",", "") /
                    +listingData.size.replace(",", "")}{" "}
                  price/sqft.
                </li>
              </>
            )}
            {listingData.lotSize && (
              <li className="flex items-center">
                <BsTree size="1.5rem" className="fill-green-600 mr-2" />{" "}
                {listingData.lotSize} Acres
              </li>
            )}
            <li className="flex items-center">
              <BsHouseDoor size="1.5rem" className="fill-green-600 mr-2" />{" "}
              {listingData.homeType}
            </li>
            {listingData.parking && (
              <li className="flex items-center">
                <BiCar size="1.5rem" className="fill-green-600 mr-2" />{" "}
                {listingData.parking}
              </li>
            )}

            {listingData.basement === "Finished" && (
              <li className="flex items-center">
                <MdOutlineStairs
                  size="1.5rem"
                  className="fill-green-600 mr-2"
                />{" "}
                Finished basement
              </li>
            )}
            {listingData.buildYear && (
              <li className="flex items-center">
                <BsCalendarCheck
                  size="1.4rem"
                  className="fill-green-600 mr-2"
                />{" "}
                Built in {listingData.buildYear}
              </li>
            )}

            {listingData.remodelYear && (
              <li className="flex items-center">
                <BsCheck2Circle size="1.5rem" className="fill-green-600 mr-2" />{" "}
                Rennovated in {listingData.remodelYear}
              </li>
            )}
          </ul>
          <div className="w-full h-1 border-b my-7 border-gray-300 "></div>
          {/* -----------------CHECK THIS--------------- */}
          <h1 className="text-2xl font-semibold mr-5">Contact Owner</h1>
          <form
            onSubmit={(e) => handleContactOwner(e)}
            className="p-3 sm:p-10 pt-4 space-y-5 border bg-white rounded overflow-hidden shadow"
          >
            <div className="space-y-3">
              <label className="text-sm font-semibold" htmlFor="contact-name">
                Name
              </label>
              <input
                className="block w-full h-10 p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus:outline-green-700"
                id="contact-name"
                type="text"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold" htmlFor="contact-email">
                Email
              </label>
              <input
                className="block w-full h-10 p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus:outline-green-700"
                id="contact-email"
                type="email"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold" htmlFor="contact-msg">
                Message
              </label>
              <textarea
                type="text"
                placeholder={`I am interested in ${listingData.address}, ${listingData.town}, ${listingData.state} ${listingData.zip} `}
                className="block w-full h-32 p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus:outline-green-700 resize-none"
                id="contact-msg"
              />
            </div>
            <button
              type="submit"
              className="transition block mx-auto w-36 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Send
            </button>
          </form>
        </main>
        <footer className="mt-20 text-center">
          <p className="mb-10 font-bold">
            SellYour<span className=" text-green-600">Place </span>
            <span className="font-normal">&copy; 2022</span>
          </p>
          <FooterImg className="pb-7" />
        </footer>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}

export default Listing;
