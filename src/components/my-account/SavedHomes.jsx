import React from "react";
import { ReactComponent as SavedHomesIcon } from "../../assets/svg/saved-listings.svg";
import { FaRegHeart } from "react-icons/fa";
import ListingSearch from "../shared/ListingSearch";

function SavedHomes() {
  return (
    <div className="flex flex-col items-center flex-start w-full h-[40rem] py-24 bg-white border-[1px] border-gray-300">
      <div className="w-80 mb-2">
        <SavedHomesIcon />
      </div>
      <h1 className="font-notoSerif text-4xl font-semibold tracking-tight mb-5">
        Save homes for safe keeping
      </h1>
      <p className="font-light text-md tracking-wide mb-12">
        Whenever you find homes you like, click the{" "}
        <FaRegHeart size="1.25rem" className="inline" fill="#22c55e" /> icon to
        save them here
      </p>
      <ListingSearch border={true} />
    </div>
  );
}

export default SavedHomes;
