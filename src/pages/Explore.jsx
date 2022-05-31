import React from "react";
import { useParams } from "react-router-dom";

function Explore() {
  const { type, location } = useParams();

  return location ? <div>{location}</div> : <div>{type}</div>;
}

export default Explore;
