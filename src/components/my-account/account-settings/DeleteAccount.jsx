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
        await deleteUser(auth.currentUser);
        await deleteDoc(doc(db, "users", auth.currentUser.uid));
        toast.success("Account Deleted");
        navigate("/");
        window.scrollTo(0, 0);
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-between border-b-[1px] items-center pb-3 mb-5 ml-3 border-gray-300">
      <div className="space-y-2 ">
        <h3 className="text-sm font-semibold">Deactivate account</h3>
        <p className="w-full text-gray-400 font-light">
          This will erase your account, and remove all of your listings
        </p>
      </div>
      <button
        onClick={handleDeleteAccount}
        type="button"
        className="mr-7 h-10 px-4 font-bold border-[1px] outline-none border-red-500 rounded-sm text-red-500 bg-red-500/0 hover:bg-red-500 hover:text-white duration-300"
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteAccount;
