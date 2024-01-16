import React from "react";
import { Oval } from "react-loader-spinner";
function CustomLoader({ customStyle }: { customStyle?: string }) {
  return (
    <div
      className={`w-full h-screen flex justify-center items-center ${customStyle}`}
    >
      <Oval
        visible={true}
        height={customStyle ? "18" : "80"}
        width={customStyle ? "22" : "80"}
        color="#0000FF"
        secondaryColor="#0000FF"
        ariaLabel="oval-loading"
      />
    </div>
  );
}

export default CustomLoader;
