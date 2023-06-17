import { UserSettingsContext } from '../context/UserSettingsContext';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';

import SharedGameList from '../components/SharedGamesList';
import { getUserOwnedGames } from '../api/STEAM_SERVER';
import { auth, getUserProfile } from '../helpers/fb-methods';

const SharedGamesScreen = ({ route }) => {
  const [friendDetails, setFriendDetails] = useState(route.params);
  const [userGames, setUserGames] = useState([]);
  const [friendsGames, setFriendsGames] = useState([]);
  const [mutualGames, setMutualGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  const userSettingsContext = useContext(UserSettingsContext);

  useEffect(() => {
    if (auth.currentUser != '') {
      if (userSettingsContext.settings.steamId == '') {
        getUserProfile(auth.currentUser.uid, (data) => {
          console.log(data);
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
        // getUserOwnedGames(userSettingsContext.settings.steamId, (data) => {
        //   if (data != null) {
        //     setUserGames(data.games);
        //   }
        // });
        getUserOwnedGames(friendDetails.steamid, (data) => {
          if (data != null) {
            setFriendsGames(data.games);
          }
        });
      } catch {
        alert('Unable to fetch games!');
      }
    }
  }, [userSettingsContext]);

  useEffect(() => {
    // applyPreCombineFilters()
    // combine()
    // applyPostCombineFilters()
    // apply filters to each to eliminate playtime, then combine, then apply other filters
    // applyFilters();
    // setFilteredGames(friendsGames);
  }, [userGames, friendsGames]);

  try {
    return (
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <Text style={styles.statsContainerText}>
            Games: {friendsGames.length}
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              Alert.alert(
                'Your random game!',
                friendsGames[Math.floor(Math.random() * friendsGames.length)]
                  .name
              );
            }}
          >
            <Text style={styles.buttonText}>Random Game</Text>
          </Pressable>
        </View>
        {userSettingsContext.settings.steamId === '' ? (
          <Text>Setup profile to display your games</Text>
        ) : (
          <SharedGameList games={friendsGames} />
        )}
      </View>
    );
  } catch {
    <View style={styles.container}>
      <Text>Setup profile to display your games</Text>
    </View>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
  },
  statsContainerText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#0782F9',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export default SharedGamesScreen;
