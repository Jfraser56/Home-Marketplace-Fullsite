import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import usePlacesAutocomplete from "use-places-autocomplete";

function ListingSearch({ border }) {
  const navigate = useNavigate();

  const {
    ready,
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
    value && navigate(`/homes/sale/${e.target.textContent}`);
  };

  return (
    <div
      className={`relative w-5/6 md:w-1/2 mx-auto rounded-sm shadow-md ${
        border && "border-[1px] border-gray-500 "
      }`}
    >
      <input
        onChange={(e) => setValue(e.target.value)}
        className="listing-search py-3 pl-5 pr-16 w-full h-16 outline-none"
        type="text"
        placeholder="Enter a town or zip code"
        value={value}
      />
      <div className="transition absolute flex justify-center items-center h-16 w-12 top-0 right-0 outline-none">
        <BiSearch size="30" />
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
  );
}

export default ListingSearch;
