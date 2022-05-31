import { useState, useEffect } from "react";

function FormPage2({ handleFormChange, formData }) {
  const [years, setYears] = useState([]);

  useEffect(() => {
    const years = [];
    const startYear = 1900;
    let year = new Date().getFullYear();
    while (year > startYear) {
      years.push(year--);
    }
    setYears(years);
  }, []);

  return (
    <div className=" mx-auto p-20 pt-12 bg-white border border-gray-300 shadow">
      <h1 className="text-center text-3xl text-gray-600">
        Home <span className="text-green-600/80">Facts</span>
      </h1>
      <p className="text-center text-lg font-light mt-4">
        Provide details on your home <br /> or rental property
      </p>
      <div className="mt-12 p-10 pt-4 space-y-8 border bg-white border-gray-300 rounded overflow-hidden shadow">
        <div className="space-y-3">
          <label className="text-sm font-semibold" htmlFor="homeType">
            Home type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.homeType}
            onChange={(e) => handleFormChange(e)}
            className="block w-full h-10 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus:outline-green-700"
            id="homeType"
          >
            <option></option>
            <option>Single Family</option>
            <option>Condo</option>
            <option>Town House</option>
            <option>Multi Family</option>
            <option>Apartment</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 space-y-5 mt-12 p-10 pt-4 border bg-white border-gray-300 rounded overflow-hidden shadow">
        <h3 className="col-span-4 text-xl font-semibold">Features</h3>
        <div className="col-span-2 space-y-3 mr-5">
          <label className="text-sm font-semibold" htmlFor="bed">
            Bed
          </label>
          <input
            type="text"
            min={0}
            value={formData.bed}
            onChange={(e) => handleFormChange(e)}
            className="block w-full h-10 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus:outline-green-700"
            id="bed"
          />
        </div>
        <div className="col-span-2 space-y-3">
          <label className="text-sm font-semibold" htmlFor="bath">
            Bath
          </label>
          <input
            type="text"
            min={0}
            value={formData.bath}
            onChange={(e) => handleFormChange(e)}
            className="block w-full h-10 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus:outline-green-700"
            id="bath"
          />
        </div>
        <div className="col-span-2 space-y-3 mr-5">
          <label className="text-sm font-semibold" htmlFor="basement">
            Basement
          </label>
          <select
            value={formData.basement}
            onChange={(e) => handleFormChange(e)}
            className="block w-full h-10 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus:outline-green-700"
            id="basement"
          >
            <option></option>
            <option>None</option>
            <option>Finished</option>
            <option>Not Finished</option>
          </select>
        </div>
        <div className="col-span-2 space-y-3">
          <label className="text-sm font-semibold" htmlFor="parking">
            Parking
          </label>
          <select
            value={formData.parking}
            onChange={(e) => handleFormChange(e)}
            className="block w-full h-10 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus:outline-green-700"
            id="parking"
          >
            <option></option>
            <option>Private garage</option>
            <option>Private driveway</option>
            <option>Street</option>
            <option>Other</option>
          </select>
        </div>
        <div className="space-y-3 mr-5">
          <label className="text-sm font-semibold" htmlFor="size">
            Home size
          </label>
          <div className="relative w-40 h-10 overflow-hidden rounded-lg">
            <input
              type="text"
              value={formData.size}
              onChange={(e) => handleFormChange(e)}
              className="w-full h-full pl-3 pr-20 bg-gray-50 rounded-lg border border-gray-300 outline-none"
              id="size"
            />
            <div className="absolute right-0 top-0 flex items-center justify-center h-full w-16 bg-gray-200">
              Sqft.
            </div>
          </div>
        </div>
        <div className="space-y-3 mr-5">
          <label className="text-sm font-semibold" htmlFor="lotSize">
            Lot size
          </label>
          <div className="relative w-40 h-10 overflow-hidden rounded-lg">
            <input
              type="text"
              value={formData.lotSize}
              onChange={(e) => handleFormChange(e)}
              className="w-full h-full pl-3 pr-20 bg-gray-50 rounded-lg border border-gray-300 outline-none"
              id="lotSize"
            />
            <div className="absolute right-0 top-0 flex items-center justify-center h-full w-16 bg-gray-200">
              Acres
            </div>
          </div>
        </div>
        <div className="space-y-3 mr-5">
          <label className="text-sm font-semibold" htmlFor="buildYear">
            Year built
          </label>
          <select
            value={formData.buildYear}
            onChange={(e) => handleFormChange(e)}
            className="w-40 h-10 px-3 bg-gray-50 rounded-lg border border-gray-300 outline-none"
            id="buildYear"
          >
            <option></option>
            <option>N/A</option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="space-y-3 mr-5">
          <label className="text-sm font-semibold" htmlFor="remodelYear">
            Year rennovated
          </label>
          <select
            value={formData.remodelYear}
            onChange={(e) => handleFormChange(e)}
            className="w-40 h-10 px-3 bg-gray-50 rounded-lg border border-gray-300 outline-none"
            id="remodelYear"
          >
            <option></option>
            <option>N/A</option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-12 p-10 pt-4 space-y-8 border bg-white border-gray-300 rounded overflow-hidden shadow">
        <div className="space-y-3">
          <label className="text-sm font-semibold" htmlFor="desc">
            Description
          </label>
          <textarea
            type="text"
            value={formData.desc}
            placeholder="Tell us about your home..."
            onChange={(e) => handleFormChange(e)}
            className="block w-full h-52 p-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline focus:outline-green-700 resize-none"
            id="desc"
          />
        </div>
      </div>
    </div>
  );
}

export default FormPage2;
