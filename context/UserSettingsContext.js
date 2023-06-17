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

  const clearSettings = () => {
    setUserSettings({
      steamId: '',
      hideDownvotedGames: false,
      hidePlayedGames: false,
      showOnlyMultiplayerGames: false,
    });
  };

  const value = {
    settings: userSettings,
    saveSettings: saveSettings,
    clearSettings: clearSettings,
  };

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export default UserSettingsContextProvider;
