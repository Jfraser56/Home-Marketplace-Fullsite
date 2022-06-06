import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../shared/Spinner";

function ListingCard({ data, id }) {
  const {
    type,
    price,
    address,
    town,
    state,
    zip,
    homeType,
    bed,
    bath,
    size,
    images,
    name,
  } = data;

  return data ? (
    <Link
      to={`/homes/home-details/${id}`}
      className="duration-500 h-64 w-full shadow-md border-b-4 border-green-500 cursor-pointer hover:shadow-lg hover:-translate-y-1"
    >
      <img
        className="h-1/2 w-full object-cover object-center object"
        src={images[0]}
        alt="cover-image"
      />

      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-xl tracking-wide">${price}</h3>
        <ul className="flex flex-wrap text-sm">
          <li className="mr-2">{bed} bed</li>
          <li className="mr-2">{bath} bath</li>
          <li className="mr-2">{size} sqft</li>
          <li className="font-semibold">
            {homeType} for {type}
          </li>
        </ul>
        <p className="text-xs">
          {address}, {town} {state} {zip}
        </p>
        <p className="text-xs font-light text-gray-700">Listed by: {name}</p>
      </div>
    </Link>
  ) : (
    <Spinner />
  );
}

export default ListingCard;
