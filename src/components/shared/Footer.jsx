import React from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as FooterImg } from "../../assets/svg/footer.svg";

function Footer() {
  const location = useLocation();

  if (location.pathname.indexOf("/homes/") !== parseInt(-1)) {
    return null;
  } else {
    return (
      <div className="container mx-auto mb-2 text-center">
        <p className="mb-10 italic">House Marketplace &copy; 2022</p>
        <FooterImg />
      </div>
    );
  }
}

export default Footer;
