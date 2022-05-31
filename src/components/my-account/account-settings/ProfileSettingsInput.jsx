function ProfileSettingsInput({
  header,
  desc,
  value,
  handleFormChange,
  editState,
}) {
  const id = header.replaceAll(" ", "").toLowerCase();
  return (
    <div className="space-y-2 border-b-[1px] pb-2 mb-5 ml-3 border-gray-300">
      <label className="text-sm font-semibold" htmlFor="name">
        {header}
      </label>
      <div className="flex justify-between">
        <p className="w-full text-gray-400 font-light">{desc}</p>
        <input
          onChange={handleFormChange}
          className={`transition text-center outline-none p-1 bg-transparent ${
            editState && "bg-green-600/10"
          }`}
          id={id}
          type="text"
          placeholder={header}
          value={value}
          disabled={!editState}
        />
      </div>
    </div>
  );
}

export default ProfileSettingsInput;
