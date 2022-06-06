import React from "react";
import ListingCard from "./ListingCard";
import { ReactComponent as FooterImg } from "../../assets/svg/footer.svg";

function ListingsPanel({ type, listings }) {
  const headers = {
    sale: "Properties for Sale",
    rent: "Rental Listings",
    all: "All Listings",
  };

  return (
    <div className="absolute h-full w-screen shadow-lg sm:w-screen lg:w-[25rem]  xl:w-[47rem] top-14 right-0 bg-white  overflow-scroll p-5">
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2  ">
        <h1 className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2 font-semibold text-xl tracking-wide ">
          {headers[type]}
        </h1>
        <div className="flex justify-between col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2 mb-5">
          <p>Number of results here</p>
          <p>sort filter here</p>
        </div>
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing.data} id={listing.id} />
        ))}

        <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2 text-center mt-5">
          Pagination here
        </div>
      </div>
      <footer className="mt-20 text-center">
        <p className="mb-10 font-bold">
          SellYour<span className=" text-green-600">Place </span>
          <span className="font-normal">&copy; 2022</span>
        </p>
        <FooterImg className="pb-7" />
      </footer>
    </div>
  );
}

export default ListingsPanel;
