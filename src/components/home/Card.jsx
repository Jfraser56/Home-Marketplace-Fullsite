import React from "react";
import { Link } from "react-router-dom";

function Card({ type, text, btnText, icon }) {
  const types = {
    Buy: "sale",
    Rent: "rent",
  };

  return (
    <div className="group w-full sm:w-3/4 lg:w-96 bg-white rounded-md shadow-md hover:shadow-xl hover:translate-y-[-10px] hover:scale-105 duration-500 ease-in-out">
      <Link
        className="flex flex-col flex-start items-center py-10 px-8 space-y-8"
        to={type === "Sell" ? "/sell" : `homes/${types[type]}/recent`}
      >
        {icon}
        <h1 className="text-center font-notoSerif text-2xl font-[500]">
          {type} a home
        </h1>
        <p className="text-center font-light h-24">{text}</p>
        <button className="py-2 px-6 border-[1px] border-green-500 rounded-md font-light text-green-500 bg-green-500/0 group-hover:bg-green-500/100 group-hover:text-white duration-300">
          {btnText}
        </button>
      </Link>
    </div>
  );
}

Card.defaultProps = {
  type: "Uh Oh!",
  text: "This card is broken :(",
  btnText: "Don't click on me",
};

export default Card;
