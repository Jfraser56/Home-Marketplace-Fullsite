import React from "react";

function FormPage4() {
  return (
    <div className=" mx-auto p-20 pt-12 bg-white border border-gray-300 shadow">
      <h1 className="text-center text-3xl text-green-600">Review</h1>
      <p className="text-center text-lg font-light mt-4">
        See how your listing <br /> will appear on the market
      </p>
      <div className="mt-12 mb-8 w-full h-96 border shadow ">
        <div>content</div>
      </div>
      <button
        type="submit"
        className="transition block w-36 py-2 mx-auto bg-green-600 text-white rounded hover:bg-green-700 "
      >
        Publish Listing
      </button>
    </div>
  );
}

export default FormPage4;
