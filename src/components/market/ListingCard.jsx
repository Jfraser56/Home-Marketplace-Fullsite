import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ListingCard({ data, id }) {
  const navigate = useNavigate();

  const {
    type,
    price,
    address,
    town,
    state,
    zip,
    lat,
    lng,
    hash,
    homeType,
    bed,
    bath,
    basement,
    parking,
    size,
    lotSize,
    buildYear,
    remodelYear,
    desc,
    images,
  } = data;

  return (
    <Link
      to={`/homes/home-details/${id}`}
      className="duration-500 h-64 shadow-md border-b-4 border-green-500 cursor-pointer hover:shadow-lg hover:-translate-y-1"
    >
      <div className="h-1/2 w-full bg-cover bg-center bg-no-repeat bg-[url(https://images.unsplash.com/photo-1517541866997-ea18e32ea9e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60)]"></div>
      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-xl tracking-wide">${data.price}</h3>
        <ul className="flex space-x-2 text-sm">
          <li>4 bds</li>
          <li>2 ba</li>
          <li>1,500 sqft</li>
          <li>- House for sale</li>
        </ul>
        <p className="text-xs">100 Main St, Boston MA 010101</p>
        <p className="text-xs font-light text-gray-700">Bob Markley</p>
      </div>
    </Link>
  );
}

export default ListingCard;
