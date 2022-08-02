function ProfileTextInput({
  edit,
  title,
  desc,
  profileData,
  handleFormChange,
}) {
  const id = title.replace(" ", "").toLowerCase();

  return (
    <div className="space-y-2 border-b-[1px] pb-2 mb-5 ml-3 border-gray-300">
      <h3 className=" text-sm font-semibold" htmlFor="name">
        {title}
      </h3>
      <div className="flex justify-between flex-col items-start md:flex-row">
        <p className="w-full text-gray-400 font-light">{desc}</p>
        <input
          onChange={(e) => handleFormChange(e.target)}
          className={`transition outline-none mr-7 p-1 rounded-md text-left ${
            edit
              ? "bg-green-600/20 text-center"
              : "bg-green-600/0 md:text-right"
          }`}
          id={id}
          placeholder={title}
          value={profileData[id] ? profileData[id] : ""}
          maxLength={20}
          disabled={!edit}
        />
      </div>
    </div>
  );
}

export default ProfileTextInput;
