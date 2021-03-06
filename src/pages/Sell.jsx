import SellForm from "../components/sell/SellForm";

function Sell() {
  return (
    <div className="flex flex-col justify-start">
      <header className="sell-banner h-[27rem] w-screen text-center pt-10 px-5 space-y-5">
        <h1 className="text-3xl sm:text-4xl font-notoSerif font-extrabold">
          Sell your home with ease
        </h1>
        <h3 className="text-xl font-light">
          We make it simpler to sell your home and move forward
        </h3>
      </header>
      <SellForm />
    </div>
  );
}

export default Sell;
