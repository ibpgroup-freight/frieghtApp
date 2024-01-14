import React from "react";

function ButtonBlue(props: {
  text: string;
  onclick: () => void;
  customStyle?: string;
}) {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ${props.customStyle}`}
      onClick={props.onclick}
    >
      {props.text}
    </button>
  );
}

export default ButtonBlue;
