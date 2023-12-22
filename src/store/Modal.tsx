import React, { createContext, useState } from "react";

type Model = {
  toggle: boolean;
  setToggle: () => void;
};
export const ModalCtx = createContext<Model>({
  toggle: false,
  setToggle: () => {},
});

const ToggleContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggle, settoggle] = useState(false);
  const changeToggle = () => {
    console.log("Setting toggle")
    settoggle((p) => !p);
  };
  const ctxModel = {
    toggle,
    setToggle: changeToggle,
  };
  return <ModalCtx.Provider value={ctxModel}>{children}</ModalCtx.Provider>;
};

export default ToggleContextProvider;
