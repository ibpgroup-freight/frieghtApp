import React from "react";
import { Oval } from "react-loader-spinner";
function CustomLoader() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#0000FF"
        secondaryColor="#0000FF"
        ariaLabel="oval-loading"
      />
    </div>
  );
}

export default CustomLoader;
