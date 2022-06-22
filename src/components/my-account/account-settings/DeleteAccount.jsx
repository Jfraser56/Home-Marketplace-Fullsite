import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../../firebase.config";

function DeleteAccount() {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteDoc(doc(db, "users", auth.currentUser.uid));
        await deleteUser(auth.currentUser);
        toast.success("Account Deleted");
        navigate("/");
        window.scrollTo(0, 0);
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          toast.error("Requires recent log in");
        } else {
          toast.error("Something went wrong");
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-[1px]  pb-3 mb-5 ml-3 border-gray-300">
      <div className="space-y-2 pb-2">
        <h3 className="text-sm font-semibold">Deactivate account</h3>
        <p className="w-full text-gray-400 font-light">
          This will erase your account, and remove all of your listings
        </p>
      </div>
      <button
        onClick={handleDeleteAccount}
        type="button"
        className="mr-7 h-10 px-4 font-bold border-[1px] outline-none border-red-600 rounded-sm text-red-600 bg-red-600/0 hover:bg-red-600 hover:text-white duration-300"
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteAccount;
