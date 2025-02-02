import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

// 1. Create a context
const DarkModeContext = createContext();

// 2. Create a custom provider and store state in it
const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useLocalStorageState(false, "darkMode");

  useEffect(
    function () {
      if (darkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 3. Return the provider with the state
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// 4. Create a custom hook to consume the context
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

// 5. Export the provider and the custom hook
export { DarkModeProvider, useDarkMode };
