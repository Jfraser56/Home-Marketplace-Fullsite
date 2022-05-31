import React from "react";
import { ReactComponent as TailWindLogo } from "../assets/svg/tailwind-logo.svg";
import { ReactComponent as ReactLogo } from "../assets/svg/react-logo.svg";
import { ReactComponent as FirebaseLogo } from "../assets/svg/firebase-logo.svg";

//Might just hide this section on mobile

function MadeWith() {
  return (
    <div className="p-10 container border-t-2 text-center">
      <h1 className="text-5xl font-bold text-slate-300">Made with</h1>
      <div className="mx-auto grid md:grid-cols-1 lg:grid-cols-2">
        <TailWindLogo />
        <ReactLogo />
        <FirebaseLogo className="lg:col-span-2" />
      </div>
    </div>
  );
}

export default MadeWith;
