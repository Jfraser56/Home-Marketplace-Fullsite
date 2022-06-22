import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs,
  where,
} from "firebase/firestore";
import MarketNav from "../components/market/MarketNav";
import MapContainer from "../components/market/MapContainer";
import ListingsPanel from "../components/market/ListingsPanel";

function Market() {
  const [mapBounds, setMapBounds] = useState([]);
  const [listings, setListings] = useState([]);

  const { type, location } = useParams();
  
  const townName = location.split(", ")[0];

  const listingsRef = collection(db, "listings");

  useEffect(async () => {
    const listingData = [];
    //Fetch listings within bounds when user clicks and drags outside of search origin
    if (mapBounds.length) {
      for (const b of mapBounds) {
        const q =
          type === "sale" || type === "rent"
            ? query(
                listingsRef,
                orderBy("hash"),
                startAt(b[0]),
                endAt(b[1]),
                where("type", "==", type)
              )
            : query(listingsRef, orderBy("hash"), startAt(b[0]), endAt(b[1]));
        const querySnap = await getDocs(q);
        querySnap.forEach((doc) =>
          listingData.push({ data: doc.data(), id: doc.id })
        );
      }
      //When user searches, reset results to only those within search location
    } else {
      const q =
        type === "sale" || type === "rent"
          ? query(
              listingsRef,
              where("type", "==", type),
              where("town", "==", townName)
            )
          : query(listingsRef, where("town", "==", townName));
      const querySnap = await getDocs(q);
      querySnap.forEach((doc) =>
        listingData.push({ data: doc.data(), id: doc.id })
      );
    }
    setListings(listingData);
  }, [mapBounds, type]);

  return (
    <div className="relative h-full overflow-hidden">
      <MarketNav type={type} location={location} />
      <main className="h-full w-full">
        <MapContainer
          type={type}
          location={location}
          listings={listings}
          setMapBounds={setMapBounds}
        />
        <ListingsPanel type={type} location={location} listings={listings} />
      </main>
    </div>
  );
}

export default Market;
