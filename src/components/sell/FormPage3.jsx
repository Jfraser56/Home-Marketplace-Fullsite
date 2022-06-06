import { nanoid } from "nanoid";
import { auth } from "../../firebase.config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { BsCloudUpload, BsFillXCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";

function FormPage3({ formData, setFormData, handleFormChange }) {
  const storage = getStorage();
  const handleImageUpload = (files) => {
    const uploadImageAsPromise = (file) => {
      const imageName = `${auth.currentUser.uid}-${file.name}-${nanoid()}`;
      const storageRef = ref(storage, "listing-images/" + imageName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //Put in a loading bar here ***
            console.log("Progress BAR: " + progress + "% done");
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("Put this link into state: ", downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
    };
    if (formData.images.length + files.length <= 5) {
      //WAITS FOR ALL IMAGES TO FINISH UPLOAD BEFORE SETTING STATE
      Promise.all([...files].map((file) => uploadImageAsPromise(file)))
        .then((urls) =>
          setFormData({ ...formData, images: [...formData.images, ...urls] })
        )
        .catch((err) => toast.error("Something went wrong"));
    } else {
      toast.warning("You are only allowed 5 photos per listing");
    }
  };

  const removeFile = (e) => {
    const imageURL = e.currentTarget.previousElementSibling.src;
    const imageRef = ref(storage, imageURL);

    deleteObject(imageRef)
      .then(() => {
        console.log("deleted");
        setFormData({
          ...formData,
          images: formData.images.filter((file) => file !== imageURL),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" mx-auto p-20 py-12 bg-white border border-gray-300 shadow">
      <h1 className="text-center text-3xl text-gray-600">
        Show your <span className="text-green-600/80">Listing</span>
      </h1>
      <p className="text-center text-lg font-light mt-4">
        Choose a price for your home. <br /> Add photos to your listing
      </p>
      <div className="mt-12 p-10 pt-4 space-y-8 border bg-white border-gray-300 rounded overflow-hidden shadow">
        <div className="space-y-3">
          <label className="text-sm font-semibold" htmlFor="price">
            Set your price <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full h-10 overflow-hidden rounded-lg">
            <input
              value={formData.price}
              onChange={(e) => handleFormChange(e)}
              className="w-full h-full pr-3 pl-20 bg-gray-50 rounded-lg border border-gray-300 outline-none"
              id="price"
              type="text"
            />
            <div className="absolute left-0 top-0 flex justify-center items-center w-16 h-full text-lg bg-gray-200">
              $
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 p-10 pt-4 space-y-8 border bg-white border-gray-300 rounded overflow-hidden shadow">
        <div className="space-y-3">
          <p className="text-sm font-semibold cursor-default">
            Upload up to 5 Photos{" "}
            <span className="font-light">
              (first selected will be the cover image)
            </span>{" "}
            <span className="text-red-500">*</span>
          </p>
          {formData.images &&
            formData.images.map((file, index) => (
              <div key={index} className="relative inline-block w-24 h-16 mr-7">
                <img
                  className="w-full h-full rounded overflow object-cover object-center"
                  src={file}
                  alt="uploaded-image"
                />
                <BsFillXCircleFill
                  onClick={(e) => removeFile(e)}
                  className="absolute -top-3 -right-4 cursor-pointer"
                  size="1.1rem"
                />
              </div>
            ))}
          <label
            htmlFor="images"
            className="group flex flex-col justify-center items-center space-y-2 w-full h-52 p-3 rounded-lg bg-gray-50 border border-gray-300 outline-none "
          >
            <BsCloudUpload size="2.5rem" />
            <h3 className="transition font-semibold group-hover:text-green-500">
              Click to browse files
            </h3>

            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              multiple
              max="5"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="w-full h-full hidden"
              id="images"
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="transition block mt-10 mx-auto px-8 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
      >
        Publish
      </button>
    </div>
  );
}

export default FormPage3;
