import { createContext, useState } from 'react';

export const UserSettingsContext = createContext({
  settings: {},
  saveSettings: (settings) => {},
});

const UserSettingsContextProvider = ({ children }) => {
  const [userSettings, setUserSettings] = useState({
    steamId: '',
    hideDownvotedGames: false,
    hidePlayedGames: false,
    showOnlyMultiplayerGames: false,
  });

  const saveSettings = (settings) => {
    setUserSettings(settings);
  };

  const value = {
    settings: userSettings,
    saveSettings: saveSettings,
  };

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export default UserSettingsContextProvider;
