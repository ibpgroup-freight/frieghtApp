import React from "react";
import { Oval } from "react-loader-spinner";
function CustomLoader({
  customStyle,
  height,
  customColor,
}: {
  customStyle?: string;
  height?: number;
  customColor?: string;
}) {
  return (
    <div
      className={`w-full h-screen flex justify-center items-center ${customStyle}`}
    >
      <Oval
        visible={true}
        height={height ? height : "80"}
        width={customStyle ? "22" : "80"}
        color={customColor ? customColor : "#0000FF"}
        secondaryColor="#0000FF"
        ariaLabel="oval-loading"
      />
    </div>
  );
}

export default CustomLoader;
