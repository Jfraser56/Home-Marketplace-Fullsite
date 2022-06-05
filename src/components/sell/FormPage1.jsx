import React from "react";
import { BsBuilding, BsHouseDoor } from "react-icons/bs";

function FormPage2({ handleFormChange, setFormData, formData }) {
  return (
    <div className=" mx-auto p-20 pt-12 bg-white border border-gray-300 shadow">
      <h1 className="text-center text-3xl text-gray-600">
        Add your <span className="text-green-600">property</span>
      </h1>
      <p className="text-center text-lg font-light mt-4">
        Reach millions of buyers. <br /> Sign leases. Set up rent payments.
      </p>
      <div className="mt-10 flex justify-center space-x-16">
        <button
          onClick={() => setFormData({ ...formData, type: "sale" })}
          type="button"
          className={`transition flex items-center justify-center w-44 h-14 border border-gray-400 rounded hover:bg-gray-100 ${
            formData.type === "sale" && "bg-green-600/50 shadow"
          }  `}
        >
          <BsHouseDoor className="mr-2" size={"1.3rem"} />
          For sale
        </button>
        <button
          onClick={() => setFormData({ ...formData, type: "rent" })}
          type="button"
          className={`transition flex items-center justify-center w-44 h-14 border border-gray-400 rounded hover:bg-gray-100 ${
            formData.type === "rent" && "bg-green-600/50 shadow"
          }`}
        >
          <BsBuilding className="mr-2" size={"1.3rem"} />
          For rent
        </button>
      </div>
      <div className="mt-12 p-10 pt-4 space-y-8 border bg-white border-gray-300 rounded overflow-hidden shadow">
        <div className="space-y-3">
          <label className="text-sm font-semibold" htmlFor="address">
            Street address <span className="text-red-500">*</span>
          </label>
          <input
            value={formData.address}
            onChange={(e) => handleFormChange(e)}
            className="block w-full h-10 p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus:outline-green-700"
            id="address"
            type="text"
          />
        </div>
      </div>
      <div className="mt-12 p-10 pt-4 space-y-8 border bg-white border-gray-300 rounded overflow-hidden shadow">
        <div className="space-y-3">
          <label className="text-sm font-semibold" htmlFor="town">
            Town <span className="text-red-500">*</span>
          </label>
          <input
            value={formData.town}
            onChange={(e) => handleFormChange(e)}
            className="block w-full h-10 p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus:outline-green-700"
            id="town"
            type="text"
          />
        </div>
      </div>
      <div className="flex justify-start space-x-8 mt-12 p-10 pt-4 border bg-white border-gray-300 rounded shadow">
        <div className="space-y-3">
          <label className="text-sm font-semibold" htmlFor="state">
            State <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.state}
            onChange={(e) => handleFormChange(e)}
            className="block w-24 h-10 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus: outline-green-700"
            id="state"
          >
            <option></option>
            <option>AK</option>
            <option>AL</option>
            <option>AR</option>
            <option>AS</option>
            <option>AZ</option>
            <option>CA</option>
            <option>CO</option>
            <option>CT</option>
            <option>DC</option>
            <option>DE</option>
            <option>FL</option>
            <option>FM</option>
            <option>GA</option>
            <option>GU</option>
            <option>HI</option>
            <option>IA</option>
            <option>ID</option>
            <option>IL</option>
            <option>IN</option>
            <option>KS</option>
            <option>KY</option>
            <option>LA</option>
            <option>MA</option>
            <option>MD</option>
            <option>ME</option>
            <option>MH</option>
            <option>MI</option>
            <option>MN</option>
            <option>MO</option>
            <option>MP</option>
            <option>MS</option>
            <option>MT</option>
            <option>NC</option>
            <option>ND</option>
            <option>NE</option>
            <option>NH</option>
            <option>NJ</option>
            <option>NM</option>
            <option>NV</option>
            <option>NY</option>
            <option>OH</option>
            <option>OK</option>
            <option>OR</option>
            <option>PA</option>
            <option>PR</option>
            <option>PW</option>
            <option>RI</option>
            <option>SC</option>
            <option>SD</option>
            <option>TN</option>
            <option>TX</option>
            <option>UT</option>
            <option>VA</option>
            <option>VI</option>
            <option>VT</option>
            <option>WA</option>
            <option>WI</option>
            <option>WV</option>
            <option>WY</option>
          </select>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold" htmlFor="zip">
            Zip <span className="text-red-500">*</span>
          </label>
          <input
            value={formData.zip}
            onChange={(e) => handleFormChange(e)}
            className="block w-24 h-10 p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus: outline-green-700"
            id="zip"
            type="text"
          />
        </div>
      </div>
    </div>
  );
}

export default FormPage2;
