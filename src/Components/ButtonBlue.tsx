import React from "react";
import CustomLoader from "./CustomLoader";

function ButtonBlue(props: {
  text: string;
  onclick: () => void;
  customStyle?: string;
  isloading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ${props.customStyle}`}
      onClick={props.onclick}
      disabled={props.disabled}
    >
      {!props.isloading ? props.text : <CustomLoader customStyle="w-8 h-12" />}
    </button>
  );
}

export default ButtonBlue;
