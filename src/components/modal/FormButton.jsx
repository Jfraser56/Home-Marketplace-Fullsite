import React from "react";
import PropTypes from "prop-types";

function FormButton({ text, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`transition py-3 w-full rounded-md font-normal tracking-wide text-white ${
        disabled ? "bg-green-500/50" : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {text}
    </button>
  );
}

FormButton.propTypes = {
  text: PropTypes.string,
};

export default FormButton;
