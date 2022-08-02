import React from "react";
import { useParams } from "react-router-dom";

function Explore() {
  const { type, location } = useParams();

  return <div>Explore</div>;
}

export default Explore;
