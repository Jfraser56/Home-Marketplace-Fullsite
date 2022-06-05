import { useContext, useState } from "react";
import { ReactComponent as GoogleLogo } from "../../assets/svg/google-logo.svg";
import { auth, db } from "../../firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import ModalContext from "../../context/ModalContext";
import { toast } from "react-toastify";

function GoogleSignIn() {
  const { setToggleSignInModal } = useContext(ModalContext);

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
      //If user does not exist already then setDoc
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          name: auth.currentUser.displayName,
          screenname: "",
          email: auth.currentUser.email,
          photo: "",
          listings: [],
          savedListings: [],
          savedSearches: [],
          timestamp: serverTimestamp(),
        });
      }

      setToggleSignInModal(false);
    } catch (error) {
      //Handling 2 specific errors
      if (error.code !== "auth/cancelled-popup-request") {
        if (error.code !== "auth/popup-closed-by-user") {
          toast.error("Could not authorize with Google");
          console.log(error);
        }
      }
    }
  };
  return (
    <div className="pt-5 border-t-2 space-y-5">
      <p className="font-light">Or connect with:</p>
      <button
        onClick={signInWithGoogle}
        className="transition rounded-full p-3 bg-gray-100 hover:scale-105"
      >
        <GoogleLogo />
      </button>
    </div>
  );
}

export default GoogleSignIn;
