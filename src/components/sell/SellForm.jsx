import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { geohashForLocation } from "geofire-common";
import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import FormPage3 from "./FormPage3";
import { auth, db } from "../../firebase.config";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";

function SellForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    price: "",
    address: "",
    town: "",
    state: "",
    zip: "",
    lat: "",
    lng: "",
    hash: "",
    homeType: "",
    bed: "",
    bath: "",
    basement: "",
    parking: "",
    size: "",
    lotSize: "",
    buildYear: "",
    remodelYear: "",
    desc: "",
    images: "",
    ownerRef: auth.currentUser.uid,
    name: "",
    views: 0,
    saves: 0,
    timestamp: serverTimestamp(),
  });

  const topOfFormRef = useRef();
  const navigate = useNavigate();

  const handleNextStep = async () => {
    if (step === 1) {
      if (
        formData.address &&
        formData.town &&
        formData.state &&
        formData.zip &&
        formData.type
      ) {
        try {
          console.log("fetching");
          const result = await getGeocode({
            address: `${formData.address}, ${formData.town}, ${formData.state} ${formData.zip}`,
          });
          const latLng = await getLatLng(result[0]);
          const hash = geohashForLocation([latLng.lat, latLng.lng]);
          setFormData({ ...formData, lat: latLng.lat, lng: latLng.lng, hash });
          setStep(step + 1);
        } catch (error) {
          toast.error("Invalid Address");
        }
      } else {
        toast.warning("Make sure all fields are full");
      }
    } else if (step === 2) {
      if (formData.homeType) {
        setStep(step + 1);
      } else {
        toast.warning("Choose a home type");
      }
    } else if (step === 3) {
      if (!formData.price && formData.images.length) {
        toast.warning("Make sure all fields are full");
      }
    }

    topOfFormRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleFormChange = (e) => {
    let value;
    const re = /-/;
    value = e.target.value.replace(re, "");

    //dont allow letters in these fields
    if (
      e.target.id === "zip" ||
      e.target.id === "bed" ||
      e.target.id === "bath" ||
      e.target.id === "size" ||
      e.target.id === "lotSize" ||
      e.target.id === "price"
    ) {
      const re = /[^0-9,.]/;
      value = value.replace(re, "");
    }
    //Capitalize town names for query searches with google places
    if (e.target.id === "town") {
      value = value.replace(/\b\w/g, (town) => town.toUpperCase());
      console.log(value);
    }

    setFormData({ ...formData, [e.target.id]: value });
  };

  const uploadListing = async (e) => {
    e.preventDefault();
    const listingID = nanoid();
    const listingRef = doc(db, "listings", listingID);
    const userRef = doc(db, "users", auth.currentUser.uid);

    // Upload listing to database and add it to user's listing page
    try {
      const user = await getDoc(userRef);
      await setDoc(listingRef, { ...formData, name: user.data().name });
      await updateDoc(userRef, {
        listings: arrayUnion(listingID),
      });
    } catch (error) {
      toast.error("An error occurred, listing not posted");
    }

    navigate(`/homes/home-details/${listingID}`);
  };

  return (
    <div className="mx-auto w-[60rem]">
      <h3
        ref={topOfFormRef}
        className="text-center py-16 font-notoSerif text-xl font-bold"
      >
        Just three easy steps
      </h3>

      <div className="flex items-center justify-center">
        <div
          style={{ background: "#66b266" }}
          className={
            "h-7 w-7 rounded-full text-center pt-[1px] text-white cursor-default"
          }
        >
          1
        </div>
        <div
          style={{ background: step > 1 ? "#66b266" : "#d1d5db" }}
          className="w-60 h-2"
        ></div>
        <div
          style={{ background: step > 1 ? "#66b266" : "#d1d5db" }}
          className="h-7 w-7 rounded-full text-center pt-[1px] text-white cursor-default"
        >
          2
        </div>
        <div
          style={{ background: step > 2 ? "#66b266" : "#d1d5db" }}
          className="w-60 h-2"
        ></div>
        <div
          style={{ background: step > 2 ? "#66b266" : "#d1d5db" }}
          className="h-7 w-7 rounded-full text-center pt-[1px] text-white cursor-default"
        >
          3
        </div>
      </div>
      <form
        onSubmit={(e) => uploadListing(e)}
        className="mt-16 w-full space-y-8 "
      >
        {step === 1 ? (
          <FormPage1
            handleFormChange={handleFormChange}
            setFormData={setFormData}
            formData={formData}
          />
        ) : step === 2 ? (
          <FormPage2 handleFormChange={handleFormChange} formData={formData} />
        ) : (
          <FormPage3
            handleFormChange={handleFormChange}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </form>

      <div className="flex justify-center space-x-4 w-full my-12">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            type="button"
            className="transition h-12 w-32 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-300 font-semibold"
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            onClick={handleNextStep}
            type="button"
            className="transition h-12 w-32 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-300 font-semibold"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default SellForm;
