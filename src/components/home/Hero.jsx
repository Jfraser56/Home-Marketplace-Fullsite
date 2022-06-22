import ListingSearch from "../shared/ListingSearch";

function Hero() {
  return (
    <div className="h-[20rem] lg:h-[30rem] w-screen hero text-center">
      <h1 className="mt-12 lg:mt-24 mb-8 font-notoSerif font-[500] text-4xl text-white">
        Change starts here
      </h1>
      <ListingSearch />
    </div>
  );
}

export default Hero;
