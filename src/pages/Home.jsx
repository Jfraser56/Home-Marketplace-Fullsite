import Hero from "../components/home/Hero";
import Card from "../components/home/Card";
import { ReactComponent as BuyHome } from "../assets/svg/buy-house.svg";
import { ReactComponent as RentHome } from "../assets/svg/rent-house.svg";
import { ReactComponent as SellHome } from "../assets/svg/sell-house.svg";

function Home() {
  return (
    <div className="flex flex-col items-center justify-start">
      <Hero />
      <h1 className="text-center mt-16 mb-8 font-notoSerif font-semibold text-xl">
        Whether you're buying, selling or renting <br /> we can help you move
        forward
      </h1>
      <div className="flex justify-center w-screen space-x-8 mb-16">
        <Card
          type={"Buy"}
          icon={<BuyHome />}
          text={
            "Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else."
          }
          btnText={"Search Homes"}
        />
        <Card
          type={"Rent"}
          icon={<RentHome />}
          text={
            "We’re creating a seamless online experience – from shopping on the largest rental network to paying rent."
          }
          btnText={"Find rentals"}
        />
        <Card
          type={"Sell"}
          icon={<SellHome />}
          text={
            "No matter what path you take to sell your home, we can help you navigate a successful sale."
          }
          btnText={"See your options"}
        />
      </div>
    </div>
  );
}

export default Home;
