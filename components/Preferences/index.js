// create preferences context and provider
import React, { createContext, useState } from "react";

const PreferencesContext = createContext({
  preferences: {},
  setPreferences: () => {},
});

const PreferencesProvider = ({ children }) => {
  // load default state from local storage
  
  const [preferences, setPreferences] = useState(
    {
      loading: true,
    }
  );

  const storePreferences = (newState) => {
    localStorage?.setItem("preferences", JSON.stringify(newState));
    setPreferences(newState);
  };

  const loadPreferences = () => {
    const storedPreferences = localStorage?.getItem("preferences");
    if (storedPreferences) {
      setPreferences({...JSON.parse(storedPreferences), loading: false});
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        storePreferences,
        setPreferences,
        loadPreferences
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export { PreferencesContext, PreferencesProvider };
