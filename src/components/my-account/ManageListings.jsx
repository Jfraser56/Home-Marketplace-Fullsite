import { Link } from "react-router-dom";
import { ReactComponent as ManageListingsIcon } from "../../assets/svg/manage-listings.svg";

function ManageListings() {
  return (
    <div className="flex flex-col items-center flex-start w-full h-[40rem] py-24 bg-white border-[1px] border-gray-300">
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
  );
}

export default ManageListings;
