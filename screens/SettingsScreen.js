import { UserSettingsContext } from '../context/UserSettingsContext';
import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Input, Switch, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { auth, getUserProfile, saveUserProfile } from '../helpers/fb-methods';

const SettingsScreen = () => {
  const [userSettings, setUserSettings] = useState({
    steamId: '',
    hidePlayedGames: false,
    hideDownvotedGames: false,
    showOnlyMultiplayerGames: false,
  });

  const userSettingsContext = useContext(UserSettingsContext);
  const navigation = useNavigation();

  const handleSaveSettings = (userSettings) => {
    userSettingsContext.saveSettings(userSettings);
    saveUserProfile(auth.currentUser.uid, userSettings);
  };

  useEffect(() => {
    if (auth.currentUser != '') {
      if (userSettingsContext.settings.steamId == '') {
        getUserProfile(auth.currentUser.uid, (data) => {
          if (data != undefined) {
            userSettingsContext.saveSettings(data);
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    setUserSettings({
      steamId: userSettingsContext.settings.steamId,
      hidePlayedGames: userSettingsContext.settings.hidePlayedGames,
      hideDownvotedGames: userSettingsContext.settings.hideDownvotedGames,
      showOnlyMultiplayerGames:
        userSettingsContext.settings.showOnlyMultiplayerGames,
    });
  }, [userSettingsContext]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            style={styles.saveButton}
            onPress={() => {
              handleSaveSettings(userSettings);
              navigation.goBack();
            }}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        );
      },
    });
  });

  return (
    <View style={styles.container}>
      <Text h3 style={styles.filterHeading}>
        Steam ID
      </Text>
      <Input
        placeholder="Enter your ID"
        keyboardType={'numeric'}
        onChangeText={(text) =>
          setUserSettings({ ...userSettings, steamId: text })
        }
        value={userSettings.steamId}
      />

      <Text h3 style={styles.filterHeading}>
        Filter Options
      </Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Hide played games</Text>
        <Switch
          value={userSettings.hidePlayedGames}
          onValueChange={(value) =>
            setUserSettings({ ...userSettings, hidePlayedGames: value })
          }
          color="#0782F9"
        />
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Hide downvoted games</Text>
        <Switch
          value={userSettings.hideDownvotedGames}
          onValueChange={(value) =>
            setUserSettings({ ...userSettings, hideDownvotedGames: value })
          }
          color="#0782F9"
        />
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Show only multiplayer games</Text>
        <Switch
          value={userSettings.showOnlyMultiplayerGames}
          onValueChange={(value) =>
            setUserSettings({
              ...userSettings,
              showOnlyMultiplayerGames: value,
            })
          }
          color="#0782F9"
        />
      </View>

      <View style={styles.helpTextContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate('SteamIdHelp');
          }}
        >
          <Text style={styles.helpText}>How do I find my Steam ID?</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterHeading: {
    color: '#0782F9',
    marginBottom: 10,
  },
  filterLabel: {
    flex: 1,
    fontSize: 16,
  },
  helpTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  helpText: {
    textDecorationLine: 'underline',
    color: 'blue',
    textAlign: 'center',
    marginBottom: 15,
  },
  saveButton: {
    marginRight: 25,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0782F9',
  },
});

export default SettingsScreen;
