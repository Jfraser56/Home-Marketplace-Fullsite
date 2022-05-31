import { useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";

function IndividualListingMap({ lat, lng }) {
  const mapRef = useRef();

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    disableDefaultUI: true,
    clickableIcons: false,
    draggable: false,
    zoomControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  const icon = {
    path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
    fillOpacity: 1,
    anchor: new window.google.maps.Point(0, 0),
    strokeWeight: 2,
    strokeColor: "#fff",
    scale: 0.4,
  };

  const onLoad = (map) => {
    mapRef.current = map;
    new window.google.maps.Marker({
      position: { lat, lng },
      map: mapRef.current,
      icon: icon,
    });
  };

  return (
    <div className="w-full h-72 border rounded shadow overflow-hidden">
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        options={mapOptions}
        center={{ lat, lng }}
        zoom={18}
      ></GoogleMap>
    </div>
  );
}

export default IndividualListingMap;
