import { UserSettingsContext } from '../context/UserSettingsContext';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { Accelerometer } from 'expo-sensors';

import GameList from '../components/GameList';
import { getUserOwnedGames } from '../api/STEAM_SERVER';
import { auth, getUserProfile } from '../helpers/fb-methods';

const MyGamesScreen = () => {
  const [userGames, setUserGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  const userSettingsContext = useContext(UserSettingsContext);
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    if (isFocused) {
      const configureShake = (onShake) => {
        Accelerometer.setUpdateInterval(100);

        const onUpdate = ({ x, y, z }) => {
          const acceleration = Math.sqrt(x * x + y * y + z * z);
          const sensibility = 1.8;
          if (acceleration >= sensibility) {
            onShake(acceleration);
          }
        };

        Accelerometer.addListener(onUpdate);
      };

      const subscription = configureShake((acceleration) => {
        if (filteredGames.length > 0) {
          Alert.alert(
            'Your random game!',
            filteredGames[Math.floor(Math.random() * filteredGames.length)].name
          );
        }
      });
    } else {
      Accelerometer.removeAllListeners();
    }
  }, [isFocused, route]);

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
        getUserOwnedGames(userSettingsContext.settings.steamId, (data) => {
          if (data != null) {
            setUserGames(data.games);
          }
        });
      } catch {
        alert('Unable to fetch games!');
      }
    }
  }, [userSettingsContext]);

  useEffect(() => {
    applyFilters();
  }, [userGames]);

  function applyFilters() {
    let tempFilteredGames = userGames;

    if (userSettingsContext.settings.hidePlayedGames) {
      tempFilteredGames = tempFilteredGames.filter((game) => {
        return game.playtime_forever == 0;
      });
    }

    setFilteredGames(tempFilteredGames);
  }

  try {
    return (
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <Text style={styles.statsContainerText}>
            Games: {filteredGames.length}
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              Alert.alert(
                'Your random game!',
                filteredGames[Math.floor(Math.random() * filteredGames.length)]
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
          <GameList games={filteredGames} />
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

export default MyGamesScreen;
