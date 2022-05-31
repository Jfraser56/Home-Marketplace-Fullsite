import React, { useState, useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { geohashQueryBounds } from "geofire-common";

function MapContainer({ type, location, setMapBounds, listings }) {
  const [center, setCenter] = useState({ lat: 42.3601, lng: -71.0589 }); // Default boston, ma USA
  const [expandBoundsOnIdle, setExpandBoundsOnIdle] = useState(false);
  const [markers, setMarkers] = useState([]);

  const isMounted = useRef(true);
  const mapRef = useRef();

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    disableDefaultUI: true,
    clickableIcons: false,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  //Sets current location data from useEffect
  const setMapPosition = ({ lat, lng }) => {
    const search = { location, lat, lng };

    if (isMounted.current) {
      setCenter({
        lat,
        lng,
      });

      window.sessionStorage.setItem("last-search", JSON.stringify(search));
    }
  };

  //Get geolocation data
  const fetchGeoLocation = async () => {
    try {
      console.log("fetching");
      const result = await getGeocode({ address: location });
      const latLng = await getLatLng(result[0]);
      setMapPosition(latLng);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGeoCodeSearch = () => {
    //Avoids GeoCode when repeating a search
    if (location !== "recent") {
      //If no previous search is available, set session storage to current search
      if (!window.sessionStorage.getItem("last-search")) {
        fetchGeoLocation();
        console.log("set last search");
      } else {
        //If previous search is available, and not the same as current search, then set session storage to current
        if (
          JSON.parse(window.sessionStorage.getItem("last-search")).location !==
          location
        ) {
          console.log("didnt match so set new");
          fetchGeoLocation();
        } else {
          //This means that current search is the same as previous search, and will avoid Geocode function call
          console.log("saving money");
          setMapPosition({
            lat: JSON.parse(window.sessionStorage.getItem("last-search")).lat,
            lng: JSON.parse(window.sessionStorage.getItem("last-search")).lng,
          });
        }
      }
    } else {
      //If a recent search is available, set buy page to last search
      if (window.sessionStorage.getItem("last-search")) {
        setCenter({
          lat: JSON.parse(window.sessionStorage.getItem("last-search")).lat,
          lng: JSON.parse(window.sessionStorage.getItem("last-search")).lng,
        });
      }
    }
  };

  //Map to new location when location changes on new search
  useEffect(() => {
    if (isMounted.current) {
      handleGeoCodeSearch();
      setExpandBoundsOnIdle(false);
      setMapBounds([]);
    }
  }, [location]);

  //When user clicks on map, expandBoundsOnIdle is set to true and map fetches all listings with radius of center
  useEffect(() => {
    if (expandBoundsOnIdle) {
      expandBoundsAroundCenter();
    }
  }, [expandBoundsOnIdle]);

  //Gets the listings within certain radius of center if component is mounted and expandBoundsOnIdle is true
  const expandBoundsAroundCenter = () => {
    if (mapRef.current && expandBoundsOnIdle) {
      const draggedLocation = [
        mapRef.current.getCenter().lat(),
        mapRef.current.getCenter().lng(),
      ];
      setMapBounds(geohashQueryBounds(draggedLocation, 15000)); // finds all listings within 10km of center
    }
  };

  //Cleanup function
  useEffect(() => {
    console.log("mounted");

    return () => {
      isMounted.current = false;
      console.log("unmounted");
    };
  }, [isMounted]);

  const onLoad = (map) => {
    console.log("loaded");
    mapRef.current = map;
  };

  const icon = {
    path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
    fillColor:
      type === "sale" ? "#ef4444" : type === "rent" ? "#9333ea" : "#facc15",
    fillOpacity: 1,
    anchor: new window.google.maps.Point(0, 0),
    strokeWeight: 2,
    strokeColor: "#fff",
    scale: 0.4,
  };

  const addNewMarkers = () => {
    setMarkers([]);
    listings.forEach((listing) => {
      const marker = new window.google.maps.Marker({
        position: { lat: listing.data.lat, lng: listing.data.lng },
        map: mapRef.current,
        id: listing.id,
        icon: icon,
      });
      setMarkers((prev) => [...prev, marker]);
    });
  };

  //When the visible listings changes, update map markers
  useEffect(() => {
    //Clear old markers
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    //Update the map with new markers
    addNewMarkers();
  }, [listings]);

  const handleClick = (e) => {
    setExpandBoundsOnIdle(true);
    mapRef.current.panTo({ lat: e.latLng.lat(), lng: e.latLng.lng() }); //THIS IS GOING TO GET USED TO PAN TO SPOT ON MAP WHEN USER CLICKS ON LISTING PANEL ---
    // mapRef.current.setZoom(14);
  };

  return (
    <div className="w-auto h-full lg:pr-[25rem] xl:pr-[47rem] sm:w-0 lg:w-full">
      <GoogleMap
        onLoad={onLoad}
        onClick={handleClick} // When user clicks map --> Expand Listings to BOUNDARY RADIUS
        onDragEnd={expandBoundsAroundCenter}
        mapContainerStyle={containerStyle}
        options={mapOptions}
        center={center}
        zoom={11}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  );
}

export default React.memo(MapContainer);
