import { UserSettingsContext } from '../context/UserSettingsContext';
import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import { ListItem } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { getUserSummary } from '../api/STEAM_SERVER';
import { auth, getUserProfile } from '../helpers/fb-methods';

const ProfileScreen = () => {
  const [userSummary, setUserSummary] = useState({});

  const userSettingsContext = useContext(UserSettingsContext);
  const navigation = useNavigation();

  const profileList = [
    {
      id: '1',
      title: 'Settings',
      destination: () => {
        navigation.navigate('Settings');
      },
    },
  ];

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
        getUserSummary(userSettingsContext.settings.steamId, (data) => {
          if (data != null) setUserSummary(data[0]);
        });
      } catch {
        alert('Unable to fetch user profile!');
      }
    }
  }, [userSettingsContext]);

  const renderProfileListItem = ({ item }) => {
    return (
      <Pressable
        style={styles.profileListItemContainer}
        onPress={item.destination}
      >
        <ListItem.Content style={styles.listItemContent}>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Chevron />
        </ListItem.Content>
      </Pressable>
    );
  };

  try {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePic}
            source={{
              uri: userSummary.avatarfull,
            }}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.usernameText}>{userSummary.personaname}</Text>
            <Text style={styles.idText}>ID: {userSummary.steamid}</Text>
          </View>
        </View>
        <View style={styles.profileListContainer}>
          <FlatList
            data={profileList}
            renderItem={renderProfileListItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => {
              auth
                .signOut()
                .then(() => {
                  userSettingsContext.clearSettings();
                  navigation.replace('Login');
                })
                .catch((error) => alert(error.message));
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </Pressable>
        </View>
      </View>
    );
  } catch {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image style={styles.profilePic} />
          <View style={styles.profileTextContainer}>
            <Text style={styles.usernameText}></Text>
            <Text style={styles.idText}>ID: </Text>
          </View>
        </View>
        <View style={styles.profileListContainer}>
          <FlatList
            data={profileList}
            renderItem={renderProfileListItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.errorContainer}>
          <Text>Something went wrong. Please verify SteamID is correct.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => {
              auth
                .signOut()
                .then(() => {
                  userSettingsContext.clearSettings();
                  navigation.replace('Login');
                })
                .catch((error) => alert(error.message));
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </Pressable>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  profileContainer: {
    height: 150,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileListContainer: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  profileListItemContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  profileTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  profilePic: {
    width: 125,
    height: 125,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 100,
    margin: 10,
  },
  usernameText: {
    fontWeight: '700',
    fontSize: 28,
  },
  idText: {
    fontSize: 14,
  },
  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
  },
  settingTitle: {
    fontSize: 16,
    marginLeft: 10,
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  listItemText: {},
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
  },
  buttonContainer: {
    flex: 1,
    width: '60%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  errorContainer: {
    alignItems: 'center',
  },
});

export default ProfileScreen;
