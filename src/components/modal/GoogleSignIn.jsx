import { useContext } from "react";
import { ReactComponent as GoogleLogo } from "../../assets/svg/google-logo.svg";
import { auth, db } from "../../firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import ModalContext from "../../context/ModalContext";
import { toast } from "react-toastify";

function GoogleSignIn() {
  const { setToggleModal } = useContext(ModalContext);

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
      //If user exists - dont update timestamp
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          email: auth.currentUser.email,
          timestamp: serverTimestamp(),
          savedListings: [],
        });
      }

      setToggleModal(false);
    } catch (error) {
      //Handling 2 specific errors
      if (error.code !== "auth/cancelled-popup-request") {
        if (error.code !== "auth/popup-closed-by-user") {
          toast.error("Could not authorize with Google");
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
