import { createContext, useState } from "react";

export const GlobalData = createContext();

const GlobalDataProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const [category, setCategory] = useState("All");

  return (
    <GlobalData.Provider
      value={{
        darkMode,
        setDarkMode,
        category,
        setCategory,
      }}
    >
      {props.children}
    </GlobalData.Provider>
  );
};
export default GlobalDataProvider;
