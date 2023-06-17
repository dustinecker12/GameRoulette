import { UserSettingsContext } from '../context/UserSettingsContext';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FriendList from '../components/FriendList';
import { getUserFriends } from '../api/STEAM_SERVER';
import { auth, getUserProfile } from '../helpers/fb-methods';

const FriendsScreen = () => {
  const [userFriends, setUserFriends] = useState([]);

  const userSettingsContext = useContext(UserSettingsContext);

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
    if (userSettingsContext.settings.steamId != '') {
      try {
        getUserFriends(userSettingsContext.settings.steamId, (data) => {
          if (data != null) setUserFriends(data);
        });
      } catch {
        alert('Unable to fetch friends list!');
      }
    }
  }, [userSettingsContext]);

  try {
    return (
      <View style={styles.container}>
        {userSettingsContext.settings.steamId === '' ? (
          <Text>Setup profile to display your friends list</Text>
        ) : (
          <FriendList friends={userFriends} />
        )}
      </View>
    );
  } catch {
    <View style={styles.container}>
      <Text>Setup profile to display your friends list</Text>
    </View>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
});

export default FriendsScreen;
