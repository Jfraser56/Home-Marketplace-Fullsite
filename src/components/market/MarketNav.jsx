import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase.config";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import usePlacesAutocomplete from "use-places-autocomplete";
import { BiSearch } from "react-icons/bi";
import { BsFillCircleFill, BsStar, BsStarFill } from "react-icons/bs";
import { toast } from "react-toastify";

function MarketNav({ type, location }) {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState(false);
  const [searchSaved, setSearchSaved] = useState(false);

  const types = {
    sale: "For Sale",
    rent: "For Rent",
    all: "All",
  };

  const filterMarketType = (filter) => {
    navigate(`/homes/${filter}/${location}`);
  };

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(regions)"],
      componentRestrictions: { country: "us" },
    },
    debounce: 300,
  });

  const handleSearchPlace = (e) => {
    clearSuggestions();
    value && navigate(`/homes/${type}/${e.target.textContent}`);
    setValue("");
  };

  const handlePriceFilter = () => {
    alert("doesn't work yet");
  };

  const checkIfSaved = async () => {
    if (auth.currentUser) {
      const userRef = await getDoc(doc(db, "users", auth.currentUser.uid));
      const result = await userRef
        .data()
        .savedSearches.some(
          (search) =>
            search.location === location &&
            search.type === type &&
            search.price === "price"
        );
      setSearchSaved(result);
    }
  };

  const handleSaveSearch = async () => {
    if (!searchSaved) {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        updateDoc(docRef, {
          savedSearches: arrayUnion({ location, type, price: "price" }),
        });
        setSearchSaved(true);
        toast.success("Search added to saved searches!");
      } catch (error) {
        toast.error("An error occurred");
      }
    } else {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        updateDoc(docRef, {
          savedSearches: arrayRemove({ location, type, price: "price" }),
        });
        setSearchSaved(false);
        toast.success("Search removed");
      } catch (error) {
        toast.error("An error occurred");
      }
    }
  };

  useEffect(() => {
    //Make sure type Sale/Rent popup is closed on initial render
    setTypeFilter(false);
    checkIfSaved();
  }, [type, location]);

  return (
    <div className="relative flex items-center h-14 w-full p-3 bg-white border-t-[1px] border-gray-300 z-10">
      <div className="relative w-72 h-8 mr-5 border-gray-400 border-[1px] rounded-sm">
        <input
          onChange={(e) => setValue(e.target.value)}
          className="px-3 py-2 w-full h-full outline-none text-xs font-semibold"
          type="text"
          value={value}
          placeholder={
            location === "recent" ? "Enter a town or zip code" : location
          }
        />
        <div className="transition absolute flex justify-center items-center top-0 right-0 h-full w-8">
          <BiSearch size="1.2rem" fill="#16a34a" />
        </div>
        {status === "OK" && (
          <div className="absolute left-0 right-0 bg-white shadow-lg rounded-sm border-[1px]">
            {data.map(({ place_id, description }) => (
              <button
                onClick={(e) => handleSearchPlace(e)}
                type="button"
                key={place_id}
                className="listing-search flex justify-start items-center px-5 py-3 w-full border-b-[1px] last-of-type:border-none hover:bg-green-500/20"
              >
                <BiSearch size="1.5rem" className="mr-5" />
                {description}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="relative flex justify-start items-center space-x-5">
        <button
          onClick={() => setTypeFilter(!typeFilter)}
          type="button"
          className={`flex items-center transition h-8 px-6 text-xs font-semibold  border-[1px] rounded-sm  ${
            typeFilter
              ? "bg-green-600 text-white"
              : "text-green-600 border-green-600 hover:text-black hover:border-black hover:bg-green-500/10"
          }`}
        >
          <BsFillCircleFill
            className="mr-1 border-[1px] border-white rounded-full"
            fill={
              type === "sale"
                ? "#ef4444"
                : type === "rent"
                ? "#9333ea"
                : "#facc15"
            }
          />{" "}
          {types[type] ? types[type] : "All"}
        </button>
        {typeFilter && (
          <>
            <div className="absolute left-6 top-6 border-t-0 border-[0.75rem] border-x-transparent border-b-white"></div>
            <div className="absolute left-0 top-9 w-80 bg-white rounded-md overflow-hidden shadow-lg">
              <ul>
                <li
                  onClick={() => filterMarketType("sale")}
                  className="group transition flex items-center px-3 h-16 border-b-[1px] border-b-gray-300 hover:bg-green-50"
                >
                  <input
                    readOnly
                    className="mr-3 h-6 w-6"
                    id="sale"
                    type="radio"
                    checked={type === "sale"}
                  />
                  <BsFillCircleFill className="inline mr-2" fill="red" />
                  <label className="group-hover:text-green-700" htmlFor="sale">
                    For sale
                  </label>
                </li>
                <li
                  onClick={() => filterMarketType("rent")}
                  className="group transition flex items-center px-3 h-16 border-b-[1px] border-b-gray-300 hover:bg-green-50"
                >
                  <input
                    readOnly
                    className="mr-3 h-6 w-6"
                    id="rent"
                    type="radio"
                    checked={type === "rent"}
                  />
                  <BsFillCircleFill className="inline mr-2" fill="#9333ea" />
                  <label className="group-hover:text-green-700" htmlFor="rent">
                    For rent
                  </label>
                </li>
                <li
                  onClick={() => filterMarketType("all")}
                  className="group transition flex items-center px-3 h-16 hover:bg-green-50"
                >
                  <input
                    readOnly
                    className="mr-3 h-6 w-6"
                    id="all"
                    type="radio"
                    checked={type !== "sale" && type !== "rent"}
                  />
                  <BsFillCircleFill className="inline mr-2" fill="#fde047" />
                  <label className="group-hover:text-green-700" htmlFor="all">
                    All
                  </label>
                </li>
                <li className="bg-green-600 flex justify-end items-center px-3 h-16">
                  <button
                    onClick={() => setTypeFilter(false)}
                    type="button"
                    className="transition h-8 px-3 text-sm font-semibold text-green-600 rounded-md bg-white hover:bg-white/90"
                  >
                    Done
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
        <button
          onClick={handlePriceFilter}
          type="button"
          className="transition h-8 px-6 text-xs font-semibold text-green-600 border-green-600 border-[1px] rounded-sm hover:text-black hover:border-black hover:bg-green-500/10"
        >
          Price
        </button>
        {auth.currentUser && (
          <button
            type="button"
            onClick={handleSaveSearch}
            className="flex items-center transition h-8 px-6 text-xs font-semibold text-green-600 border-green-600 border-[1px] rounded-sm hover:text-black hover:border-black hover:bg-green-500/10"
          >
            {searchSaved ? (
              <>
                <BsStarFill className="mr-2" size="1rem" /> Saved
              </>
            ) : (
              <>
                <BsStar className="mr-2" size="1rem" /> Save search
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default MarketNav;
